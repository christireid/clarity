"use client";

import * as React from "react";
import { PromptLibraryDashboard } from "@/components/ai/dashboards";
import { ComponentCard } from "./ComponentCard";

export function DashboardPromptSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Prompt Library Dashboard"
        description="Organize and test prompts"
      >
        <PromptLibraryDashboard />
      </ComponentCard>
    </div>
  );
}
