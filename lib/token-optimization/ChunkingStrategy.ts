/**
 * Chunking Strategy - Split content into optimal chunks
 */

import type { ChunkOptions, TokenStats } from './types';

export class ChunkingStrategy {
  /**
   * Estimate token count
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Split on sentences
   */
  private splitSentences(text: string): string[] {
    return text
      .split(/([.!?]+\s+)/)  // Split on sentence endings
      .reduce((acc: string[], part, i, arr) => {
        if (i % 2 === 0) {
          const sentence = part + (arr[i + 1] || '');
          if (sentence.trim()) {
            acc.push(sentence.trim());
          }
        }
        return acc;
      }, []);
  }

  /**
   * Split on paragraphs
   */
  private splitParagraphs(text: string): string[] {
    return text
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(Boolean);
  }

  /**
   * Split by token count
   */
  private splitByTokens(text: string, maxTokens: number): string[] {
    const chunks: string[] = [];
    const words = text.split(/\s+/);
    let currentChunk: string[] = [];
    let currentTokens = 0;

    for (const word of words) {
      const wordTokens = this.estimateTokens(word);
      
      if (currentTokens + wordTokens > maxTokens && currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [word];
        currentTokens = wordTokens;
      } else {
        currentChunk.push(word);
        currentTokens += wordTokens;
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    return chunks;
  }

  /**
   * Add overlap between chunks
   */
  private addOverlap(chunks: string[], overlapTokens: number): string[] {
    if (chunks.length <= 1 || overlapTokens === 0) {
      return chunks;
    }

    const overlapped: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      let chunk = chunks[i];

      // Add overlap from previous chunk
      if (i > 0) {
        const prevChunk = chunks[i - 1];
        const prevWords = prevChunk.split(/\s+/);
        const overlapWords = prevWords.slice(-Math.ceil(overlapTokens));
        chunk = overlapWords.join(' ') + ' ' + chunk;
      }

      overlapped.push(chunk);
    }

    return overlapped;
  }

  /**
   * Chunk text with specified strategy
   */
  chunk(
    text: string,
    options: ChunkOptions
  ): { chunks: string[]; stats: TokenStats } {
    const originalTokens = this.estimateTokens(text);
    let chunks: string[];

    // Split based on strategy
    switch (options.splitOn) {
      case 'sentence':
        const sentences = this.splitSentences(text);
        chunks = [];
        let currentChunk: string[] = [];
        let currentTokens = 0;

        for (const sentence of sentences) {
          const sentenceTokens = this.estimateTokens(sentence);
          
          if (currentTokens + sentenceTokens > options.maxTokens && currentChunk.length > 0) {
            chunks.push(currentChunk.join(' '));
            currentChunk = [sentence];
            currentTokens = sentenceTokens;
          } else {
            currentChunk.push(sentence);
            currentTokens += sentenceTokens;
          }
        }
        
        if (currentChunk.length > 0) {
          chunks.push(currentChunk.join(' '));
        }
        break;

      case 'paragraph':
        const paragraphs = this.splitParagraphs(text);
        chunks = [];
        let paraChunk: string[] = [];
        let paraTokens = 0;

        for (const para of paragraphs) {
          const paraTokenCount = this.estimateTokens(para);
          
          if (paraTokenCount > options.maxTokens) {
            // Paragraph too large, split it
            const subChunks = this.splitByTokens(para, options.maxTokens);
            
            if (paraChunk.length > 0) {
              chunks.push(paraChunk.join('\n\n'));
              paraChunk = [];
              paraTokens = 0;
            }
            
            chunks.push(...subChunks);
          } else if (paraTokens + paraTokenCount > options.maxTokens && paraChunk.length > 0) {
            chunks.push(paraChunk.join('\n\n'));
            paraChunk = [para];
            paraTokens = paraTokenCount;
          } else {
            paraChunk.push(para);
            paraTokens += paraTokenCount;
          }
        }
        
        if (paraChunk.length > 0) {
          chunks.push(paraChunk.join('\n\n'));
        }
        break;

      case 'token':
      default:
        chunks = this.splitByTokens(text, options.maxTokens);
        break;
    }

    // Add overlap if specified
    if (options.overlap && options.overlap > 0) {
      chunks = this.addOverlap(chunks, options.overlap);
    }

    const chunkedTokens = chunks.reduce((sum, chunk) => {
      return sum + this.estimateTokens(chunk);
    }, 0);

    return {
      chunks,
      stats: {
        original: originalTokens,
        optimized: chunkedTokens,
        saved: 0, // Chunking doesn't save tokens
        savedPercentage: 0,
      },
    };
  }

  /**
   * Smart chunking - automatically choose best strategy
   */
  smartChunk(text: string, maxTokens: number): string[] {
    const tokens = this.estimateTokens(text);

    // If within limit, no chunking needed
    if (tokens <= maxTokens) {
      return [text];
    }

    // Try paragraph-based first (preserves structure)
    const paragraphs = this.splitParagraphs(text);
    if (paragraphs.length > 1) {
      const result = this.chunk(text, {
        maxTokens,
        splitOn: 'paragraph',
        overlap: Math.floor(maxTokens * 0.1), // 10% overlap
      });
      return result.chunks;
    }

    // Try sentence-based
    const sentences = this.splitSentences(text);
    if (sentences.length > 1) {
      const result = this.chunk(text, {
        maxTokens,
        splitOn: 'sentence',
        overlap: Math.floor(maxTokens * 0.05), // 5% overlap
      });
      return result.chunks;
    }

    // Fall back to token-based
    const result = this.chunk(text, {
      maxTokens,
      splitOn: 'token',
      overlap: Math.floor(maxTokens * 0.05),
    });
    return result.chunks;
  }
}
