"use client";

import * as React from "react";
import { AgentTaskDashboard } from "@/components/ai/dashboards/agent-dashboard";
import { TokenOptimizationDashboard } from "@/components/ai/dashboards/token-dashboard";
import { PromptLibraryDashboard } from "@/components/ai/dashboards/prompt-dashboard";
import { ConversationHistoryDashboard } from "@/components/ai/dashboards/context-dashboard";
import { DashboardContainer, DashboardWidgetCard, QuickStatCard, AIDashboardStats, DashboardLayoutSelector } from "@/components/ai/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentCard } from "./ComponentCard";
import { Bot, Zap, FileText, History, MessageSquare, Users, Activity } from "lucide-react";

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

      {/* Dashboard Building Blocks */}
      <div className="pt-8 border-t">
        <h3 className="text-xl font-bold mb-6">Dashboard Building Blocks</h3>

        <div className="space-y-8">
          <ComponentCard
            title="Quick Stat Cards"
            description="Compact stat displays for key metrics"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickStatCard
                title="Total Messages"
                value="12,847"
                change={12}
                changeLabel="vs last week"
                icon={<MessageSquare className="h-4 w-4" />}
              />
              <QuickStatCard
                title="Active Users"
                value="1,234"
                change={8}
                changeLabel="vs last week"
                icon={<Users className="h-4 w-4" />}
              />
              <QuickStatCard
                title="Token Usage"
                value="2.4M"
                change={-5}
                changeLabel="vs last week"
                icon={<Zap className="h-4 w-4" />}
              />
              <QuickStatCard
                title="Response Time"
                value="1.2s"
                change={0}
                changeLabel="no change"
                icon={<Activity className="h-4 w-4" />}
              />
            </div>
          </ComponentCard>

          <ComponentCard
            title="AI Dashboard Stats"
            description="Pre-built AI metrics overview"
          >
            <AIDashboardStats />
          </ComponentCard>

          <ComponentCard
            title="Dashboard Widget Card"
            description="Customizable dashboard widget container"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DashboardWidgetCard
                widget={{
                  id: "activity",
                  title: "Recent Activity",
                  type: "activity",
                  size: "md",
                  render: () => (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>Activity item {i}</span>
                        </div>
                      ))}
                    </div>
                  ),
                }}
              />
              <DashboardWidgetCard
                widget={{
                  id: "actions",
                  title: "Quick Actions",
                  type: "custom",
                  size: "md",
                  render: () => (
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md">
                        New Chat
                      </button>
                      <button className="px-3 py-1.5 text-sm bg-muted rounded-md">
                        View Reports
                      </button>
                    </div>
                  ),
                }}
              />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Dashboard Layout Selector"
            description="Switch between different dashboard layouts"
          >
            <DashboardLayoutSelector
              layouts={[
                { id: "grid", name: "Grid View", columns: 3, widgets: [] },
                { id: "list", name: "List View", columns: 1, widgets: [] },
                { id: "compact", name: "Compact", columns: 4, widgets: [] },
              ]}
              currentLayout="grid"
              onLayoutChange={(layoutId) => console.log("Layout:", layoutId)}
            />
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
