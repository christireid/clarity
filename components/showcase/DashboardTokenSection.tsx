"use client";

import * as React from "react";
import { TokenOptimizationDashboard } from "@/components/ai/dashboards";
import { ComponentCard } from "./ComponentCard";

export function DashboardTokenSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Token Optimization Dashboard"
        description="Complete view of token usage and optimization"
      >
        <TokenOptimizationDashboard />
      </ComponentCard>
    </div>
  );
}
