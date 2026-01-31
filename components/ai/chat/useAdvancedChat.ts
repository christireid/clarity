"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, Attachment } from './types';
import { TokenOptimizer } from '@/lib/token-optimization';
import { StreamParser } from '@/lib/streaming/StreamParser';
import { StreamType } from '@/lib/streaming/StreamProtocol';
import type { SDKConfig } from '@/components/ai/devtools/SDKDevTools';
import { compilePrompt } from '@/lib/prompt-template';

interface UseAdvancedChatOptions {
  api?: string;
  initialMessages?: Message[];
  optimizerConfig?: {
    enabled: boolean;
    contextWindow: number;
  };
  initialConfig?: SDKConfig;
  persistenceKey?: string; // New: Persistence Key
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
  clear: () => void; // New: Clear history
  setMessages: (messages: Message[]) => void;
  optimizationStats?: any;
  streamLogs: string[];
  ragContext: any[];
  config: SDKConfig;
  setConfig: (config: SDKConfig) => void;
  contextWindow: Message[]; // New: Expose optimized context
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
  persistenceKey,
  onResponse,
  onFinish
}: UseAdvancedChatOptions = {}): UseAdvancedChatResult {
  
  // State
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationStats, setOptimizationStats] = useState<any>(null);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);
  const [ragContext, setRagContext] = useState<any[]>([]);
  const [config, setConfig] = useState<SDKConfig>(initialConfig);
  const [contextWindow, setContextWindow] = useState<Message[]>([]); // Visualized context
  
  const parserRef = useRef(new StreamParser());
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMounted = useRef(false);

  const generateId = () => Math.random().toString(36).substring(7);

  // Load from Persistence
  useEffect(() => {
    isMounted.current = true;
    if (persistenceKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(persistenceKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved, (key, value) => {
            if (key === 'timestamp') return new Date(value);
            return value;
          });
          setMessages(parsed);
        } catch (e) {
          console.error('Failed to load chat history', e);
        }
      }
    }
  }, [persistenceKey]);

  // Save to Persistence
  useEffect(() => {
    if (isMounted.current && persistenceKey && messages.length > 0) {
      localStorage.setItem(persistenceKey, JSON.stringify(messages));
    }
  }, [messages, persistenceKey]);

  const processMessage = async (userMessage: Message) => {
    setIsLoading(true);
    setStreamLogs([]);
    setRagContext([]);
    abortControllerRef.current = new AbortController();

    try {
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // 1. Compile System Prompt (Template Engine)
      const compiledSystemPrompt = compilePrompt(config.systemPrompt, {
        date: new Date().toLocaleDateString(),
        language: 'English',
        // Add other dynamic vars here
      });
      setStreamLogs(prev => [...prev, `System Prompt Compiled: "${compiledSystemPrompt.slice(0, 50)}..."`]);

      // 2. RAG Retrieval
      const retrievedDocs = optimizer.rag.retrieve(userMessage.content);
      setRagContext(retrievedDocs);
      if (retrievedDocs.length > 0) {
        setStreamLogs(prev => [...prev, `RAG: Retrieved ${retrievedDocs.length} docs`]);
      }

      // 3. Token Optimization
      let contextToSend = newMessages;
      if (optimizerConfig.enabled) {
        const optimized = optimizer.context.optimize(newMessages);
        setOptimizationStats(optimized.stats);
        contextToSend = optimized.messages; 
        setContextWindow(optimized.messages); // Update visualization
        setStreamLogs(prev => [...prev, `Token Optimization: Saved ${optimized.stats.saved} tokens`]);
      } else {
        setContextWindow(newMessages);
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

  const clear = useCallback(() => {
    setMessages([]);
    if (persistenceKey) {
      localStorage.removeItem(persistenceKey);
    }
  }, [persistenceKey]);

  return {
    messages, input, setInput, isLoading, handleSubmit, append, reload, stop, clear, setMessages, optimizationStats, streamLogs, ragContext, config, setConfig, contextWindow
  };
}
