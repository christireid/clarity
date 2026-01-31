"use client";

import * as React from "react";
import { MemoryCard, MemoryManager, WorkingMemoryDisplay, MemoryTimeline, MemoryStats } from "@/components/ai/memory";
import { ComponentCard } from "./ComponentCard";

export function MemoryComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Memory Manager"
        description="Manage long-term memory"
      >
        <MemoryManager 
          memories={[
            { id: "1", content: "User prefers dark mode", type: "preference", createdAt: new Date() },
            { id: "2", content: "Working on a React project", type: "context", createdAt: new Date() },
            { id: "3", content: "Key API endpoint is /v1/users", type: "fact", createdAt: new Date() }
          ]}
          onDelete={(id) => console.log("Delete:", id)}
          onEdit={(id, content) => console.log("Edit:", id, content)}
        />
      </ComponentCard>

      <ComponentCard
        title="Working Memory"
        description="Active context items"
      >
        <WorkingMemoryDisplay 
          items={[
            { key: "Current File", value: "src/App.tsx" },
            { key: "Selected Component", value: "Button" },
            { key: "Last Action", value: "Refactor" }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Memory Timeline"
        description="History of memory updates"
      >
        <MemoryTimeline 
          events={[
            { id: "1", type: "added", content: "Learned user name", timestamp: new Date(Date.now() - 3600000) },
            { id: "2", type: "updated", content: "Updated preference", timestamp: new Date(Date.now() - 1800000) },
            { id: "3", type: "accessed", content: "Retrieved context", timestamp: new Date() }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Memory Stats"
        description="Memory usage and metrics"
      >
        <MemoryStats 
          totalMemories={150}
          shortTerm={12}
          longTerm={138}
          vectorSize="1.2 MB"
        />
      </ComponentCard>
    </div>
  );
}
