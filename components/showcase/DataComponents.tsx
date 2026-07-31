"use client";

import * as React from "react";
import { DataTable, type Column } from "@/components/ai/data-table";
import { StatCard, BarChartCard, LineChartCard, TokenUsage, RadialProgress, BenchmarkChart, PieChartCard, AreaChartCard } from "@/components/ai/charts";
import { FilterBar, FilterChip, FilterPanel, SearchWithFilters, QuickFilterTabs } from "@/components/ai/filters";
import { SchemaDisplay, JSONSchemaViewer, DatabaseSchema } from "@/components/ai/schema-display";
import { SortableList, SortableItem } from "@/components/ai/sortable-list";
import { StatCard as StatCardDisplay, StatsGrid, BenchmarkDisplay } from "@/components/ai/stats-display";
import { TableOfContents, FloatingTOC, ProgressTOC } from "@/components/ai/table-of-contents";
import { ComponentCard } from "./ComponentCard";

export function DataComponents() {
  const columns: Column<{ id: number; name: string; status: string; tokens: number }>[] = [
    { id: "id", header: "ID", accessorKey: "id", sortable: true },
    { id: "name", header: "Name", accessorKey: "name", sortable: true },
    { id: "status", header: "Status", accessorKey: "status" },
    { id: "tokens", header: "Tokens", accessorKey: "tokens", sortable: true, align: "right" },
  ];

  const tableData = [
    { id: 1, name: "Conversation 1", status: "Active", tokens: 1234 },
    { id: 2, name: "Conversation 2", status: "Completed", tokens: 2456 },
    { id: 3, name: "Conversation 3", status: "Active", tokens: 892 },
    { id: 4, name: "Conversation 4", status: "Paused", tokens: 3210 },
    { id: 5, name: "Conversation 5", status: "Active", tokens: 567 },
  ];

  const chartData = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1900 },
    { name: "Mar", value: 1500 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 1800 },
    { name: "Jun", value: 2400 },
  ];

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Data Table"
        description="Interactive data table with sorting, search, and pagination"
      >
        <DataTable 
          columns={columns} 
          data={tableData}
          selectable
          pagination
          pageSize={3}
        />
      </ComponentCard>

      <ComponentCard
        title="Stat Cards"
        description="Display key metrics with trends"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Conversations"
            value="1,234"
            trend={{ value: 12, direction: "up" }}
            description="from last month"
          />
          <StatCard
            title="Tokens Used"
            value="45.2K"
            trend={{ value: 5, direction: "down" }}
            description="from last month"
          />
          <StatCard
            title="Avg Response Time"
            value="1.2s"
            trend={{ value: 0, direction: "neutral" }}
            description="no change"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Bar Chart"
        description="Visualize data with bar charts"
        stretch
      >
        <BarChartCard
          title="Monthly Usage"
          description="Token usage over time"
          data={chartData}
          height={250}
        />
      </ComponentCard>

      <ComponentCard
        title="Line Chart"
        description="Track trends with line charts"
        stretch
      >
        <LineChartCard
          title="Response Times"
          description="Average response time per day"
          data={chartData}
          height={250}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Usage"
        description="Track token consumption"
      >
        <div className="max-w-sm">
          <TokenUsage
            used={3200}
            limit={4096}
            breakdown={{ prompt: 1200, completion: 2000 }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Radial Progress"
        description="Circular progress indicators"
      >
        <div className="flex items-center gap-8">
          <RadialProgress value={75} label="Tasks" />
          <RadialProgress value={45} label="Usage" color="hsl(var(--chart-2))" />
          <RadialProgress value={90} label="Quality" color="hsl(var(--chart-3))" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Benchmark Chart"
        description="Compare model performance"
      >
        <BenchmarkChart
          title="Model Comparison"
          description="Benchmark scores across different models"
          data={[
            { name: "GPT-4", score: 92, baseline: 85 },
            { name: "Claude 3", score: 89, baseline: 85 },
            { name: "Gemini Pro", score: 86, baseline: 85 },
            { name: "Llama 3", score: 82, baseline: 85 },
          ]}
        />
      </ComponentCard>

      {/* Filter Bar */}
      <ComponentCard
        title="Filter Bar"
        description="Active filter display"
      >
        <FilterBar
          filters={[
            { groupId: "status", value: "Active" },
            { groupId: "model", value: "GPT-4" },
          ]}
          groups={[
            { id: "status", label: "Status", type: "checkbox", options: [{ id: "active", value: "Active", label: "Active" }, { id: "completed", value: "Completed", label: "Completed" }] },
            { id: "model", label: "Model", type: "checkbox", options: [{ id: "gpt4", value: "GPT-4", label: "GPT-4" }, { id: "claude", value: "Claude", label: "Claude" }] },
          ]}
          onRemove={(groupId) => console.log("Remove:", groupId)}
          onClearAll={() => console.log("Clear all")}
        />
      </ComponentCard>

      {/* Filter Chips */}
      <ComponentCard
        title="Filter Chips"
        description="Active filter tags"
      >
        <div className="flex flex-wrap gap-2">
          <FilterChip label="Status: Active" onRemove={() => {}} />
          <FilterChip label="Model: GPT-4" onRemove={() => {}} />
          <FilterChip label="Date: Last 7 days" onRemove={() => {}} />
        </div>
      </ComponentCard>

      {/* Schema Display */}
      <ComponentCard
        title="Schema Display"
        description="Visualize data schemas"
      >
        <SchemaDisplay
          schema={{
            type: "object",
            properties: {
              id: { type: "string", description: "Unique identifier" },
              name: { type: "string", description: "User name" },
              email: { type: "string", format: "email" },
              roles: { type: "array", items: { type: "string" } },
            },
            required: ["id", "name", "email"],
          }}
        />
      </ComponentCard>

      {/* JSON Schema Viewer */}
      <ComponentCard
        title="JSON Schema Viewer"
        description="Interactive JSON schema display"
      >
        <JSONSchemaViewer
          schema={{
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  settings: {
                    type: "object",
                    properties: {
                      theme: { type: "string", enum: ["light", "dark"] },
                      notifications: { type: "boolean" },
                    },
                  },
                },
              },
              messages: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    content: { type: "string" },
                  },
                },
              },
            },
          }}
        />
      </ComponentCard>

      {/* Sortable List */}
      <ComponentCard
        title="Sortable List"
        description="Drag and drop reordering"
      >
        <SortableList
          items={[
            { id: "1", content: "First item" },
            { id: "2", content: "Second item" },
            { id: "3", content: "Third item" },
            { id: "4", content: "Fourth item" },
          ]}
          onReorder={(items) => console.log("Reordered:", items)}
        />
      </ComponentCard>

      {/* Stats Grid */}
      <ComponentCard
        title="Stats Grid"
        description="Display multiple stats"
      >
        <StatsGrid
          stats={[
            { title: "Total Users", value: "12,345", change: { value: 5.2, type: "increase" } },
            { title: "Active Sessions", value: "1,234", change: { value: 12, type: "increase" } },
            { title: "API Calls", value: "89,012", change: { value: 2.1, type: "decrease" } },
            { title: "Error Rate", value: "0.12%", change: { value: 8, type: "decrease" } },
          ]}
          columns={4}
        />
      </ComponentCard>

      {/* Table of Contents */}
      <ComponentCard
        title="Table of Contents"
        description="Document navigation"
      >
        <TableOfContents
          items={[
            { id: "intro", title: "Introduction", level: 1 },
            { id: "setup", title: "Getting Started", level: 1 },
            { id: "install", title: "Installation", level: 2 },
            { id: "config", title: "Configuration", level: 2 },
            { id: "usage", title: "Usage", level: 1 },
            { id: "api", title: "API Reference", level: 1 },
          ]}
          activeId="setup"
          onItemClick={(id) => console.log("Navigate to:", id)}
        />
      </ComponentCard>
    </div>
  );
}
