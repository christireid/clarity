"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, Attachment } from './types';
import { TokenOptimizer } from '@/lib/token-optimization';
import { StreamParser } from '@/lib/streaming/StreamParser';
import { StreamType } from '@/lib/streaming/StreamProtocol';
import type { SDKConfig } from '@/components/ai/devtools/SDKDevTools';

// ... (Interfaces remain same) ...
interface UseAdvancedChatOptions {
  api?: string;
  initialMessages?: Message[];
  optimizerConfig?: {
    enabled: boolean;
    contextWindow: number;
  };
  initialConfig?: SDKConfig;
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
  ragContext: any[];
  config: SDKConfig;
  setConfig: (config: SDKConfig) => void;
}

const optimizer = new TokenOptimizer({
  contextWindow: { maxTokens: 4000, strategy: 'hybrid', keepSystemMessages: true },
  memoryConfig: { shortTermSize: 10, longTermSize: 50, compressionThreshold: 100 }
});

export function useAdvancedChat({
  api = '/api/chat',
  initialMessages = [],
  optimizerConfig = { enabled: true, contextWindow: 4000 },
  initialConfig = { systemPrompt: 'You are a helpful assistant.', temperature: 0.7, model: 'gpt-4o' },
  onResponse,
  onFinish
}: UseAdvancedChatOptions = {}): UseAdvancedChatResult {
  // ... (State remains same) ...
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationStats, setOptimizationStats] = useState<any>(null);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);
  const [ragContext, setRagContext] = useState<any[]>([]);
  const [config, setConfig] = useState<SDKConfig>(initialConfig);
  
  const parserRef = useRef(new StreamParser());
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateId = () => Math.random().toString(36).substring(7);

  const processMessage = async (userMessage: Message) => {
    setIsLoading(true);
    setStreamLogs([]);
    setRagContext([]);
    abortControllerRef.current = new AbortController();

    try {
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Handle Attachments
      if (userMessage.attachments?.length) {
        setStreamLogs(prev => [...prev, `Processing ${userMessage.attachments?.length} attachments...`]);
        // Here we would typically upload/optimize images
      }

      // RAG Retrieval
      const retrievedDocs = optimizer.rag.retrieve(userMessage.content);
      setRagContext(retrievedDocs);
      if (retrievedDocs.length > 0) {
        setStreamLogs(prev => [...prev, `RAG: Retrieved ${retrievedDocs.length} docs`]);
      }

      // Token Optimization
      if (optimizerConfig.enabled) {
        const optimized = optimizer.context.optimize(newMessages);
        setOptimizationStats(optimized.stats);
        setStreamLogs(prev => [...prev, `Token Optimization: Saved ${optimized.stats.saved} tokens`]);
      }

      // Simulate Response
      const aiResponseId = generateId();
      const assistantMessage: Message = {
        id: aiResponseId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        status: 'sending'
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      const unsubscribe = parserRef.current.subscribe((part) => {
        setStreamLogs(prev => [...prev, `Received chunk type: ${part.type}`]);
        if (part.type === StreamType.TEXT) {
          setMessages(prev => prev.map(m => m.id === aiResponseId ? { ...m, content: m.content + part.content } : m));
        } else if (part.type === StreamType.UI_STREAM) {
           try {
             const patch = typeof part.content === 'string' ? JSON.parse(part.content) : part.content;
             setMessages(prev => prev.map(m => m.id === aiResponseId ? { ...m, metadata: { ...m.metadata, component: patch.component, props: patch.props } } : m));
           } catch(e) { console.error(e); }
        }
      });

      const mockStream = async () => {
        const isChart = userMessage.content.toLowerCase().includes('chart');
        
        // Text chunks
        const chunks = isChart
           ? ['Here ', 'is ', 'the ', 'chart ', 'you ', 'requested.']
           : ['This ', 'is ', 'a ', 'simulated ', 'streaming ', 'response.'];

        if (userMessage.attachments?.length) {
           chunks.unshift(`I received your ${userMessage.attachments.length} file(s). `);
        }

        for (const chunk of chunks) {
          if (abortControllerRef.current?.signal.aborted) break;
          await new Promise(r => setTimeout(r, 100));
          parserRef.current.feed(`0:${chunk}\n`);
        }

        // Data/UI chunks
        if (isChart && !abortControllerRef.current?.signal.aborted) {
           await new Promise(r => setTimeout(r, 500));
           const chartData = { component: 'Chart', props: { data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }] } };
           parserRef.current.feed(`7:${JSON.stringify(chartData)}\n`);
        }

        if (!abortControllerRef.current?.signal.aborted) {
          unsubscribe();
          setIsLoading(false);
          setMessages(prev => prev.map(m => m.id === aiResponseId ? { ...m, status: 'sent' } : m));
        }
      };

      await mockStream();

    } catch (error) {
      console.error(error);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = async (e?: React.FormEvent, metadata?: any) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = { id: generateId(), role: 'user', content: input, timestamp: new Date(), status: 'sent', metadata };
    setInput('');
    await processMessage(userMessage);
  };

  const append = async (message: Message) => {
    await processMessage(message);
  };

  const reload = async () => {
    if (messages.length === 0) return;
    let lastUserIndex = messages.length - 1;
    while (lastUserIndex >= 0 && messages[lastUserIndex].role !== 'user') lastUserIndex--;
    if (lastUserIndex >= 0) {
      const lastUserMessage = messages[lastUserIndex];
      const newHistory = messages.slice(0, lastUserIndex + 1);
      setMessages(newHistory);
      await processMessage(lastUserMessage);
    }
  };

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setStreamLogs(prev => [...prev, 'Stream aborted by user']);
    }
  };

  return {
    messages, input, setInput, isLoading, handleSubmit, append, reload, stop, setMessages, optimizationStats, streamLogs, ragContext, config, setConfig
  };
}
