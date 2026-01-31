"use client";

import * as React from "react";
import { AgentStatus, SubAgentCard, HumanInTheLoop, TaskOrchestrator } from "@/components/ai/agent";
import { ComponentCard } from "./ComponentCard";

export function AgentComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Agent Status"
        description="Display agent state and progress"
      >
        <div className="space-y-4">
          <AgentStatus
            name="Research Agent"
            status="running"
            currentTask="Analyzing documents"
            progress={65}
            stepsCompleted={3}
            totalSteps={5}
          />
          <AgentStatus
            name="Code Assistant"
            status="idle"
            description="Ready to help with coding tasks"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Sub-Agent Cards"
        description="Display delegated agent tasks"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SubAgentCard
            name="Data Analyzer"
            status="completed"
            task="Process CSV data"
            result="Found 1,234 records"
            duration={2500}
          />
          <SubAgentCard
            name="Web Scraper"
            status="running"
            task="Fetch product prices"
            progress={45}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Human in the Loop"
        description="Request user approval for actions"
      >
        <HumanInTheLoop
          title="Confirm Database Update"
          description="The agent wants to update 150 records in the users table."
          action="UPDATE users SET status = 'active' WHERE last_login > '2024-01-01'"
          type="warning"
          onApprove={() => console.log("Approved")}
          onReject={() => console.log("Rejected")}
          onModify={(modified) => console.log("Modified:", modified)}
        />
      </ComponentCard>

      <ComponentCard
        title="Task Orchestrator"
        description="Manage multiple agent tasks"
      >
        <TaskOrchestrator
          tasks={[
            { id: "1", name: "Research", status: "completed", agent: "Research Agent" },
            { id: "2", name: "Analysis", status: "running", agent: "Data Agent", progress: 60 },
            { id: "3", name: "Report", status: "pending", agent: "Writer Agent" },
          ]}
          onPause={(id) => console.log("Pause:", id)}
          onResume={(id) => console.log("Resume:", id)}
          onCancel={(id) => console.log("Cancel:", id)}
        />
      </ComponentCard>
    </div>
  );
}
