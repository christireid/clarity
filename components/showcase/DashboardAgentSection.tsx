"use client";

import * as React from "react";
import { AgentTaskDashboard } from "@/components/ai/dashboards";
import { ComponentCard } from "./ComponentCard";

export function DashboardAgentSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Agent Task Dashboard"
        description="Monitor and manage autonomous agents"
      >
        <AgentTaskDashboard />
      </ComponentCard>
    </div>
  );
}
