/**
 * Token Optimization Types
 */

export interface TokenStats {
  original: number;
  optimized: number;
  saved: number;
  savedPercentage: number;
}

export interface CacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  hits: number;
  tokenCount: number;
}

export interface CompressionOptions {
  algorithm: 'gzip' | 'brotli' | 'none';
  level?: number;
}

export interface ContextWindow {
  maxTokens: number;
  strategy: 'fifo' | 'sliding' | 'importance' | 'hybrid';
  keepSystemMessages?: boolean;
}

export interface ChunkOptions {
  maxTokens: number;
  overlap?: number;
  splitOn?: 'sentence' | 'paragraph' | 'token';
}

export interface MemoryConfig {
  shortTermSize: number;
  longTermSize: number;
  compressionThreshold: number;
}

export interface RouteConfig {
  model: string;
  maxTokens: number;
  costPerToken: number;
  capabilities: string[];
}

export interface OptimizationResult<T = any> {
  data: T;
  stats: TokenStats;
  metadata?: Record<string, any>;
}
