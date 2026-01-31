"use client";

import * as React from "react";
import { DataTable, type Column } from "@/components/ai/data-table";
import { StatCard, BarChartCard, LineChartCard, TokenUsage, RadialProgress, BenchmarkChart } from "@/components/ai/charts";
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
    </div>
  );
}
