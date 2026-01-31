/**
 * KV Cache - Key-Value caching for prompt prefixes
 * Reduces redundant token processing
 */

import type { CacheEntry } from './types';

export class KVCache<T = any> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private ttl: number; // Time to live in ms

  constructor(ttl = 3600000) { // 1 hour default
    this.ttl = ttl;
    this.startCleanupInterval();
  }

  /**
   * Generate cache key from prompt prefix
   */
  private generateKey(prefix: string): string {
    // Use hash for consistent keys
    let hash = 0;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `kv_${hash}`;
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp > this.ttl;
  }

  /**
   * Get cached value
   */
  get(prefix: string): T | null {
    const key = this.generateKey(prefix);
    const entry = this.cache.get(key);

    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }

    entry.hits++;
    return entry.value;
  }

  /**
   * Set cached value
   */
  set(prefix: string, value: T, tokenCount: number): void {
    const key = this.generateKey(prefix);
    
    this.cache.set(key, {
      key: prefix,
      value,
      timestamp: Date.now(),
      hits: 0,
      tokenCount,
    });
  }

  /**
   * Find cached prefix that matches start of prompt
   */
  findMatchingPrefix(prompt: string): { prefix: string; value: T; tokens: number } | null {
    // Sort entries by length (longest first)
    const entries = Array.from(this.cache.values())
      .filter(e => !this.isExpired(e))
      .sort((a, b) => b.key.length - a.key.length);

    for (const entry of entries) {
      if (prompt.startsWith(entry.key)) {
        entry.hits++;
        return {
          prefix: entry.key,
          value: entry.value,
          tokens: entry.tokenCount,
        };
      }
    }

    return null;
  }

  /**
   * Clear expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Start automatic cleanup
   */
  private startCleanupInterval(): void {
    setInterval(() => this.cleanup(), this.ttl / 4);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.cache.values());
    const totalTokens = entries.reduce((sum, e) => sum + e.tokenCount, 0);
    const totalHits = entries.reduce((sum, e) => sum + e.hits, 0);

    return {
      size: this.cache.size,
      totalTokens,
      totalHits,
      tokensSaved: totalHits * (totalTokens / Math.max(1, this.cache.size)),
    };
  }
}
