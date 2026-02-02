"use client";

import * as React from "react";
import {
  ThreadItem,
  ThreadList,
  DeleteThreadDialog,
  ThreadHeader,
} from "@/components/ai/threads";
import { ComponentCard } from "./ComponentCard";

const sampleThreads = [
  {
    id: "1",
    title: "React Performance Optimization",
    preview: "How can I improve the rendering performance of my React app?",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    messageCount: 12,
    model: "Claude 3",
    pinned: true,
  },
  {
    id: "2",
    title: "TypeScript Generic Constraints",
    preview: "Understanding advanced TypeScript patterns...",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 8,
    model: "Claude 3",
    starred: true,
  },
  {
    id: "3",
    title: "API Design Best Practices",
    preview: "What are the best practices for REST API design?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 15,
    model: "GPT-4",
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox",
    preview: "When should I use Grid instead of Flexbox?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    messageCount: 6,
    model: "Claude 3",
  },
  {
    id: "5",
    title: "Database Schema Design",
    preview: "Help me design a schema for an e-commerce app...",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    messageCount: 20,
    model: "GPT-4",
  },
];

export function ThreadComponents() {
  const [activeThread, setActiveThread] = React.useState("1");
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Thread Item"
        description="Individual thread in a list"
      >
        <div className="space-y-2 max-w-md">
          <ThreadItem
            thread={sampleThreads[0]}
            isActive
            onClick={() => {}}
            onRename={(id, title) => console.log("Rename:", id, title)}
            onDelete={(id) => console.log("Delete:", id)}
            onPin={(id) => console.log("Pin:", id)}
            onStar={(id) => console.log("Star:", id)}
          />
          <ThreadItem
            thread={sampleThreads[1]}
            onClick={() => {}}
            onRename={(id, title) => console.log("Rename:", id, title)}
            onDelete={(id) => console.log("Delete:", id)}
            onStar={(id) => console.log("Star:", id)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Thread List"
        description="Searchable, filterable thread sidebar"
      >
        <div className="h-[400px] w-full max-w-sm border rounded-lg overflow-hidden">
          <ThreadList
            threads={sampleThreads}
            activeThreadId={activeThread}
            onThreadSelect={setActiveThread}
            onNewThread={() => console.log("New thread")}
            onRename={(id, title) => console.log("Rename:", id, title)}
            onDelete={(id) => console.log("Delete:", id)}
            onPin={(id) => console.log("Pin:", id)}
            onStar={(id) => console.log("Star:", id)}
            onArchive={(id) => console.log("Archive:", id)}
            showSearch
            showFilters
            groupByDate
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Thread Header"
        description="Header for active thread display"
      >
        <ThreadHeader
          thread={sampleThreads[0]}
          onRename={(title) => console.log("Rename to:", title)}
          onSettings={() => console.log("Settings")}
        />
      </ComponentCard>

      <ComponentCard
        title="Delete Thread Dialog"
        description="Confirmation dialog for thread deletion"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDeleteDialogOpen(true)}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm"
          >
            Open Delete Dialog
          </button>
          <DeleteThreadDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            threadTitle="React Performance Optimization"
            onConfirm={() => {
              console.log("Deleted");
              setDeleteDialogOpen(false);
            }}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
