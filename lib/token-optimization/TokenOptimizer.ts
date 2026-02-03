/**
 * Token Optimizer - Main orchestrator
 */

import { SemanticCache } from './SemanticCache';
import { ContextManager } from './ContextManager';
import { MessageCompressor } from './MessageCompressor';
import { MarkdownOptimizer } from './MarkdownOptimizer';
import { JSONOptimizer } from './JSONOptimizer';
import { ChunkingStrategy } from './ChunkingStrategy';
import { MemoryManager } from './MemoryManager';
import { SmartRouter } from './SmartRouter';
import { ToolCalling } from './ToolCalling';
import { RAGSystem } from './RAGSystem';
import { StreamHandler } from './StreamHandler';
import type { TokenStats, OptimizationResult, ContextWindow, MemoryConfig } from './types';

export class TokenOptimizer {
  public cache: SemanticCache;
  public context: ContextManager;
  public compressor: MessageCompressor;
  public markdown: MarkdownOptimizer;
  public json: JSONOptimizer;
  public chunker: ChunkingStrategy;
  public memory: MemoryManager;
  public router: SmartRouter;
  public tools: ToolCalling;
  public rag: RAGSystem;
  public stream: StreamHandler;

  constructor(config: {
    contextWindow: ContextWindow;
    memoryConfig: MemoryConfig;
  }) {
    this.cache = new SemanticCache();
    this.context = new ContextManager(config.contextWindow);
    this.compressor = new MessageCompressor();
    this.markdown = new MarkdownOptimizer();
    this.json = new JSONOptimizer();
    this.chunker = new ChunkingStrategy();
    this.memory = new MemoryManager(config.memoryConfig);
    this.router = new SmartRouter([]);
    this.tools = new ToolCalling();
    this.rag = new RAGSystem();
    this.stream = new StreamHandler();
  }

  /**
   * Comprehensive optimization pipeline
   */
  async optimizeRequest(prompt: string, context: any[]): Promise<OptimizationResult> {
    const originalTokens = this.estimateTokens(prompt) + this.estimateTokens(JSON.stringify(context));
    
    // 1. Check cache
    const cached = this.cache.get(prompt);
    if (cached) {
      return {
        data: cached,
        stats: {
          original: originalTokens,
          optimized: 0,
          saved: originalTokens,
          savedPercentage: 100
        },
        metadata: { source: 'cache' }
      };
    }

    // 2. Optimize context
    const optimizedContext = this.context.optimize(context);
    
    // 3. Compress prompt if needed
    const processedPrompt = prompt;
    // ... logic to optimize prompt ...

    const optimizedTokens = this.estimateTokens(processedPrompt) +
      optimizedContext.messages.reduce((sum, m) => {
        const tc = m.tokenCount;
        if (tc === undefined) return sum;
        if (typeof tc === 'number') return sum + tc;
        return sum + tc.total;
      }, 0);

    return {
      data: { prompt: processedPrompt, context: optimizedContext.messages },
      stats: {
        original: originalTokens,
        optimized: optimizedTokens,
        saved: originalTokens - optimizedTokens,
        savedPercentage: ((originalTokens - optimizedTokens) / originalTokens) * 100
      }
    };
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}
