/**
 * Memory Manager - Specialized memory and context management
 * Implements short-term, long-term, and working memory patterns
 */

import type { MemoryConfig, TokenStats } from './types';
import { MessageCompressor } from './MessageCompressor';

interface MemoryItem {
  id: string;
  content: string;
  timestamp: number;
  importance: number;
  accessCount: number;
  compressed?: string;
  tokenCount: number;
}

export class MemoryManager {
  private shortTermMemory: MemoryItem[] = [];
  private longTermMemory: MemoryItem[] = [];
  private config: MemoryConfig;
  private compressor: MessageCompressor;

  constructor(config: MemoryConfig) {
    this.config = config;
    this.compressor = new MessageCompressor();
  }

  /**
   * Estimate token count
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Calculate importance score
   */
  private calculateImportance(item: MemoryItem): number {
    const recency = 1 - (Date.now() - item.timestamp) / (24 * 60 * 60 * 1000); // Decay over 24h
    const frequency = Math.min(1, item.accessCount / 10); // Max out at 10 accesses
    const lengthScore = Math.min(1, item.tokenCount / 1000); // Longer = more important
    
    return (recency * 0.4) + (frequency * 0.3) + (lengthScore * 0.3);
  }

  /**
   * Add to short-term memory
   */
  async add(content: string, importance = 0.5): Promise<string> {
    const id = Date.now().toString() + Math.random().toString(36);
    const tokenCount = this.estimateTokens(content);

    const item: MemoryItem = {
      id,
      content,
      timestamp: Date.now(),
      importance,
      accessCount: 0,
      tokenCount,
    };

    this.shortTermMemory.push(item);

    // Consolidate if short-term is full
    if (this.shortTermMemory.length > this.config.shortTermSize) {
      await this.consolidate();
    }

    return id;
  }

  /**
   * Consolidate short-term to long-term memory
   */
  private async consolidate(): Promise<void> {
    // Sort by importance
    this.shortTermMemory.sort((a, b) => {
      const importanceA = this.calculateImportance(a);
      const importanceB = this.calculateImportance(b);
      return importanceB - importanceA;
    });

    // Move important items to long-term
    const toMove = this.shortTermMemory.splice(
      0,
      Math.floor(this.config.shortTermSize * 0.3)
    );

    for (const item of toMove) {
      // Compress if over threshold
      if (item.tokenCount > this.config.compressionThreshold) {
        try {
          const { compressed } = await this.compressor.compress(item.content);
          item.compressed = compressed;
        } catch (error) {
          console.warn('Compression failed for memory item', error);
        }
      }

      this.longTermMemory.push(item);
    }

    // Trim long-term if needed
    if (this.longTermMemory.length > this.config.longTermSize) {
      this.longTermMemory.sort((a, b) => {
        const importanceA = this.calculateImportance(a);
        const importanceB = this.calculateImportance(b);
        return importanceB - importanceA;
      });
      
      this.longTermMemory = this.longTermMemory.slice(0, this.config.longTermSize);
    }
  }

  /**
   * Retrieve from memory
   */
  get(id: string): MemoryItem | null {
    // Check short-term first
    let item = this.shortTermMemory.find(m => m.id === id);
    
    if (item) {
      item.accessCount++;
      return item;
    }

    // Check long-term
    item = this.longTermMemory.find(m => m.id === id);
    
    if (item) {
      item.accessCount++;
      return item;
    }

    return null;
  }

  /**
   * Search memory by content
   */
  search(query: string, limit = 10): MemoryItem[] {
    const lowerQuery = query.toLowerCase();
    const results: Array<{ item: MemoryItem; score: number }> = [];

    // Search both memories
    const allMemories = [...this.shortTermMemory, ...this.longTermMemory];

    for (const item of allMemories) {
      const content = item.content.toLowerCase();
      
      if (content.includes(lowerQuery)) {
        // Simple relevance score
        const importance = this.calculateImportance(item);
        const matchIndex = content.indexOf(lowerQuery);
        const positionScore = 1 - (matchIndex / content.length);
        const score = (importance * 0.6) + (positionScore * 0.4);
        
        results.push({ item, score });
      }
    }

    // Sort by score and return top results
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit).map(r => r.item);
  }

  /**
   * Get working memory (most relevant recent items)
   */
  getWorkingMemory(maxTokens: number): MemoryItem[] {
    const working: MemoryItem[] = [];
    let totalTokens = 0;

    // Get recent important items from short-term
    const recentShortTerm = [...this.shortTermMemory]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    for (const item of recentShortTerm) {
      if (totalTokens + item.tokenCount <= maxTokens) {
        working.push(item);
        totalTokens += item.tokenCount;
      }
    }

    // Fill remaining space with important long-term items
    const importantLongTerm = [...this.longTermMemory]
      .sort((a, b) => {
        const importanceA = this.calculateImportance(a);
        const importanceB = this.calculateImportance(b);
        return importanceB - importanceA;
      });

    for (const item of importantLongTerm) {
      if (totalTokens + item.tokenCount <= maxTokens) {
        working.push(item);
        totalTokens += item.tokenCount;
      }
    }

    return working;
  }

  /**
   * Get memory statistics
   */
  getStats(): {
    shortTerm: { count: number; tokens: number };
    longTerm: { count: number; tokens: number; compressed: number };
    total: TokenStats;
  } {
    const shortTermTokens = this.shortTermMemory.reduce((sum, m) => sum + m.tokenCount, 0);
    const longTermTokens = this.longTermMemory.reduce((sum, m) => sum + m.tokenCount, 0);
    const compressedCount = this.longTermMemory.filter(m => m.compressed).length;

    return {
      shortTerm: {
        count: this.shortTermMemory.length,
        tokens: shortTermTokens,
      },
      longTerm: {
        count: this.longTermMemory.length,
        tokens: longTermTokens,
        compressed: compressedCount,
      },
      total: {
        original: shortTermTokens + longTermTokens,
        optimized: shortTermTokens + longTermTokens,
        saved: 0,
        savedPercentage: 0,
      },
    };
  }

  /**
   * Clear all memory
   */
  clear(): void {
    this.shortTermMemory = [];
    this.longTermMemory = [];
  }

  /**
   * Clear only short-term memory
   */
  clearShortTerm(): void {
    this.shortTermMemory = [];
  }
}
