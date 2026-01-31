"use client";

import * as React from "react";
import { ConversationHistoryDashboard } from "@/components/ai/dashboards";
import { ComponentCard } from "./ComponentCard";

export function DashboardContextSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Conversation History Dashboard"
        description="Search and analyze past conversations"
      >
        <ConversationHistoryDashboard />
      </ComponentCard>
    </div>
  );
}
