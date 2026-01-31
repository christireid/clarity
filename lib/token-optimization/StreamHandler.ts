/**
 * Stream Handler - Manage streaming responses and backpressure
 */

export class StreamHandler {
  private buffer: string = '';
  private decoder = new TextDecoder();

  /**
   * Process a stream chunk
   */
  processChunk(chunk: Uint8Array | string): string {
    const text = typeof chunk === 'string' 
      ? chunk 
      : this.decoder.decode(chunk, { stream: true });
    
    this.buffer += text;
    return text;
  }

  /**
   * Extract complete lines (good for SSE)
   */
  readLines(): string[] {
    const lines = this.buffer.split('\n');
    // Keep the last partial line in buffer
    this.buffer = lines.pop() || '';
    return lines.filter(line => line.trim() !== '');
  }

  /**
   * Parse Server-Sent Events (data: ...)
   */
  parseSSE(): any[] {
    const lines = this.readLines();
    const results: any[] = [];

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const json = line.slice(6);
          if (json.trim() === '[DONE]') continue;
          results.push(JSON.parse(json));
        } catch (e) {
          console.warn('Failed to parse SSE line:', line);
        }
      }
    }
    return results;
  }

  /**
   * Clear buffer
   */
  reset() {
    this.buffer = '';
  }
}
