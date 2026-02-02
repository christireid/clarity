"use client";

import * as React from "react";
import { Artifact } from "@/components/ai/artifact";
import { Plan } from "@/components/ai/queue";
import { BranchingView } from "@/components/ai/conversation-manager";
import { Canvas, CanvasToolbar } from "@/components/ai/canvas";
import { WorkflowNode, AINode, TriggerNode, ConditionNode, ActionNode, NodePalette, WorkflowStatus } from "@/components/ai/workflow-nodes";
import { MindMap, Diagram } from "@/components/ai/mind-map";
import { ResizablePanel, SplitPane, FloatingPanel, PanelGroup } from "@/components/ai/draggable-panels";
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
          onZoomIn={() => console.log("Zoom in")}
          onZoomOut={() => console.log("Zoom out")}
          onFitView={() => console.log("Fit view")}
          onUndo={() => console.log("Undo")}
          onRedo={() => console.log("Redo")}
        />
      </ComponentCard>

      {/* Workflow Nodes */}
      <ComponentCard
        title="Workflow Nodes"
        description="Different node types for visual workflows"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <TriggerNode data={{ label: "On Message", trigger: "message" }} />
          <AINode data={{ label: "GPT-4", model: "gpt-4", prompt: "Analyze..." }} />
          <ConditionNode data={{ label: "If Valid", condition: "response.valid" }} />
          <ActionNode data={{ label: "Send Email", action: "email" }} />
          <WorkflowNode data={{ label: "Custom Node" }} type="default" />
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
          startTime={new Date(Date.now() - 30000)}
          logs={[
            { timestamp: new Date(Date.now() - 25000), message: "Workflow started", level: "info" },
            { timestamp: new Date(Date.now() - 20000), message: "Processing input data", level: "info" },
            { timestamp: new Date(Date.now() - 10000), message: "AI model invoked", level: "info" },
          ]}
        />
      </ComponentCard>

      {/* Mind Map */}
      <ComponentCard
        title="Mind Map"
        description="Interactive mind map for brainstorming"
      >
        <div className="h-[350px] border rounded-lg overflow-hidden">
          <MindMap
            nodes={[
              { id: "root", label: "AI Features", x: 300, y: 150, isRoot: true },
              { id: "chat", label: "Chat", x: 150, y: 80, parentId: "root" },
              { id: "voice", label: "Voice", x: 450, y: 80, parentId: "root" },
              { id: "vision", label: "Vision", x: 150, y: 220, parentId: "root" },
              { id: "agents", label: "Agents", x: 450, y: 220, parentId: "root" },
            ]}
            onNodeClick={(id) => console.log("Clicked:", id)}
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
              { id: "a", label: "Input", x: 50, y: 100 },
              { id: "b", label: "Process", x: 200, y: 100 },
              { id: "c", label: "Output", x: 350, y: 100 },
            ]}
            edges={[
              { from: "a", to: "b" },
              { from: "b", to: "c" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Draggable Panels */}
      <ComponentCard
        title="Draggable Panels"
        description="Resizable panel layout system"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <DraggablePanels>
            <Panel defaultSize={30} minSize={20}>
              <div className="h-full bg-muted/50 p-4">
                <h4 className="font-medium">Sidebar</h4>
                <p className="text-sm text-muted-foreground">Drag to resize</p>
              </div>
            </Panel>
            <PanelResizer />
            <Panel defaultSize={70}>
              <div className="h-full bg-background p-4">
                <h4 className="font-medium">Main Content</h4>
                <p className="text-sm text-muted-foreground">Flexible layout</p>
              </div>
            </Panel>
          </DraggablePanels>
        </div>
      </ComponentCard>

      {/* Artifacts */}
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
