/**
 * Context Manager - Sliding window and importance-based context management
 */

import type { ContextWindow, TokenStats } from './types';

interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tokenCount?: number | { input?: number; output?: number; total: number };
  importance?: number;
  timestamp: Date;
  createdAt?: Date;
}

export class ContextManager {
  private config: ContextWindow;

  constructor(config: ContextWindow) {
    this.config = config;
  }

  /**
   * Estimate token count (simple heuristic)
   */
  private estimateTokens(text: string): number {
    // Rough estimate: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  /**
   * Get token count from message (handles both number and object formats)
   */
  private getTokenCount(message: Message): number {
    if (message.tokenCount === undefined) {
      return this.estimateTokens(message.content);
    }
    if (typeof message.tokenCount === 'number') {
      return message.tokenCount;
    }
    return message.tokenCount.total;
  }

  /**
   * Calculate message importance
   */
  private calculateImportance(message: Message, index: number, total: number): number {
    let score = 0;

    // System messages are critical
    if (message.role === 'system') {
      return 1.0;
    }

    // Recent messages are more important (recency bias)
    const recencyScore = index / total;
    score += recencyScore * 0.4;

    // Longer messages might be more important
    const lengthScore = Math.min(1, (message.content.length / 1000));
    score += lengthScore * 0.2;

    // User messages slightly more important than assistant
    if (message.role === 'user') {
      score += 0.2;
    }

    // Custom importance if provided
    if (message.importance !== undefined) {
      score += message.importance * 0.2;
    }

    return Math.min(1, score);
  }

  /**
   * FIFO strategy - Keep most recent messages
   */
  private applyFIFO(messages: Message[]): Message[] {
    const result: Message[] = [];
    let totalTokens = 0;

    // Add system messages first if configured
    if (this.config.keepSystemMessages) {
      const systemMessages = messages.filter(m => m.role === 'system');
      result.push(...systemMessages);
      totalTokens = systemMessages.reduce((sum, m) => {
        const tokens = this.getTokenCount(m);
        return sum + tokens;
      }, 0);
    }

    // Add recent messages
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if (message.role === 'system' && this.config.keepSystemMessages) continue;

      const tokens = this.getTokenCount(message);
      if (totalTokens + tokens <= this.config.maxTokens) {
        result.unshift(message);
        totalTokens += tokens;
      } else {
        break;
      }
    }

    return result;
  }

  /**
   * Sliding window strategy
   */
  private applySlidingWindow(messages: Message[]): Message[] {
    // Keep system messages and sliding window of conversation
    const systemMessages = this.config.keepSystemMessages
      ? messages.filter(m => m.role === 'system')
      : [];
    
    const conversationMessages = messages.filter(m => 
      m.role !== 'system' || !this.config.keepSystemMessages
    );

    let totalTokens = systemMessages.reduce((sum, m) => {
      return sum + (this.getTokenCount(m));
    }, 0);

    const windowSize = Math.floor((this.config.maxTokens - totalTokens) / 2);
    const recentMessages: Message[] = [];

    // Get recent messages
    for (let i = conversationMessages.length - 1; i >= 0; i--) {
      const message = conversationMessages[i];
      const tokens = this.getTokenCount(message);
      
      if (totalTokens + tokens <= this.config.maxTokens) {
        recentMessages.unshift(message);
        totalTokens += tokens;
      } else {
        break;
      }
    }

    return [...systemMessages, ...recentMessages];
  }

  /**
   * Importance-based strategy - Keep most important messages
   */
  private applyImportance(messages: Message[]): Message[] {
    // Calculate importance scores
    const scored = messages.map((msg, index) => ({
      message: msg,
      importance: this.calculateImportance(msg, index, messages.length),
      tokens: this.getTokenCount(msg),
    }));

    // Sort by importance
    scored.sort((a, b) => b.importance - a.importance);

    // Select messages within token budget
    const result: Message[] = [];
    let totalTokens = 0;

    for (const item of scored) {
      if (totalTokens + item.tokens <= this.config.maxTokens) {
        result.push(item.message);
        totalTokens += item.tokens;
      }
    }

    // Restore chronological order
    return result.sort((a, b) => {
      const aIndex = messages.indexOf(a);
      const bIndex = messages.indexOf(b);
      return aIndex - bIndex;
    });
  }

  /**
   * Hybrid strategy - Combine recency and importance
   */
  private applyHybrid(messages: Message[]): Message[] {
    const systemMessages = this.config.keepSystemMessages
      ? messages.filter(m => m.role === 'system')
      : [];
    
    let totalTokens = systemMessages.reduce((sum, m) => {
      return sum + (this.getTokenCount(m));
    }, 0);

    const conversationMessages = messages.filter(m => 
      m.role !== 'system' || !this.config.keepSystemMessages
    );

    // Keep last N messages (recency)
    const recentCount = Math.ceil(conversationMessages.length * 0.3);
    const recentMessages = conversationMessages.slice(-recentCount);

    // Add recent messages
    for (const msg of recentMessages) {
      const tokens = this.getTokenCount(msg);
      totalTokens += tokens;
    }

    // Fill remaining space with important messages
    const remainingMessages = conversationMessages.slice(0, -recentCount);
    const scored = remainingMessages.map((msg, index) => ({
      message: msg,
      importance: this.calculateImportance(msg, index, remainingMessages.length),
      tokens: this.getTokenCount(msg),
    }));

    scored.sort((a, b) => b.importance - a.importance);

    const selected: Message[] = [];
    for (const item of scored) {
      if (totalTokens + item.tokens <= this.config.maxTokens) {
        selected.push(item.message);
        totalTokens += item.tokens;
      }
    }

    // Combine and restore order
    const result = [...systemMessages, ...selected, ...recentMessages];
    return result.sort((a, b) => {
      const aIndex = messages.indexOf(a);
      const bIndex = messages.indexOf(b);
      return aIndex - bIndex;
    });
  }

  /**
   * Optimize context window
   */
  optimize(messages: Message[]): { messages: Message[]; stats: TokenStats } {
    const originalTokens = messages.reduce((sum, m) => {
      return sum + (this.getTokenCount(m));
    }, 0);

    let optimized: Message[];

    switch (this.config.strategy) {
      case 'fifo':
        optimized = this.applyFIFO(messages);
        break;
      case 'sliding':
        optimized = this.applySlidingWindow(messages);
        break;
      case 'importance':
        optimized = this.applyImportance(messages);
        break;
      case 'hybrid':
        optimized = this.applyHybrid(messages);
        break;
      default:
        optimized = messages;
    }

    const optimizedTokens = optimized.reduce((sum, m) => {
      return sum + (this.getTokenCount(m));
    }, 0);

    return {
      messages: optimized,
      stats: {
        original: originalTokens,
        optimized: optimizedTokens,
        saved: originalTokens - optimizedTokens,
        savedPercentage: ((originalTokens - optimizedTokens) / originalTokens) * 100,
      },
    };
  }
}
