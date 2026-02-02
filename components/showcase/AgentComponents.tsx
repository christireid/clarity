"use client";

import * as React from "react";
import { AgentStatus, SubAgentCard, HumanInTheLoop, TaskOrchestrator } from "@/components/ai/agent";
import { ChainOfThought, ReasoningSummary } from "@/components/ai/chain-of-thought";
import { SubgraphSummary } from "@/components/ai/subgraphs";
import { PersonaSelector } from "@/components/ai/persona";
import { ApprovalQueue, InterventionButton, FeedbackCollector } from "@/components/ai/human-in-loop";
import { FallbackChain, ModelHealthBadge } from "@/components/ai/model-fallback";
import { ContextWindowManager } from "@/components/ai/context-management";
import { RetrievalResults, ChunkDisplay } from "@/components/ai/rag";
import {
  TaskStatusIcon,
  TaskItem,
  PlanDisplay,
  CompactTaskList,
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
            status="working"
            message="Analyzing documents..."
          />
          <AgentStatus
            name="Code Assistant"
            status="idle"
            message="Ready to help"
          />
          <AgentStatus
            name="Data Agent"
            status="completed"
            message="Task finished"
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
            description="Analyzed 1,234 records"
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
          options={[
            { label: "Approve", value: "approve", description: "Allow the update" },
            { label: "Approve with review", value: "review", description: "Run in dry-run mode first" },
          ]}
          onApprove={(value) => console.log("Approved:", value)}
          onReject={() => console.log("Rejected")}
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
          onPause={() => console.log("Pause")}
          onResume={() => console.log("Resume")}
          onCancel={() => console.log("Cancel")}
        />
      </ComponentCard>

      {/* Chain of Thought */}
      <ComponentCard
        title="Chain of Thought"
        description="Visualize AI reasoning process"
      >
        <ChainOfThought
          steps={[
            { id: "1", type: "analysis", title: "Understanding the problem", content: "Analyzing the user's request to identify key requirements", status: "complete" },
            { id: "2", type: "search", title: "Gathering information", content: "Searching for relevant data and context", status: "complete" },
            { id: "3", type: "reasoning", title: "Formulating approach", content: "Determining the best solution strategy", status: "thinking" },
            { id: "4", type: "conclusion", title: "Generating response", content: "Creating a comprehensive answer", status: "pending" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Reasoning Summary"
        description="Collapsed view of AI reasoning"
      >
        <ReasoningSummary
          reasoning="Analyzed 5 sources and identified 3 key patterns to solve the problem. The approach combines pattern matching with contextual understanding."
          conclusion="The recommended solution addresses all requirements while maintaining simplicity."
          confidence={0.92}
          sources={[
            { title: "Primary source", relevance: 0.95 },
            { title: "Supporting evidence", relevance: 0.85 },
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
            { id: "1", name: "Professional", description: "Formal and precise", avatar: "briefcase", type: "assistant", style: "professional" },
            { id: "2", name: "Friendly", description: "Casual and approachable", avatar: "smile", type: "assistant", style: "friendly" },
            { id: "3", name: "Technical", description: "Detailed explanations", avatar: "code", type: "assistant", style: "technical" },
            { id: "4", name: "Creative", description: "Imaginative and expressive", avatar: "palette", type: "assistant", style: "creative" },
          ]}
          selectedId="1"
          onSelect={(persona) => console.log("Selected:", persona.name)}
        />
      </ComponentCard>

      {/* Human-in-the-Loop */}
      <ComponentCard
        title="Approval Queue"
        description="Queue of pending approvals"
      >
        <ApprovalQueue
          requests={[
            { id: "1", type: "action", title: "Delete user records", description: "Remove 50 inactive accounts", status: "pending", createdAt: new Date() },
            { id: "2", type: "decision", title: "Send notification", description: "Notify 1000 users", status: "pending", createdAt: new Date(Date.now() - 3600000) },
            { id: "3", type: "tool_call", title: "Update config", description: "Change rate limits", status: "pending", createdAt: new Date(Date.now() - 7200000) },
          ]}
          onApprove={(id) => console.log("Approve:", id)}
          onReject={(id, reason) => console.log("Reject:", id, reason)}
        />
      </ComponentCard>

      <ComponentCard
        title="Intervention Button"
        description="Pause or intervene in agent execution"
      >
        <div className="flex gap-4">
          <InterventionButton onIntervene={() => console.log("Intervene")} />
          <InterventionButton onIntervene={() => console.log("Resume")} isPaused />
        </div>
      </ComponentCard>

      {/* Model Fallback */}
      <ComponentCard
        title="Model Health"
        description="Monitor model availability"
      >
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <ModelHealthBadge status="healthy" />
            <span className="text-sm">GPT-4</span>
          </div>
          <div className="flex items-center gap-2">
            <ModelHealthBadge status="degraded" />
            <span className="text-sm">Claude 3</span>
          </div>
          <div className="flex items-center gap-2">
            <ModelHealthBadge status="down" />
            <span className="text-sm">Gemini Pro</span>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Model Fallback Chain"
        description="Automatic model failover"
      >
        <FallbackChain
          models={[
            { id: "1", name: "GPT-4", provider: "openai", priority: 1, enabled: true, maxRetries: 3, timeout: 30000, healthStatus: "healthy" },
            { id: "2", name: "Claude 3", provider: "anthropic", priority: 2, enabled: true, maxRetries: 3, timeout: 30000, healthStatus: "healthy" },
            { id: "3", name: "Gemini Pro", provider: "google", priority: 3, enabled: true, maxRetries: 3, timeout: 30000, healthStatus: "down" },
          ]}
          currentAttempt={0}
        />
      </ComponentCard>

      {/* Context Management */}
      <ComponentCard
        title="Context Window Manager"
        description="Manage conversation context"
      >
        <ContextWindowManager
          window={{
            id: "window-1",
            name: "Main Context",
            sources: [
              { id: "1", type: "document", name: "API Documentation", tokens: 1200, content: "REST API endpoints...", enabled: true, priority: 1 },
              { id: "2", type: "conversation", name: "Previous Chat", tokens: 800, content: "Earlier discussion...", enabled: true, priority: 2 },
              { id: "3", type: "code", name: "config.json", tokens: 150, content: "Configuration file...", enabled: true, priority: 3 },
            ],
            totalTokens: 2150,
            maxTokens: 4096,
            strategy: "priority",
          }}
          onSourcesChange={(sources) => console.log("Sources changed:", sources)}
        />
      </ComponentCard>

      {/* RAG Retrieval */}
      <ComponentCard
        title="RAG Retrieval Results"
        description="Retrieved documents for context"
      >
        <RetrievalResults
          results={{
            chunks: [
              { id: "1", content: "Implementing secure authentication with JWT...", score: 0.95, metadata: { source: "docs/auth.md" } },
              { id: "2", content: "Always hash passwords using bcrypt...", score: 0.87, metadata: { source: "docs/security.md" } },
            ],
            query: "How to implement authentication?",
            totalResults: 2,
            searchTime: 150,
          }}
          onChunkSelect={(chunk) => console.log("Select:", chunk)}
        />
      </ComponentCard>

      <ComponentCard
        title="Chunk Display"
        description="Display a single document chunk"
      >
        <ChunkDisplay
          chunk={{
            id: "chunk-1",
            content: "To implement JWT authentication, first install the jsonwebtoken package...",
            metadata: { page: 1, section: "Getting Started" },
            score: 0.95,
            source: "docs/auth.md",
          }}
          showMetadata
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
        title="Task Items"
        description="Individual task display"
      >
        <div className="space-y-2">
          <TaskItem
            task={{ id: "1", title: "Research competitors", status: "completed" }}
            onStatusChange={(status) => console.log("Status:", status)}
          />
          <TaskItem
            task={{ id: "2", title: "Design mockups", status: "in-progress" }}
            onStatusChange={(status) => console.log("Status:", status)}
          />
          <TaskItem
            task={{ id: "3", title: "Write documentation", status: "pending" }}
            onStatusChange={(status) => console.log("Status:", status)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Compact Task List"
        description="Condensed task overview"
      >
        <CompactTaskList
          tasks={[
            { id: "1", title: "Setup project", status: "completed" },
            { id: "2", title: "Implement features", status: "in-progress" },
            { id: "3", title: "Write tests", status: "pending" },
            { id: "4", title: "Deploy", status: "pending" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Plan Display"
        description="Full plan with all tasks"
      >
        <PlanDisplay
          plan={{
            id: "plan-1",
            title: "Project Launch Plan",
            status: "executing",
            createdAt: new Date(),
            tasks: [
              { id: "1", title: "Finalize features", status: "completed" },
              { id: "2", title: "QA testing", status: "in-progress" },
              { id: "3", title: "Documentation", status: "pending" },
              { id: "4", title: "Marketing prep", status: "pending" },
              { id: "5", title: "Launch", status: "pending" },
            ],
          }}
          onTaskStatusChange={(taskId, status) => console.log("Task:", taskId, status)}
        />
      </ComponentCard>

      {/* Subgraph Visualization */}
      <ComponentCard
        title="Subgraph Summary"
        description="Overview of agent coordination"
      >
        <SubgraphSummary
          data={{
            id: "graph-1",
            name: "Research Pipeline",
            status: "running",
            progress: 65,
            agents: [
              { id: "1", name: "Coordinator", role: "coordinator", status: "running" },
              { id: "2", name: "Researcher", role: "worker", status: "running" },
              { id: "3", name: "Analyzer", role: "processor", status: "idle" },
            ],
            connections: [
              { from: "1", to: "2", label: "delegates" },
              { from: "2", to: "3", label: "sends" },
            ],
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Feedback Collector"
        description="Collect user feedback on agent outputs"
      >
        <FeedbackCollector
          messageId="msg-123"
          onFeedback={(messageId, feedback, comment) =>
            console.log("Feedback:", messageId, feedback, comment)
          }
          variant="card"
          showComment
        />
      </ComponentCard>
    </div>
  );
}
