"use client";

import { useState, useCallback, useRef } from 'react';
import { Message } from './types';
import { TokenOptimizer } from '@/lib/token-optimization';

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
}

// Initialize optimizer singleton (in a real app, this might be a context)
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
  const abortControllerRef = useRef<AbortController | null>(null);

  // Helper to generate IDs
  const generateId = () => Math.random().toString(36).substring(7);

  const processMessage = async (userMessage: Message) => {
    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      // 1. Optimistic Update
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // 2. Token Optimization Pipeline
      let contextToSend = newMessages;
      if (optimizerConfig.enabled) {
        // Optimize the context before "sending"
        // In a real app, this would strip the context sent to the API
        const optimized = optimizer.context.optimize(newMessages);
        setOptimizationStats(optimized.stats);
        // We still keep the full history in UI, but 'optimized.messages' would be the payload
      }

      // 3. Simulate API Call / Stream
      // In a real app: await fetch(api, { body: JSON.stringify({ messages: optimized.messages }) })
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Simulate AI thinking/processing tools
      const aiResponseId = generateId();
      
      // Check for "generative UI" triggers in input
      let aiContent = "I've processed your request.";
      let metadata: any = {};

      if (userMessage.content.toLowerCase().includes('chart')) {
        aiContent = "Here is the data visualization you requested.";
        metadata = {
          component: 'Chart',
          props: {
            type: 'bar',
            data: [
              { name: 'Jan', value: 400 },
              { name: 'Feb', value: 300 },
              { name: 'Mar', value: 600 },
            ]
          }
        };
      } else if (userMessage.content.toLowerCase().includes('form')) {
        aiContent = "Please fill out this form to proceed.";
        metadata = {
          component: 'Form',
          props: {
            fields: [
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'reason', label: 'Reason', type: 'text' }
            ]
          }
        };
      } else {
        // RAG Simulation
        const docs = optimizer.rag.retrieve(userMessage.content);
        if (docs.length > 0) {
          aiContent = `Based on my knowledge base (found ${docs.length} docs), here is the answer...`;
          metadata = { citations: docs };
        }
      }

      const assistantMessage: Message = {
        id: aiResponseId,
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
        status: 'sent',
        metadata
      };

      setMessages(prev => [...prev, assistantMessage]);
      onResponse?.(assistantMessage);
      onFinish?.([...newMessages, assistantMessage]);

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error(error);
        // Handle error state
      }
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
    if (messages.length === 0) return;
    const lastUserMessage = messages[messages.length - 1].role === 'user' 
      ? messages[messages.length - 1] 
      : messages[messages.length - 2];
      
    if (lastUserMessage && lastUserMessage.role === 'user') {
      // Remove last assistant message if exists
      const newHistory = messages.filter(m => m.id !== messages[messages.length - 1].id);
      setMessages(newHistory);
      await processMessage(lastUserMessage);
    }
  };

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
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
    optimizationStats
  };
}
