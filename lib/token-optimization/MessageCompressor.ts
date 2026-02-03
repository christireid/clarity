/**
 * Message Compressor - Compress messages using various algorithms
 */

import type { CompressionOptions, TokenStats } from './types';

export class MessageCompressor {
  /**
   * Remove redundant whitespace
   */
  private removeWhitespace(text: string): string {
    return text
      .replace(/\s+/g, ' ')  // Multiple spaces to single
      .replace(/\n\s*\n/g, '\n') // Multiple newlines to single
      .trim();
  }

  /**
   * Remove filler words (for casual conversation)
   */
  private removeFillers(text: string): string {
    const fillers = [
      'um', 'uh', 'like', 'you know', 'I mean', 'basically',
      'actually', 'literally', 'honestly', 'really', 'very',
      'just', 'maybe', 'perhaps', 'sort of', 'kind of'
    ];

    let result = text;
    fillers.forEach(filler => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      result = result.replace(regex, '');
    });

    return this.removeWhitespace(result);
  }

  /**
   * Abbreviate common phrases
   */
  private abbreviate(text: string): string {
    const abbreviations: Record<string, string> = {
      'for example': 'e.g.',
      'that is': 'i.e.',
      'as soon as possible': 'ASAP',
      'in my opinion': 'IMO',
      'by the way': 'BTW',
      'thank you': 'thanks',
      'please': 'pls',
      'because': 'bc',
      'before': 'b4',
      'with': 'w/',
      'without': 'w/o',
      'at the moment': 'atm',
      'be right back': 'BRB',
    };

    let result = text;
    Object.entries(abbreviations).forEach(([phrase, abbr]) => {
      const regex = new RegExp(phrase, 'gi');
      result = result.replace(regex, abbr);
    });

    return result;
  }

  /**
   * Compress using text compression
   */
  private async compressText(text: string, algorithm: 'gzip' | 'brotli'): Promise<string> {
    if (typeof window === 'undefined') {
      // Node.js environment
      const zlib = await import('zlib');
      const util = await import('util');
      
      const buffer = Buffer.from(text, 'utf-8');
      
      if (algorithm === 'gzip') {
        const gzip = util.promisify(zlib.gzip);
        const compressed = await gzip(buffer);
        return compressed.toString('base64');
      } else {
        const brotli = util.promisify(zlib.brotliCompress);
        const compressed = await brotli(buffer);
        return compressed.toString('base64');
      }
    } else {
      // Browser environment - use CompressionStream if available
      // Note: CompressionStream only supports 'gzip' and 'deflate', not 'brotli'
      const browserAlgorithm: CompressionFormat = algorithm === 'brotli' ? 'gzip' : algorithm;
      if ('CompressionStream' in window) {
        const stream = new CompressionStream(browserAlgorithm);
        const writer = stream.writable.getWriter();
        writer.write(new TextEncoder().encode(text));
        writer.close();

        const reader = stream.readable.getReader();
        const chunks: Uint8Array[] = [];
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }

        const compressed = new Uint8Array(
          chunks.reduce((acc, chunk) => acc + chunk.length, 0)
        );
        
        let offset = 0;
        chunks.forEach(chunk => {
          compressed.set(chunk, offset);
          offset += chunk.length;
        });

        return btoa(String.fromCharCode(...compressed));
      }
      
      // Fallback: no compression
      return text;
    }
  }

  /**
   * Smart compression - Choose best method
   */
  async compress(
    text: string,
    options: CompressionOptions = { algorithm: 'none' }
  ): Promise<{ compressed: string; stats: TokenStats }> {
    const original = text;
    let result = text;

    // Apply text optimizations
    result = this.removeWhitespace(result);
    result = this.removeFillers(result);
    result = this.abbreviate(result);

    // Apply compression algorithm if specified
    if (options.algorithm !== 'none') {
      try {
        result = await this.compressText(result, options.algorithm);
      } catch (error) {
        console.warn('Compression failed, using text optimization only', error);
      }
    }

    return {
      compressed: result,
      stats: {
        original: original.length,
        optimized: result.length,
        saved: original.length - result.length,
        savedPercentage: ((original.length - result.length) / original.length) * 100,
      },
    };
  }

  /**
   * Decompress text
   */
  async decompress(compressed: string, algorithm: 'gzip' | 'brotli'): Promise<string> {
    if (typeof window === 'undefined') {
      // Node.js environment
      const zlib = await import('zlib');
      const util = await import('util');
      
      const buffer = Buffer.from(compressed, 'base64');
      
      if (algorithm === 'gzip') {
        const gunzip = util.promisify(zlib.gunzip);
        const decompressed = await gunzip(buffer);
        return decompressed.toString('utf-8');
      } else {
        const brotli = util.promisify(zlib.brotliDecompress);
        const decompressed = await brotli(buffer);
        return decompressed.toString('utf-8');
      }
    } else {
      // Browser environment
      // Note: DecompressionStream only supports 'gzip' and 'deflate', not 'brotli'
      const browserAlgorithm: CompressionFormat = algorithm === 'brotli' ? 'gzip' : algorithm;
      if ('DecompressionStream' in window) {
        const stream = new DecompressionStream(browserAlgorithm);
        const writer = stream.writable.getWriter();
        
        const bytes = Uint8Array.from(atob(compressed), c => c.charCodeAt(0));
        writer.write(bytes);
        writer.close();

        const reader = stream.readable.getReader();
        const chunks: Uint8Array[] = [];
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }

        const decompressed = new Uint8Array(
          chunks.reduce((acc, chunk) => acc + chunk.length, 0)
        );
        
        let offset = 0;
        chunks.forEach(chunk => {
          decompressed.set(chunk, offset);
          offset += chunk.length;
        });

        return new TextDecoder().decode(decompressed);
      }
      
      return compressed;
    }
  }
}
