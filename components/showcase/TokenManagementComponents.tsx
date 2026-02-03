"use client";

import * as React from "react";
import { TokenOptimizer, TokenBudgetAllocator, TokenCostCalculator, TokenUsageHistory, CompressionPreview, OptimizationSuggestions, TokenBreakdownChart } from "@/components/ai/token-optimizer";
import { ComponentCard } from "./ComponentCard";
import { FileText, MessageSquare, Settings, Database } from "lucide-react";

const sampleBreakdown = [
  { category: "System Prompt", tokens: 500, percentage: 12.2, icon: <Settings className="h-4 w-4" />, optimizable: false },
  { category: "Conversation History", tokens: 2000, percentage: 48.8, icon: <MessageSquare className="h-4 w-4" />, optimizable: true, savings: 400 },
  { category: "User Message", tokens: 800, percentage: 19.5, icon: <FileText className="h-4 w-4" />, optimizable: false },
  { category: "Context Documents", tokens: 796, percentage: 19.5, icon: <Database className="h-4 w-4" />, optimizable: true, savings: 200 }
];

const sampleSuggestions = [
  { id: "1", title: "Summarize old messages", description: "Condense messages older than 5 turns", impact: "high" as const, savings: 300, type: "summarization" as const },
  { id: "2", title: "Remove duplicate context", description: "Found 3 similar context blocks", impact: "medium" as const, savings: 150, type: "removal" as const },
  { id: "3", title: "Compress code blocks", description: "Minify code in context", impact: "low" as const, savings: 50, type: "compression" as const }
];

const sampleSettings = {
  autoTruncate: true,
  maxHistoryMessages: 10,
  summarizeThreshold: 2000,
  compressCode: true,
  removeFormatting: false
};

const sampleBudgets = [
  { id: "1", name: "System Prompt", allocated: 500, used: 480, priority: "high" as const, locked: true },
  { id: "2", name: "Conversation", allocated: 2000, used: 1800, priority: "medium" as const },
  { id: "3", name: "Context", allocated: 1000, used: 600, priority: "low" as const },
  { id: "4", name: "Response", allocated: 596, used: 0, priority: "high" as const }
];

const sampleModels = [
  { id: "gpt-4", name: "GPT-4", inputCost: 30, outputCost: 60, contextLimit: 8192 },
  { id: "gpt-3.5", name: "GPT-3.5 Turbo", inputCost: 0.5, outputCost: 1.5, contextLimit: 16384 },
  { id: "claude-3", name: "Claude 3 Sonnet", inputCost: 3, outputCost: 15, contextLimit: 200000 }
];

const sampleRecords = [
  { timestamp: new Date("2024-01-01"), inputTokens: 1200, outputTokens: 400, cost: 0.05 },
  { timestamp: new Date("2024-01-02"), inputTokens: 3400, outputTokens: 1200, cost: 0.14 },
  { timestamp: new Date("2024-01-03"), inputTokens: 2100, outputTokens: 800, cost: 0.09 }
];

export function TokenManagementComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Token Breakdown"
        description="Visualize token usage by category"
      >
        <TokenBreakdownChart
          breakdown={sampleBreakdown}
          total={4096}
          limit={8192}
        />
      </ComponentCard>

      <ComponentCard
        title="Optimization Suggestions"
        description="AI-powered recommendations"
      >
        <OptimizationSuggestions
          suggestions={sampleSuggestions}
          onApply={(id) => console.log("Apply:", id)}
          onDismiss={(id) => console.log("Dismiss:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Optimizer"
        description="Complete optimization panel"
      >
        <TokenOptimizer
          breakdown={sampleBreakdown}
          total={4096}
          limit={8192}
          suggestions={sampleSuggestions}
          settings={sampleSettings}
          onApplySuggestion={(id) => console.log("Apply:", id)}
          onDismissSuggestion={(id) => console.log("Dismiss:", id)}
          onSettingsChange={(settings) => console.log("Settings:", settings)}
          onOptimizeAll={() => console.log("Optimize all")}
        />
      </ComponentCard>

      <ComponentCard
        title="Compression Preview"
        description="Visualize token savings"
      >
        <CompressionPreview
          original="This is a very long piece of text that contains redundant information and could be compressed significantly to save tokens..."
          compressed="Long text with redundant info, compressible to save tokens."
          savings={60}
          method="summarization"
          onAccept={() => console.log("Accept")}
          onReject={() => console.log("Reject")}
        />
      </ComponentCard>

      <ComponentCard
        title="Budget Allocator"
        description="Distribute token budget"
      >
        <TokenBudgetAllocator
          budgets={sampleBudgets}
          totalLimit={4096}
          onBudgetsChange={(budgets) => console.log("Budgets:", budgets)}
        />
      </ComponentCard>

      <ComponentCard
        title="Cost Calculator"
        description="Estimate API costs"
      >
        <TokenCostCalculator
          inputTokens={15000}
          outputTokens={5000}
          models={sampleModels}
          selectedModel="gpt-4"
          onModelChange={(modelId) => console.log("Model:", modelId)}
        />
      </ComponentCard>

      <ComponentCard
        title="Usage History"
        description="Historical token consumption"
      >
        <TokenUsageHistory
          records={sampleRecords}
          period="day"
          onPeriodChange={(period) => console.log("Period:", period)}
        />
      </ComponentCard>
    </div>
  );
}
