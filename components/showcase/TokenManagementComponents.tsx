"use client";

import * as React from "react";
import { TokenOptimizer, TokenBudgetAllocator, TokenCostCalculator, TokenUsageHistory, CompressionPreview, OptimizationSuggestions } from "@/components/ai/token-optimizer";
import { ComponentCard } from "./ComponentCard";

export function TokenManagementComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Token Optimizer"
        description="Reduce token usage"
      >
        <TokenOptimizer 
          text="This is a very long text that needs optimization to save tokens and cost..."
          onOptimize={(options) => console.log("Optimize:", options)}
        />
      </ComponentCard>

      <ComponentCard
        title="Compression Preview"
        description="Visualize token savings"
      >
        <CompressionPreview 
          original="Long original text..."
          compressed="Short text."
          stats={{ original: 100, compressed: 40, savings: 60 }}
        />
      </ComponentCard>

      <ComponentCard
        title="Budget Allocator"
        description="Distribute token budget"
      >
        <TokenBudgetAllocator 
          total={4096}
          allocation={{ system: 500, history: 2000, new: 1596 }}
          onChange={(alloc) => console.log("Alloc:", alloc)}
        />
      </ComponentCard>

      <ComponentCard
        title="Cost Calculator"
        description="Estimate API costs"
      >
        <TokenCostCalculator 
          tokens={15000}
          model="gpt-4"
        />
      </ComponentCard>

      <ComponentCard
        title="Usage History"
        description="Historical token consumption"
      >
        <TokenUsageHistory 
          history={[
            { date: "2024-01-01", tokens: 1200 },
            { date: "2024-01-02", tokens: 3400 },
            { date: "2024-01-03", tokens: 2100 }
          ]}
        />
      </ComponentCard>
    </div>
  );
}
