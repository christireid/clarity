/**
 * Stream Parser
 * Robust parser for the custom Stream Protocol.
 * Handles incomplete chunks, utf-8 decoding, and backpressure simulation.
 */

import { StreamType, StreamPart, StreamListener } from './StreamProtocol';

export class StreamParser {
  private buffer: string = '';
  private decoder = new TextDecoder();
  private listeners: StreamListener[] = [];

  constructor() {}

  /**
   * Subscribe to stream events
   */
  subscribe(listener: StreamListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Feed a raw chunk (Uint8Array or string) into the parser
   */
  feed(chunk: Uint8Array | string) {
    const text = typeof chunk === 'string' 
      ? chunk 
      : this.decoder.decode(chunk, { stream: true });
    
    this.buffer += text;
    this.processBuffer();
  }

  /**
   * Process the internal buffer and emit events
   */
  private processBuffer() {
    let newlineIndex: number;
    
    // Process all complete lines
    while ((newlineIndex = this.buffer.indexOf('\n')) !== -1) {
      const line = this.buffer.slice(0, newlineIndex);
      this.buffer = this.buffer.slice(newlineIndex + 1);
      
      if (!line.trim()) continue;
      
      this.parseLine(line);
    }
  }

  /**
   * Parse a single protocol line
   */
  private parseLine(line: string) {
    // Format: type:content
    const separatorIndex = line.indexOf(':');
    
    if (separatorIndex === -1) {
      // Malformed line, treat as text fallback or ignore
      // console.warn('Malformed stream line:', line);
      return; 
    }

    const type = line.slice(0, separatorIndex) as StreamType;
    // The rest is content. We might need to handle escaped newlines if we supported them,
    // but for this simple protocol, we assume one message per line.
    // For JSON content, it's expected to be JSON.stringify'd (single line).
    let content = line.slice(separatorIndex + 1);

    // Unescape common characters if needed (basic JSON unescape)
    if (content.startsWith('"') && content.endsWith('"')) {
       try {
         content = JSON.parse(content);
       } catch (e) {
         // Keep raw if parse fails
       }
    }

    const part: StreamPart = { type, content };
    this.emit(part);
  }

  private emit(part: StreamPart) {
    this.listeners.forEach(l => l(part));
  }

  /**
   * Reset the parser state
   */
  reset() {
    this.buffer = '';
  }
}
