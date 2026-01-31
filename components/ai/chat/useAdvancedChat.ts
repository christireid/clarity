"use client";

import { useState, useCallback, useRef } from 'react';
import { Message } from './types';
import { TokenOptimizer } from '@/lib/token-optimization';
import { StreamParser } from '@/lib/streaming/StreamParser';
import { StreamType } from '@/lib/streaming/StreamProtocol';

interface UseAdvancedChatOptions {
  api?: string;
  initialMessages?: Message[];
  optimizerConfig?: {
    enabled: boolean;
    contextWindow: number;
  };
  onResponse?: (message: Message) => void;
  onFinish?: (messages: Message[]) => void;
}

interface UseAdvancedChatResult {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e?: React.FormEvent, metadata?: any) => Promise<void>;
  append: (message: Message) => Promise<void>;
  reload: () => Promise<void>;
  stop: () => void;
  setMessages: (messages: Message[]) => void;
  optimizationStats?: any;
  streamLogs: string[];
}

const optimizer = new TokenOptimizer({
  contextWindow: {
    maxTokens: 4000,
    strategy: 'hybrid',
    keepSystemMessages: true
  },
  memoryConfig: {
    shortTermSize: 10,
    longTermSize: 50,
    compressionThreshold: 100
  }
});

export function useAdvancedChat({
  api = '/api/chat',
  initialMessages = [],
  optimizerConfig = { enabled: true, contextWindow: 4000 },
  onResponse,
  onFinish
}: UseAdvancedChatOptions = {}): UseAdvancedChatResult {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationStats, setOptimizationStats] = useState<any>(null);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);
  
  const parserRef = useRef(new StreamParser());
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateId = () => Math.random().toString(36).substring(7);

  const processMessage = async (userMessage: Message) => {
    setIsLoading(true);
    setStreamLogs([]); // Clear logs for new request
    abortControllerRef.current = new AbortController();

    try {
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Token Optimization
      if (optimizerConfig.enabled) {
        const optimized = optimizer.context.optimize(newMessages);
        setOptimizationStats(optimized.stats);
        setStreamLogs(prev => [...prev, `Token Optimization: Saved ${optimized.stats.saved} tokens`]);
      }

      // Simulate Stream Response
      const aiResponseId = generateId();
      const assistantMessage: Message = {
        id: aiResponseId,
        role: 'assistant',
        content: '', // Start empty
        timestamp: new Date(),
        status: 'sending'
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Subscribe to parser
      const unsubscribe = parserRef.current.subscribe((part) => {
        setStreamLogs(prev => [...prev, `Received chunk type: ${part.type}`]);
        
        if (part.type === StreamType.TEXT) {
          setMessages(prev => prev.map(m => 
            m.id === aiResponseId ? { ...m, content: m.content + part.content } : m
          ));
        } else if (part.type === StreamType.UI_STREAM) {
           // Handle UI Streaming (e.g. generative props)
           try {
             const patch = typeof part.content === 'string' ? JSON.parse(part.content) : part.content;
             setMessages(prev => prev.map(m => 
               m.id === aiResponseId ? { 
                 ...m, 
                 metadata: { 
                   ...m.metadata, 
                   component: patch.component,
                   props: patch.props 
                 } 
               } : m
             ));
           } catch(e) { console.error(e); }
        }
      });

      // MOCK STREAM GENERATION
      // In real app: fetch(api).body.pipeTo(...)
      
      const mockStream = async () => {
        // 1. Text chunks
        const chunks = userMessage.content.toLowerCase().includes('chart') 
           ? ['Here ', 'is ', 'the ', 'chart ', 'you ', 'requested.']
           : ['This ', 'is ', 'a ', 'simulated ', 'streaming ', 'response.'];

        for (const chunk of chunks) {
          await new Promise(r => setTimeout(r, 100)); // Network delay
          parserRef.current.feed(`0:${chunk}\n`);
        }

        // 2. Data/UI chunks
        if (userMessage.content.toLowerCase().includes('chart')) {
           await new Promise(r => setTimeout(r, 500));
           const chartData = {
             component: 'Chart',
             props: { data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }] }
           };
           parserRef.current.feed(`7:${JSON.stringify(chartData)}\n`);
        }

        unsubscribe();
        setIsLoading(false);
        setMessages(prev => prev.map(m => m.id === aiResponseId ? { ...m, status: 'sent' } : m));
      };

      await mockStream();

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = async (e?: React.FormEvent, metadata?: any) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      status: 'sent',
      metadata
    };

    setInput('');
    await processMessage(userMessage);
  };

  const append = async (message: Message) => {
    await processMessage(message);
  };

  const reload = async () => {
    // Logic to reload last message
  };

  const stop = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    append,
    reload,
    stop,
    setMessages,
    optimizationStats,
    streamLogs
  };
}
