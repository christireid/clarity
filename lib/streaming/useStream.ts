/**
 * Generic Stream Hook
 * 
 * A generic hook for consuming streaming data in ANY component,
 * completely decoupled from the chat logic.
 * 
 * Usage:
 * const { data, text, isLoading, stream } = useStream('/api/status');
 */

import { useState, useCallback, useRef } from 'react';
import { StreamParser } from './StreamParser';
import { StreamType } from './StreamProtocol';

interface UseStreamOptions {
  onText?: (text: string) => void;
  onData?: (data: any) => void;
  onJsonPatch?: (patch: any) => void; // For streaming props
  onError?: (error: any) => void;
}

export function useStream(url?: string, options: UseStreamOptions = {}) {
  const [data, setData] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const parserRef = useRef(new StreamParser());
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (
    overrideUrl?: string, 
    body?: any,
    method: 'GET' | 'POST' = 'POST'
  ) => {
    const targetUrl = overrideUrl || url;
    if (!targetUrl) throw new Error('No URL provided for stream');

    setIsLoading(true);
    setError(null);
    parserRef.current.reset();
    
    // Subscribe to parser events
    const unsubscribe = parserRef.current.subscribe((part) => {
      switch (part.type) {
        case StreamType.TEXT:
          setText(prev => prev + part.content);
          options.onText?.(part.content);
          break;
        case StreamType.DATA:
          try {
            const json = typeof part.content === 'string' ? JSON.parse(part.content) : part.content;
            setData(prev => [...prev, json]);
            options.onData?.(json);
          } catch (e) {
            console.error('Failed to parse data chunk', e);
          }
          break;
        case StreamType.ERROR:
           setError(new Error(part.content));
           options.onError?.(part.content);
           break;
        // Add more handlers as needed
      }
    });

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(targetUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(response.statusText);
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        parserRef.current.feed(value);
      }

    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError(err as Error);
        options.onError?.(err);
      }
    } finally {
      setIsLoading(false);
      unsubscribe();
    }
  }, [url, options]);

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  }, []);

  return {
    startStream,
    stop,
    data,
    text,
    isLoading,
    error
  };
}
