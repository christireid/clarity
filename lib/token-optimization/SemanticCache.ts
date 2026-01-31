/**
 * Semantic Cache - Content-aware caching
 * Uses embeddings to find similar queries
 */

import type { CacheEntry } from './types';

export class SemanticCache<T = any> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;
  private similarityThreshold: number;

  constructor(maxSize = 1000, similarityThreshold = 0.85) {
    this.maxSize = maxSize;
    this.similarityThreshold = similarityThreshold;
  }

  /**
   * Generate a semantic key from content
   */
  private generateKey(content: string): string {
    // Simple hash for now - in production, use embeddings
    return content.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /**
   * Calculate similarity between two strings
   */
  private calculateSimilarity(str1: string, str2: string): number {
    // Levenshtein distance normalized
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshtein(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Levenshtein distance calculation
   */
  private levenshtein(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Find similar cache entry
   */
  private findSimilar(content: string): CacheEntry<T> | null {
    let bestMatch: { entry: CacheEntry<T>; similarity: number } | null = null;

    for (const entry of this.cache.values()) {
      const similarity = this.calculateSimilarity(content, entry.key);
      if (similarity >= this.similarityThreshold) {
        if (!bestMatch || similarity > bestMatch.similarity) {
          bestMatch = { entry, similarity };
        }
      }
    }

    return bestMatch?.entry || null;
  }

  /**
   * Get from cache
   */
  get(content: string): T | null {
    const key = this.generateKey(content);
    
    // Exact match
    const exact = this.cache.get(key);
    if (exact) {
      exact.hits++;
      return exact.value;
    }

    // Semantic match
    const similar = this.findSimilar(content);
    if (similar) {
      similar.hits++;
      return similar.value;
    }

    return null;
  }

  /**
   * Set in cache
   */
  set(content: string, value: T, tokenCount: number): void {
    const key = this.generateKey(content);

    // Evict if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.findLeastRecentlyUsed();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      key: content,
      value,
      timestamp: Date.now(),
      hits: 0,
      tokenCount,
    });
  }

  /**
   * Find least recently used entry
   */
  private findLeastRecentlyUsed(): string | null {
    let oldest: { key: string; timestamp: number } | null = null;

    for (const [key, entry] of this.cache.entries()) {
      if (!oldest || entry.timestamp < oldest.timestamp) {
        oldest = { key, timestamp: entry.timestamp };
      }
    }

    return oldest?.key || null;
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  getStats() {
    const entries = Array.from(this.cache.values());
    const totalTokens = entries.reduce((sum, e) => sum + e.tokenCount, 0);
    const totalHits = entries.reduce((sum, e) => sum + e.hits, 0);

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      totalTokens,
      totalHits,
      hitRate: totalHits / Math.max(1, this.cache.size),
    };
  }
}
