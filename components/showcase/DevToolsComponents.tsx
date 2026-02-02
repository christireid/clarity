"use client";

import * as React from "react";
import { TestResults } from "@/components/ai/test-results";
import { CommitCard, PullRequestCard, BranchSelector } from "@/components/ai/git-components";
import { EnvVariablesManager } from "@/components/ai/env-variables";
import { ErrorPage, NotFoundPage, ServerErrorPage } from "@/components/ai/error-pages";
import { ErrorBoundary, ErrorFallback } from "@/components/ai/error-boundary";
import { DebugPanel, DebugLog, DebugInspector } from "@/components/ai/trace-viewer";
import { SnippetManager, SnippetCard, SnippetEditor } from "@/components/ai/snippet-manager";
import { WebBrowser, BrowserToolbar } from "@/components/ai/web-browser";
import { PluginManager, PluginCard } from "@/components/ai/plugin-manager";
import { MCPManager, MCPServerCard } from "@/components/ai/mcp-manager";
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
            <NotFoundPage compact onGoHome={() => console.log("Go home")} />
          </div>
          <div className="border rounded-lg p-4 h-[200px] flex items-center justify-center">
            <ServerErrorPage compact onRetry={() => console.log("Retry")} />
          </div>
        </div>
      </ComponentCard>

      {/* Error Boundary */}
      <ComponentCard
        title="Error Boundary"
        description="Graceful error handling"
      >
        <ErrorFallback
          error={new Error("Something went wrong")}
          resetErrorBoundary={() => console.log("Reset")}
        />
      </ComponentCard>

      {/* Debug Panel */}
      <ComponentCard
        title="Debug Panel"
        description="Development debugging tools"
      >
        <DebugPanel
          logs={[
            { id: "1", level: "info", message: "Application started", timestamp: new Date(Date.now() - 5000) },
            { id: "2", level: "debug", message: "Fetching user data...", timestamp: new Date(Date.now() - 4000) },
            { id: "3", level: "warn", message: "Cache miss for key: user_123", timestamp: new Date(Date.now() - 3000) },
            { id: "4", level: "error", message: "Failed to connect to database", timestamp: new Date(Date.now() - 2000) },
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
            { id: "1", title: "API Request", language: "typescript", code: "const res = await fetch('/api/data');" },
            { id: "2", title: "React Component", language: "tsx", code: "export function Component() { return <div>Hello</div>; }" },
          ]}
          onSelect={(snippet) => console.log("Selected:", snippet)}
          onCreate={() => console.log("Create new")}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </ComponentCard>

      {/* Web Browser Preview */}
      <ComponentCard
        title="Web Browser"
        description="In-app browser preview"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <WebBrowser
            url="https://example.com"
            onNavigate={(url) => console.log("Navigate:", url)}
            onRefresh={() => console.log("Refresh")}
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
            { id: "1", name: "Code Formatter", description: "Auto-format code on save", enabled: true, version: "1.2.0" },
            { id: "2", name: "Git Integration", description: "Git commands in chat", enabled: true, version: "2.0.1" },
            { id: "3", name: "Image Generator", description: "DALL-E integration", enabled: false, version: "0.9.0" },
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
            { id: "1", name: "File System", status: "connected", tools: ["read_file", "write_file", "list_dir"] },
            { id: "2", name: "Database", status: "connected", tools: ["query", "insert", "update"] },
            { id: "3", name: "Browser", status: "disconnected", tools: ["navigate", "screenshot", "click"] },
          ]}
          onConnect={(id) => console.log("Connect:", id)}
          onDisconnect={(id) => console.log("Disconnect:", id)}
          onConfigure={(id) => console.log("Configure:", id)}
        />
      </ComponentCard>
    </div>
  );
}
