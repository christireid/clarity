"use client";

import * as React from "react";
import { SettingsPanel } from "@/components/ai/settings-panel";
import { Queue, TodoList } from "@/components/ai/queue";
import { TokenCounter } from "@/components/ai/prompt-manager";
import { ConfirmDialog, DeleteConfirmDialog } from "@/components/ai/confirmation-dialog";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

export function ManagementComponents() {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Settings Panel"
        description="Comprehensive settings interface"
      >
        <div className="space-y-4">
          <Button onClick={() => setSettingsOpen(true)}>Open Settings</Button>
          <SettingsPanel
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Queue & Tasks"
        description="Manage pending operations"
      >
        <Queue
          items={[
            { id: "1", title: "Generate report", status: "running", progress: 45, createdAt: new Date() },
            { id: "2", title: "Process images", status: "pending", createdAt: new Date() },
            { id: "3", title: "Send notifications", status: "completed", createdAt: new Date(Date.now() - 60000), completedAt: new Date(), startedAt: new Date(Date.now() - 60000) },
          ]}
          onRemove={(id) => console.log("Remove:", id)}
          onRetry={(id) => console.log("Retry:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Todo List"
        description="Task management within chat"
      >
        <TodoList
          items={[
            { id: "1", text: "Review pull request", completed: true, priority: "high" },
            { id: "2", text: "Update documentation", completed: false, priority: "medium" },
            { id: "3", text: "Write unit tests", completed: false, priority: "low" },
          ]}
          onToggle={(id) => console.log("Toggle:", id)}
          onRemove={(id) => console.log("Remove:", id)}
          onAdd={(text) => console.log("Add:", text)}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Counter"
        description="Track token usage"
      >
        <div className="space-y-4">
          <TokenCounter text="This is a sample text to count tokens." maxTokens={4096} />
          <TokenCounter text={"A".repeat(3000)} maxTokens={4096} />
          <TokenCounter text={"A".repeat(3800)} maxTokens={4096} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Confirmation Dialogs"
        description="Confirm destructive actions"
      >
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setConfirmOpen(true)}>Open Confirm</Button>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            onConfirm={() => {
              console.log("Confirmed");
              setConfirmOpen(false);
            }}
          />
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete</Button>
          <DeleteConfirmDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            itemName="conversation"
            onConfirm={() => {
              console.log("Deleted");
              setDeleteOpen(false);
            }}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
