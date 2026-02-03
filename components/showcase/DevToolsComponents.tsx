"use client";

import * as React from "react";
import { TestResults } from "@/components/ai/test-results";
import { CommitCard, PullRequestCard, BranchSelector } from "@/components/ai/git-components";
import { EnvVariablesManager } from "@/components/ai/env-variables";
import { ErrorPage, NotFoundPage, ServerErrorPage } from "@/components/ai/error-pages";
import { ErrorBoundary, ErrorFallback } from "@/components/ai/error-boundary";
import { DebugPanel, TraceViewer } from "@/components/ai/trace-viewer";
import { SnippetManager } from "@/components/ai/snippet-manager";
import { BrowserFrame, URLBar, DevToolsPanel } from "@/components/ai/web-browser";
import { PluginManager, PluginCard } from "@/components/ai/plugin-manager";
import { MCPManager } from "@/components/ai/mcp-manager";
import { BranchPicker, BranchTree, ForkButton, MessageBranchIndicator } from "@/components/ai/branch-picker";
import { SDKDevTools } from "@/components/ai/devtools/SDKDevTools";
import { ComponentCard } from "./ComponentCard";

export function DevToolsComponents() {
  const testData = {
    suites: [
      {
        id: "suite-1",
        name: "Authentication Tests",
        filePath: "src/auth.test.ts",
        status: "failed" as const,
        duration: 2340,
        tests: [
          { id: "t1", name: "should login with valid credentials", status: "passed" as const, duration: 120 },
          { id: "t2", name: "should reject invalid password", status: "passed" as const, duration: 85 },
          { id: "t3", name: "should handle session timeout", status: "failed" as const, duration: 450, error: { message: "Expected session to expire after 30 minutes", expected: "null", actual: "{ user: 'test' }" } },
        ],
      },
      {
        id: "suite-2",
        name: "API Integration",
        filePath: "src/api.test.ts",
        status: "passed" as const,
        duration: 1200,
        tests: [
          { id: "t4", name: "GET /users returns list", status: "passed" as const, duration: 200 },
          { id: "t5", name: "POST /users creates user", status: "passed" as const, duration: 180 },
        ],
      },
    ],
    summary: { total: 5, passed: 4, failed: 1, skipped: 0, duration: 3540 },
  };

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Test Results"
        description="Display test suite results with details"
      >
        <TestResults
          data={testData}
          onRunAll={() => console.log("Run all")}
          onRerunFailed={() => console.log("Rerun failed")}
        />
      </ComponentCard>

      <ComponentCard
        title="Commit Card"
        description="Display git commit details"
      >
        <CommitCard
          commit={{
            sha: "a1b2c3d4e5f6789012345678901234567890abcd",
            message: "feat: Add new AI chat components\n\nImplemented message bubbles, thinking indicators, and tool call displays.",
            author: { name: "John Doe", email: "john@example.com" },
            date: new Date("2024-01-01T10:00:00"),
            branch: "main",
            files: [
              { path: "src/components/Message.tsx", status: "added", additions: 120, deletions: 0 },
              { path: "src/components/ToolCall.tsx", status: "added", additions: 85, deletions: 0 },
              { path: "src/index.ts", status: "modified", additions: 5, deletions: 2 },
            ],
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Pull Request Card"
        description="Display pull request information"
      >
        <PullRequestCard
          pr={{
            number: 42,
            title: "Add new AI chat components",
            description: "This PR adds a comprehensive set of AI chat components including messages, tool calls, and thinking indicators.",
            author: { name: "Jane Smith" },
            sourceBranch: "feature/ai-components",
            targetBranch: "main",
            status: "open",
            createdAt: new Date("2024-01-01T09:00:00"),
            commits: 5,
            additions: 450,
            deletions: 23,
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Branch Selector"
        description="Select between git branches"
      >
        <BranchSelector
          branches={["main", "develop", "feature/ai-components", "bugfix/login-fix"]}
          currentBranch="main"
          onBranchChange={(branch) => console.log("Selected:", branch)}
        />
      </ComponentCard>

      <ComponentCard
        title="Environment Variables"
        description="Manage project environment variables"
      >
        <EnvVariablesManager
          variables={[
            { id: "1", key: "OPENAI_API_KEY", value: "sk-...abc123", scope: ["production", "preview"], encrypted: true },
            { id: "2", key: "DATABASE_URL", value: "postgresql://...", scope: ["all"] },
            { id: "3", key: "DEBUG_MODE", value: "true", scope: ["development"] },
          ]}
          onAdd={(v) => console.log("Add:", v)}
          onEdit={(id, v) => console.log("Edit:", id, v)}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </ComponentCard>

      {/* Error Pages */}
      <ComponentCard
        title="Error Pages"
        description="Styled error page templates"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4 h-[200px] flex items-center justify-center">
            <NotFoundPage onGoHome={() => console.log("Go home")} />
          </div>
          <div className="border rounded-lg p-4 h-[200px] flex items-center justify-center">
            <ServerErrorPage onRetry={() => console.log("Retry")} />
          </div>
        </div>
      </ComponentCard>

      {/* Error Boundary */}
      <ComponentCard
        title="Error Boundary"
        description="Graceful error handling"
      >
        <ErrorFallback
          error={{ message: "Something went wrong", name: "Error" }}
          onReset={() => console.log("Reset")}
        />
      </ComponentCard>

      {/* Debug Panel */}
      <ComponentCard
        title="Debug Panel"
        description="Development debugging tools"
      >
        <DebugPanel
          logs={[
            { level: "info", message: "Application started", timestamp: new Date(Date.now() - 5000) },
            { level: "debug", message: "Fetching user data...", timestamp: new Date(Date.now() - 4000) },
            { level: "warn", message: "Cache miss for key: user_123", timestamp: new Date(Date.now() - 3000) },
            { level: "error", message: "Failed to connect to database", timestamp: new Date(Date.now() - 2000) },
          ]}
          onClear={() => console.log("Clear logs")}
        />
      </ComponentCard>

      {/* Snippet Manager */}
      <ComponentCard
        title="Snippet Manager"
        description="Save and reuse code snippets"
      >
        <SnippetManager
          snippets={[
            { id: "1", title: "API Request", language: "typescript", code: "const res = await fetch('/api/data');", tags: ["api", "fetch"], createdAt: new Date(), updatedAt: new Date() },
            { id: "2", title: "React Component", language: "tsx", code: "export function Component() { return <div>Hello</div>; }", tags: ["react"], createdAt: new Date(), updatedAt: new Date() },
          ]}
          onSelect={(snippet) => console.log("Selected:", snippet)}
          onCreate={() => console.log("Create new")}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </ComponentCard>

      {/* Web Browser Preview */}
      <ComponentCard
        title="Web Browser Frame"
        description="In-app browser preview"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <BrowserFrame
            url="https://example.com"
            title="Example Website"
          />
        </div>
      </ComponentCard>

      {/* Plugin Manager */}
      <ComponentCard
        title="Plugin Manager"
        description="Manage installed plugins"
      >
        <PluginManager
          plugins={[
            { id: "1", name: "Code Formatter", description: "Auto-format code on save", enabled: true, version: "1.2.0", author: "Developer", category: "tools", installed: true, verified: true },
            { id: "2", name: "Git Integration", description: "Git commands in chat", enabled: true, version: "2.0.1", author: "Developer", category: "integrations", installed: true, verified: true },
            { id: "3", name: "Image Generator", description: "DALL-E integration", enabled: false, version: "0.9.0", author: "Developer", category: "media", installed: true, verified: false },
          ]}
          onToggle={(id) => console.log("Toggle:", id)}
          onConfigure={(id) => console.log("Configure:", id)}
          onUninstall={(id) => console.log("Uninstall:", id)}
        />
      </ComponentCard>

      {/* MCP Manager */}
      <ComponentCard
        title="MCP Server Manager"
        description="Manage Model Context Protocol servers"
      >
        <MCPManager
          servers={[
            { id: "1", name: "File System", url: "http://localhost:3001", status: "connected", enabled: true, tools: [{ name: "read_file" }, { name: "write_file" }, { name: "list_dir" }] },
            { id: "2", name: "Database", url: "http://localhost:3002", status: "connected", enabled: true, tools: [{ name: "query" }, { name: "insert" }, { name: "update" }] },
            { id: "3", name: "Browser", url: "http://localhost:3003", status: "disconnected", enabled: false, tools: [{ name: "navigate" }, { name: "screenshot" }, { name: "click" }] },
          ]}
          onConnect={(id) => console.log("Connect:", id)}
          onDisconnect={(id) => console.log("Disconnect:", id)}
          onConfigure={(id) => console.log("Configure:", id)}
        />
      </ComponentCard>

      {/* Branch Picker */}
      <ComponentCard
        title="Branch Picker"
        description="Navigate conversation branches"
      >
        <BranchPicker
          branches={[
            { id: "main", messageId: "msg-1", content: "Main conversation path", createdAt: new Date() },
            { id: "alt-1", messageId: "msg-5", content: "Alternative approach", createdAt: new Date(Date.now() - 3600000), parentId: "main" },
            { id: "alt-2", messageId: "msg-8", content: "Different solution", createdAt: new Date(Date.now() - 7200000), parentId: "main" },
          ]}
          currentBranchIndex={0}
          onBranchChange={(index: number) => console.log("Select branch:", index)}
          onCreateBranch={() => console.log("Create branch")}
        />
      </ComponentCard>

      <ComponentCard
        title="Fork Button"
        description="Create a new conversation branch"
      >
        <div className="flex items-center gap-4">
          <ForkButton onFork={() => console.log("Fork")} />
          <MessageBranchIndicator
            branchCount={3}
            currentBranch={1}
            onPrevious={() => console.log("Previous")}
            onNext={() => console.log("Next")}
          />
        </div>
      </ComponentCard>

      {/* SDK DevTools */}
      <ComponentCard
        title="SDK DevTools"
        description="Development tools for AI SDK integration"
      >
        <div className="h-[400px] border rounded-lg overflow-hidden">
          <SDKDevTools
            config={{
              systemPrompt: "You are a helpful assistant.",
              model: "gpt-4",
              temperature: 0.7,
              provider: "openai",
            }}
            onConfigChange={(config) => console.log("Config:", config)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
