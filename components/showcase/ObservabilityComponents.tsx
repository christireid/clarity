"use client";

import * as React from "react";
import { TraceViewer, TraceList, DebugPanel } from "@/components/ai/trace-viewer";
import { CostDisplay, CostSummaryCard, BudgetProgress, ModelPricingTable } from "@/components/ai/cost-tracking";
import { RateLimitBadge, RateLimitProgress, APIUsageDashboard } from "@/components/ai/rate-limiting";
import { ComponentCard } from "./ComponentCard";

export function ObservabilityComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Trace Viewer"
        description="Visualize request traces"
      >
        <TraceViewer 
          trace={{
            id: "t1",
            name: "Generate Report",
            startTime: new Date("2024-01-01T10:00:00"),
            duration: 1200,
            status: "success",
            spans: [
              { id: "s1", name: "Retrieve Context", startTime: 0, duration: 300, status: "success" },
              { id: "s2", name: "LLM Call", startTime: 300, duration: 800, status: "success" },
              { id: "s3", name: "Format Output", startTime: 1100, duration: 100, status: "success" }
            ]
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Trace List"
        description="List of recent traces"
      >
        <TraceList 
          traces={[
            { id: "t1", name: "Generate Report", timestamp: new Date("2024-01-01T10:00:00"), duration: 1200, status: "success" },
            { id: "t2", name: "Code Analysis", timestamp: new Date("2024-01-01T09:59:00"), duration: 4500, status: "error" },
            { id: "t3", name: "Summarization", timestamp: new Date("2024-01-01T09:58:00"), duration: 800, status: "success" }
          ]}
          onSelect={(id) => console.log("Selected trace:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Debug Panel"
        description="Inspect variables and state"
      >
        <DebugPanel 
          variables={{
            user: "John Doe",
            contextLength: 4096,
            activePlugins: ["search", "code"]
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Cost Tracking"
        description="Monitor API costs"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CostDisplay amount={0.045} currency="USD" label="Cost per request" />
          <CostSummaryCard 
            total={12.50} 
            trend={+5} 
            period="This Month" 
            breakdown={[
              { label: "GPT-4", amount: 10.00 },
              { label: "GPT-3.5", amount: 2.50 }
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Budget Progress"
        description="Track spending against budget"
      >
        <BudgetProgress used={45} limit={100} currency="USD" />
      </ComponentCard>

      <ComponentCard
        title="Rate Limiting"
        description="Monitor API usage limits"
      >
        <div className="space-y-4">
          <div className="flex gap-4">
            <RateLimitBadge status="ok" limit={100} remaining={85} />
            <RateLimitBadge status="warning" limit={100} remaining={15} />
            <RateLimitBadge status="critical" limit={100} remaining={0} />
          </div>
          <RateLimitProgress 
            endpoint="/v1/chat/completions"
            limit={60}
            used={45}
            resetIn="15s"
          />
        </div>
      </ComponentCard>
    </div>
  );
}
