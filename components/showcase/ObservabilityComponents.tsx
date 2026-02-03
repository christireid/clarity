"use client";

import * as React from "react";
import { TraceViewer, TraceList, DebugPanel } from "@/components/ai/trace-viewer";
import { CostDisplay, CostSummaryCard, BudgetProgress, ModelPricingTable } from "@/components/ai/cost-tracking";
import { RateLimitBadge, RateLimitProgress, APIUsageDashboard } from "@/components/ai/rate-limiting";
import { ComponentCard } from "./ComponentCard";

const sampleSpans = [
  { id: "s1", name: "Retrieve Context", type: "retrieval" as const, startTime: new Date("2024-01-01T10:00:00"), duration: 300, status: "success" as const },
  { id: "s2", name: "LLM Call", type: "llm" as const, startTime: new Date("2024-01-01T10:00:00.300"), duration: 800, status: "success" as const },
  { id: "s3", name: "Format Output", type: "custom" as const, startTime: new Date("2024-01-01T10:00:01.100"), duration: 100, status: "success" as const }
];

const sampleTraces = [
  { id: "t1", name: "Generate Report", startTime: new Date("2024-01-01T10:00:00"), status: "success" as const, spans: sampleSpans },
  { id: "t2", name: "Code Analysis", startTime: new Date("2024-01-01T09:59:00"), status: "error" as const, spans: [] },
  { id: "t3", name: "Summarization", startTime: new Date("2024-01-01T09:58:00"), status: "success" as const, spans: [] }
];

export function ObservabilityComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Trace Viewer"
        description="Visualize request traces"
      >
        <TraceViewer
          trace={sampleTraces[0]}
        />
      </ComponentCard>

      <ComponentCard
        title="Trace List"
        description="List of recent traces"
      >
        <TraceList
          traces={sampleTraces}
          onTraceSelect={(trace) => console.log("Selected trace:", trace.id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Debug Panel"
        description="Inspect logs and state"
      >
        <DebugPanel
          logs={[
            { timestamp: new Date(), level: "info", message: "Starting request", data: { user: "John Doe" } },
            { timestamp: new Date(), level: "debug", message: "Context length: 4096" },
            { timestamp: new Date(), level: "warn", message: "High token usage detected" }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Cost Tracking"
        description="Monitor API costs"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CostDisplay amount={0.045} />
          <CostSummaryCard
            summary={{
              totalCost: 12.50,
              periodStart: new Date("2024-01-01"),
              periodEnd: new Date("2024-01-31"),
              byModel: [
                { model: "GPT-4", cost: 10.00, percentage: 80 },
                { model: "GPT-3.5", cost: 2.50, percentage: 20 }
              ],
              byOperation: [
                { operation: "Chat", cost: 12.50, percentage: 100 }
              ],
              trend: 5
            }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Budget Progress"
        description="Track spending against budget"
      >
        <BudgetProgress
          budget={{
            limit: 100,
            used: 45,
            alertThreshold: 80,
            period: "monthly"
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Rate Limiting"
        description="Monitor API usage limits"
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <RateLimitBadge status="ok" remaining={85} />
            <RateLimitBadge status="warning" remaining={15} />
            <RateLimitBadge status="critical" remaining={0} />
          </div>
          <RateLimitProgress
            used={45}
            limit={60}
            label="API Calls"
          />
        </div>
      </ComponentCard>
    </div>
  );
}
