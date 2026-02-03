"use client";

import * as React from "react";
import { MemoryCard, MemoryManager, WorkingMemoryDisplay, MemoryTimeline, MemoryStats } from "@/components/ai/memory";
import { ComponentCard } from "./ComponentCard";

const sampleMemories = [
  { id: "1", content: "User prefers dark mode", type: "preference" as const, createdAt: new Date("2024-01-01T10:00:00") },
  { id: "2", content: "Working on a React project", type: "context" as const, createdAt: new Date("2024-01-01T10:05:00") },
  { id: "3", content: "Key API endpoint is /v1/users", type: "fact" as const, createdAt: new Date("2024-01-01T10:10:00") }
];

export function MemoryComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Memory Manager"
        description="Manage long-term memory"
      >
        <MemoryManager
          memories={sampleMemories}
          onDeleteMemory={(id: string) => console.log("Delete:", id)}
          onEditMemory={(memory) => console.log("Edit:", memory)}
        />
      </ComponentCard>

      <ComponentCard
        title="Working Memory"
        description="Active context items"
      >
        <WorkingMemoryDisplay
          items={[
            { id: "1", key: "Current File", value: "src/App.tsx", createdAt: new Date() },
            { id: "2", key: "Selected Component", value: "Button", createdAt: new Date() },
            { id: "3", key: "Last Action", value: "Refactor", createdAt: new Date() }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Memory Timeline"
        description="History of memory updates"
      >
        <MemoryTimeline
          memories={sampleMemories}
          onMemoryClick={(memory) => console.log("Memory clicked:", memory)}
        />
      </ComponentCard>

      <ComponentCard
        title="Memory Stats"
        description="Memory usage and metrics"
      >
        <MemoryStats memories={sampleMemories} />
      </ComponentCard>
    </div>
  );
}
