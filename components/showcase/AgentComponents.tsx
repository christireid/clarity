"use client";

import * as React from "react";
import { AgentStatus, SubAgentCard, HumanInTheLoop, TaskOrchestrator } from "@/components/ai/agent";
import { ChainOfThought, ReasoningStep, ThinkingProcess } from "@/components/ai/chain-of-thought";
import { Subgraphs, SubgraphNode, SubgraphConnection } from "@/components/ai/subgraphs";
import { Persona, PersonaSelector, PersonaCard } from "@/components/ai/persona";
import { HumanInLoopCard, ApprovalQueue, ApprovalRequest as ApprovalReq } from "@/components/ai/human-in-loop";
import { ModelFallback, FallbackChain, ModelStatus } from "@/components/ai/model-fallback";
import { ContextManager, ContextWindow, ContextItem } from "@/components/ai/context-management";
import { RAGPanel, DocumentList, RetrievalResults } from "@/components/ai/rag";
import { InlineConfirmation, ConfirmationDialog } from "@/components/ai/confirmation";
import {
  TaskStatusIcon,
  TaskItem,
  PlanDisplay,
  CompactTaskList,
  InlinePlan,
  TaskInput,
} from "@/components/ai/plan";
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

      {/* Chain of Thought */}
      <ComponentCard
        title="Chain of Thought"
        description="Visualize AI reasoning process"
      >
        <ChainOfThought
          steps={[
            { id: "1", title: "Understanding the problem", content: "Analyzing the user's request to identify key requirements", status: "complete" },
            { id: "2", title: "Gathering information", content: "Searching for relevant data and context", status: "complete" },
            { id: "3", title: "Formulating approach", content: "Determining the best solution strategy", status: "active" },
            { id: "4", title: "Generating response", content: "Creating a comprehensive answer", status: "pending" },
          ]}
        />
      </ComponentCard>

      {/* Persona System */}
      <ComponentCard
        title="Persona Selector"
        description="Choose AI personality"
      >
        <PersonaSelector
          personas={[
            { id: "1", name: "Professional", description: "Formal and precise communication", avatar: "👔", tone: "formal" },
            { id: "2", name: "Friendly", description: "Casual and approachable style", avatar: "😊", tone: "casual" },
            { id: "3", name: "Technical", description: "Detailed and technical explanations", avatar: "🔧", tone: "technical" },
            { id: "4", name: "Creative", description: "Imaginative and expressive", avatar: "🎨", tone: "creative" },
          ]}
          selectedId="1"
          onSelect={(id) => console.log("Selected persona:", id)}
        />
      </ComponentCard>

      {/* Human-in-the-Loop */}
      <ComponentCard
        title="Approval Queue"
        description="Queue of pending approvals"
      >
        <ApprovalQueue
          requests={[
            { id: "1", title: "Delete user records", description: "Remove 50 inactive accounts", risk: "high", createdAt: new Date() },
            { id: "2", title: "Send notification", description: "Notify 1000 users about update", risk: "medium", createdAt: new Date(Date.now() - 3600000) },
            { id: "3", title: "Update config", description: "Change rate limit settings", risk: "low", createdAt: new Date(Date.now() - 7200000) },
          ]}
          onApprove={(id) => console.log("Approve:", id)}
          onReject={(id) => console.log("Reject:", id)}
          onViewDetails={(id) => console.log("View:", id)}
        />
      </ComponentCard>

      {/* Model Fallback */}
      <ComponentCard
        title="Model Fallback Chain"
        description="Automatic model failover"
      >
        <FallbackChain
          models={[
            { id: "1", name: "GPT-4", status: "primary", latency: 450, available: true },
            { id: "2", name: "Claude 3", status: "fallback", latency: 380, available: true },
            { id: "3", name: "Gemini Pro", status: "fallback", latency: 320, available: false },
          ]}
          currentModel="1"
          onModelSelect={(id) => console.log("Select model:", id)}
        />
      </ComponentCard>

      {/* Context Management */}
      <ComponentCard
        title="Context Window"
        description="Manage conversation context"
      >
        <ContextWindow
          items={[
            { id: "1", type: "system", content: "You are a helpful assistant", tokens: 15 },
            { id: "2", type: "user", content: "What is React?", tokens: 5 },
            { id: "3", type: "assistant", content: "React is a JavaScript library for building user interfaces...", tokens: 120 },
            { id: "4", type: "user", content: "How do hooks work?", tokens: 6 },
          ]}
          maxTokens={4096}
          usedTokens={146}
          onRemove={(id) => console.log("Remove:", id)}
          onClear={() => console.log("Clear context")}
        />
      </ComponentCard>

      {/* RAG Panel */}
      <ComponentCard
        title="RAG Retrieval"
        description="Retrieved documents for context"
      >
        <RAGPanel
          query="How to implement authentication?"
          results={[
            { id: "1", title: "Auth Guide", content: "Implementing secure authentication with JWT...", score: 0.95, source: "docs/auth.md" },
            { id: "2", title: "Security Best Practices", content: "Always hash passwords using bcrypt...", score: 0.87, source: "docs/security.md" },
            { id: "3", title: "Session Management", content: "Managing user sessions effectively...", score: 0.82, source: "docs/sessions.md" },
          ]}
          onSourceClick={(id) => console.log("View source:", id)}
        />
      </ComponentCard>

      {/* Confirmation Dialog */}
      <ComponentCard
        title="Inline Confirmation"
        description="Confirm destructive actions inline"
      >
        <InlineConfirmation
          message="Are you sure you want to delete this?"
          confirmLabel="Delete"
          onConfirm={() => console.log("Confirmed")}
          onCancel={() => console.log("Cancelled")}
        />
      </ComponentCard>

      {/* Plan Components */}
      <ComponentCard
        title="Task Status Icons"
        description="Visual status indicators"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TaskStatusIcon status="pending" />
            <span className="text-sm">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <TaskStatusIcon status="in-progress" />
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <TaskStatusIcon status="in-progress" progress={60} />
            <span className="text-sm">60%</span>
          </div>
          <div className="flex items-center gap-2">
            <TaskStatusIcon status="completed" />
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <TaskStatusIcon status="failed" />
            <span className="text-sm">Failed</span>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Plan Display"
        description="Full plan with tasks and progress"
      >
        <PlanDisplay
          plan={{
            id: "plan-1",
            title: "Implement User Authentication",
            description: "Add secure login and registration flow",
            status: "executing",
            createdAt: new Date(),
            tasks: [
              { id: "1", title: "Create user schema", status: "completed", duration: "2m" },
              { id: "2", title: "Implement registration endpoint", status: "completed", duration: "5m" },
              { id: "3", title: "Add password hashing", status: "in-progress", progress: 60 },
              { id: "4", title: "Create login endpoint", status: "pending" },
              { id: "5", title: "Add JWT tokens", status: "pending" },
              { id: "6", title: "Write tests", status: "pending" },
            ],
          }}
          editable
          onTaskStatusChange={(id, status) => console.log("Status:", id, status)}
          onAddTask={() => console.log("Add task")}
          onPause={() => console.log("Pause")}
        />
      </ComponentCard>

      <ComponentCard
        title="Compact Task List"
        description="Minimal task display"
      >
        <div className="max-w-sm">
          <CompactTaskList
            tasks={[
              { id: "1", title: "Research competitors", status: "completed" },
              { id: "2", title: "Draft proposal", status: "in-progress" },
              { id: "3", title: "Review with team", status: "pending" },
              { id: "4", title: "Submit final version", status: "pending" },
            ]}
            onTaskClick={(task) => console.log("Clicked:", task)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Inline Plan"
        description="Collapsible plan in messages"
      >
        <div className="max-w-md space-y-2">
          <InlinePlan
            plan={{
              id: "plan-1",
              title: "Code Review Tasks",
              status: "executing",
              createdAt: new Date(),
              tasks: [
                { id: "1", title: "Check code style", status: "completed" },
                { id: "2", title: "Review logic", status: "in-progress" },
                { id: "3", title: "Test edge cases", status: "pending" },
              ],
            }}
            expanded
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Task Input"
        description="Add new tasks inline"
      >
        <div className="max-w-sm border rounded-lg p-4">
          <TaskInput
            onAdd={(title) => console.log("Added:", title)}
            placeholder="Add a new task..."
          />
        </div>
      </ComponentCard>
    </div>
  );
}
