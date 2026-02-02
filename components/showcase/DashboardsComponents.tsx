"use client";

import * as React from "react";
import { AgentTaskDashboard } from "@/components/ai/dashboards/agent-dashboard";
import { TokenOptimizationDashboard } from "@/components/ai/dashboards/token-dashboard";
import { PromptLibraryDashboard } from "@/components/ai/dashboards/prompt-dashboard";
import { ConversationHistoryDashboard } from "@/components/ai/dashboards/context-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Zap, FileText, History } from "lucide-react";

export function DashboardsComponents() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Full-Featured Dashboards</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete dashboard solutions for managing AI workflows, tokens, prompts, and conversation history.
          Each dashboard is fully interactive with filtering, sorting, and detailed views.
        </p>
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="agents">
            <Bot className="h-4 w-4 mr-2" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="tokens">
            <Zap className="h-4 w-4 mr-2" />
            Tokens
          </TabsTrigger>
          <TabsTrigger value="prompts">
            <FileText className="h-4 w-4 mr-2" />
            Prompts
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="rounded-xl border border-border bg-card p-6">
            <AgentTaskDashboard />
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <div className="rounded-xl border border-border bg-card p-6">
            <TokenOptimizationDashboard />
          </div>
        </TabsContent>

        <TabsContent value="prompts">
          <div className="rounded-xl border border-border bg-card p-6">
            <PromptLibraryDashboard />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="rounded-xl border border-border bg-card p-6">
            <ConversationHistoryDashboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
