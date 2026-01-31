"use client";

import * as React from "react";
import { Artifact } from "@/components/ai/artifact";
import { Plan } from "@/components/ai/queue";
import { BranchingView } from "@/components/ai/conversation-manager";
import { ComponentCard } from "./ComponentCard";

export function CanvasComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Artifact"
        description="Display generated content artifacts"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Artifact
            type="code"
            title="API Handler"
            language="typescript"
            content={`export async function handler(req: Request) {
  const data = await req.json();
  return Response.json({ success: true });
}`}
          />
          <Artifact
            type="document"
            title="Project Proposal"
            content="# Project Overview\n\nThis document outlines the key objectives and milestones for Q1 2024."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Plan Execution"
        description="Step-by-step execution plan"
      >
        <Plan
          title="Build Feature"
          steps={[
            { id: "1", title: "Setup environment", status: "completed", duration: 1200 },
            { id: "2", title: "Install dependencies", status: "completed", duration: 3400 },
            { id: "3", title: "Create components", status: "running", description: "Building React components" },
            { id: "4", title: "Write tests", status: "pending" },
            { id: "5", title: "Deploy", status: "pending" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Branching View"
        description="Manage conversation branches"
      >
        <BranchingView
          branches={[
            { id: "main", name: "Main", messageId: "1", createdAt: new Date(), isActive: true },
            { id: "alt-1", name: "Alternative approach", messageId: "5", createdAt: new Date(Date.now() - 3600000) },
            { id: "alt-2", name: "Simplified version", messageId: "8", createdAt: new Date(Date.now() - 7200000) },
          ]}
          onSelect={(id) => console.log("Selected branch:", id)}
        />
      </ComponentCard>
    </div>
  );
}
