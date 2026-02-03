"use client";

import * as React from "react";
import { Artifact } from "@/components/ai/artifact";
import { Plan } from "@/components/ai/queue";
import { BranchingView } from "@/components/ai/conversation-manager";
import { Canvas, CanvasToolbar } from "@/components/ai/canvas";
import { WorkflowNode, AINode, TriggerNode, ConditionNode, ActionNode, NodePalette, WorkflowStatus } from "@/components/ai/workflow-nodes";
import { MindMap, Diagram } from "@/components/ai/mind-map";
import { ComponentCard } from "./ComponentCard";

export function CanvasComponents() {
  return (
    <div className="space-y-8">
      {/* Canvas Editor */}
      <ComponentCard
        title="Canvas Editor"
        description="Visual node-based canvas for building workflows"
      >
        <div className="h-[400px] border rounded-lg overflow-hidden">
          <Canvas
            nodes={[
              { id: "1", type: "trigger", position: { x: 50, y: 100 }, data: { label: "Start" } },
              { id: "2", type: "ai", position: { x: 250, y: 100 }, data: { label: "Process", model: "gpt-4" } },
              { id: "3", type: "action", position: { x: 450, y: 100 }, data: { label: "Output" } },
            ]}
            edges={[
              { id: "e1-2", source: "1", target: "2" },
              { id: "e2-3", source: "2", target: "3" },
            ]}
            onNodesChange={(nodes) => console.log("Nodes changed:", nodes)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Canvas Toolbar"
        description="Toolbar controls for canvas operations"
      >
        <CanvasToolbar
          onAddNode={() => console.log("Add node")}
          onDelete={() => console.log("Delete")}
          onCopy={() => console.log("Copy")}
          onUndo={() => console.log("Undo")}
          onRedo={() => console.log("Redo")}
          canUndo={true}
          canRedo={false}
        />
      </ComponentCard>

      {/* Workflow Nodes */}
      <ComponentCard
        title="Workflow Nodes"
        description="Different node types for visual workflows"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <TriggerNode id="trigger-1" label="On Message" triggerType="webhook" />
          <AINode id="ai-1" label="GPT-4" model="gpt-4" />
          <ConditionNode id="condition-1" label="If Valid" condition="response.valid" />
          <ActionNode id="action-1" label="Send Email" actionType="email" />
          <WorkflowNode id="custom-1" type="default" label="Custom Node" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Node Palette"
        description="Draggable node palette for workflow builder"
      >
        <NodePalette onDragStart={(type) => console.log("Dragging:", type)} />
      </ComponentCard>

      <ComponentCard
        title="Workflow Status"
        description="Real-time workflow execution status"
      >
        <WorkflowStatus
          status="running"
          currentNode="Process Data"
          progress={65}
          startedAt={new Date(Date.now() - 30000)}
        />
      </ComponentCard>

      {/* Mind Map */}
      <ComponentCard
        title="Mind Map"
        description="Interactive mind map for brainstorming"
      >
        <div className="h-[350px] border rounded-lg overflow-hidden">
          <MindMap
            data={{
              id: "root",
              label: "AI Features",
              children: [
                { id: "chat", label: "Chat" },
                { id: "voice", label: "Voice" },
                { id: "vision", label: "Vision" },
                { id: "agents", label: "Agents" },
              ],
            }}
            onNodeClick={(node) => console.log("Clicked:", node)}
            onNodeAdd={(parentId) => console.log("Add to:", parentId)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Diagram"
        description="General-purpose diagram component"
      >
        <div className="h-[250px] border rounded-lg overflow-hidden">
          <Diagram
            nodes={[
              { id: "a", label: "Input", type: "start", x: 50, y: 100 },
              { id: "b", label: "Process", type: "process", x: 200, y: 100 },
              { id: "c", label: "Output", type: "end", x: 350, y: 100 },
            ]}
            edges={[
              { id: "e1", from: "a", to: "b" },
              { id: "e2", from: "b", to: "c" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Artifacts */}
      <ComponentCard
        title="Artifact"
        description="Display generated content artifacts"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Artifact
            artifact={{
              id: "artifact-1",
              type: "code",
              title: "API Handler",
              language: "typescript",
              content: `export async function handler(req: Request) {
  const data = await req.json();
  return Response.json({ success: true });
}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
          />
          <Artifact
            artifact={{
              id: "artifact-2",
              type: "document",
              title: "Project Proposal",
              content: "# Project Overview\n\nThis document outlines the key objectives and milestones for Q1 2024.",
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
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
