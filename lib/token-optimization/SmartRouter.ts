/**
 * Smart Router - Route requests to optimal models based on complexity
 */

import type { RouteConfig } from './types';

export class SmartRouter {
  private routes: RouteConfig[];

  constructor(routes: RouteConfig[]) {
    this.routes = routes.sort((a, b) => b.maxTokens - a.maxTokens);
  }

  /**
   * Estimate token count
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Analyze query complexity
   */
  private analyzeComplexity(query: string): {
    score: number;
    requiresCode: boolean;
    requiresReasoning: boolean;
    requiresCreativity: boolean;
  } {
    const lowerQuery = query.toLowerCase();
    let score = 0.5; // Base complexity

    // Check for code-related keywords
    const codeKeywords = ['code', 'function', 'class', 'algorithm', 'debug', 'implement', 'program'];
    const requiresCode = codeKeywords.some(kw => lowerQuery.includes(kw));
    if (requiresCode) score += 0.2;

    // Check for reasoning keywords
    const reasoningKeywords = ['why', 'how', 'explain', 'analyze', 'compare', 'reason', 'logic'];
    const requiresReasoning = reasoningKeywords.some(kw => lowerQuery.includes(kw));
    if (requiresReasoning) score += 0.15;

    // Check for creative keywords
    const creativeKeywords = ['create', 'design', 'imagine', 'story', 'generate', 'write'];
    const requiresCreativity = creativeKeywords.some(kw => lowerQuery.includes(kw));
    if (requiresCreativity) score += 0.1;

    // Length affects complexity
    const tokens = this.estimateTokens(query);
    if (tokens > 200) score += 0.1;
    if (tokens > 500) score += 0.1;

    // Question marks suggest complexity
    const questionCount = (query.match(/\?/g) || []).length;
    score += Math.min(0.1, questionCount * 0.05);

    return {
      score: Math.min(1, score),
      requiresCode,
      requiresReasoning,
      requiresCreativity,
    };
  }

  /**
   * Find best route for query
   */
  route(query: string, context?: string): {
    route: RouteConfig;
    reasoning: string;
    estimatedCost: number;
  } {
    const complexity = this.analyzeComplexity(query);
    const totalTokens = this.estimateTokens(query + (context || ''));

    // Filter routes that can handle token count
    const viableRoutes = this.routes.filter(r => r.maxTokens >= totalTokens);

    if (viableRoutes.length === 0) {
      throw new Error(`No route can handle ${totalTokens} tokens`);
    }

    // Score each route
    const scored = viableRoutes.map(route => {
      let score = 0;

      // Match capabilities to requirements
      if (complexity.requiresCode && route.capabilities.includes('code')) {
        score += 0.3;
      }
      if (complexity.requiresReasoning && route.capabilities.includes('reasoning')) {
        score += 0.3;
      }
      if (complexity.requiresCreativity && route.capabilities.includes('creative')) {
        score += 0.2;
      }

      // Prefer models that match complexity
      const complexityMatch = 1 - Math.abs(complexity.score - (route.maxTokens / 100000));
      score += complexityMatch * 0.2;

      // Consider cost (prefer cheaper for simple queries)
      const costScore = 1 - (route.costPerToken / 0.001); // Normalize cost
      if (complexity.score < 0.5) {
        score += costScore * 0.3;
      }

      return { route, score };
    });

    // Sort by score
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    // Generate reasoning
    let reasoning = `Selected ${best.route.model} because:`;
    if (complexity.requiresCode && best.route.capabilities.includes('code')) {
      reasoning += ' requires code generation,';
    }
    if (complexity.requiresReasoning) {
      reasoning += ' involves complex reasoning,';
    }
    if (complexity.score < 0.5) {
      reasoning += ' query is relatively simple,';
    }
    reasoning += ` complexity score: ${complexity.score.toFixed(2)}`;

    // Estimate cost
    const estimatedCost = totalTokens * best.route.costPerToken;

    return {
      route: best.route,
      reasoning,
      estimatedCost,
    };
  }

  /**
   * Get route by model name
   */
  getRoute(model: string): RouteConfig | undefined {
    return this.routes.find(r => r.model === model);
  }

  /**
   * Add new route
   */
  addRoute(route: RouteConfig): void {
    this.routes.push(route);
    this.routes.sort((a, b) => b.maxTokens - a.maxTokens);
  }

  /**
   * Get all routes
   */
  getRoutes(): RouteConfig[] {
    return [...this.routes];
  }

  /**
   * Estimate cost for multiple queries
   */
  estimateBatchCost(queries: string[], contextSize = 0): {
    total: number;
    perQuery: number[];
    breakdown: Array<{ query: string; model: string; cost: number }>;
  } {
    const results = queries.map(query => {
      const { route, estimatedCost } = this.route(query);
      return {
        query: query.slice(0, 50) + (query.length > 50 ? '...' : ''),
        model: route.model,
        cost: estimatedCost,
      };
    });

    const total = results.reduce((sum, r) => sum + r.cost, 0);
    const perQuery = results.map(r => r.cost);

    return {
      total,
      perQuery,
      breakdown: results,
    };
  }
}
