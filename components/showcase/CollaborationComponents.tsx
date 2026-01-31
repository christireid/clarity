"use client";

import * as React from "react";
import { LiveCursor, CollaboratorAvatars, PresenceIndicator, CommentThread, CommentsPanel, VersionHistory, ShareDialog as CollaborationShareDialog } from "@/components/ai/collaboration";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

export function CollaborationComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Live Cursor"
        description="Real-time user pointers"
      >
        <div className="relative h-40 bg-muted/20 rounded-md border border-dashed border-border overflow-hidden">
          <LiveCursor x={100} y={50} color="#ff5733" label="Alice" />
          <LiveCursor x={250} y={120} color="#33ff57" label="Bob" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Collaborator Avatars"
        description="Active users on the page"
      >
        <CollaboratorAvatars 
          users={[
            { id: "1", name: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
            { id: "2", name: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
            { id: "3", name: "Charlie", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Presence Indicator"
        description="User online status"
      >
        <div className="flex gap-4">
          <PresenceIndicator status="online" label="Online" />
          <PresenceIndicator status="idle" label="Idle" />
          <PresenceIndicator status="offline" label="Offline" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Comments"
        description="Contextual discussions"
      >
        <CommentThread 
          comments={[
            { id: "1", author: "Alice", content: "Should we update this prompt?", timestamp: new Date("2024-01-01T09:00:00") },
            { id: "2", author: "Bob", content: "Yes, let's make it more specific.", timestamp: new Date("2024-01-01T10:00:00") }
          ]}
          onReply={(text) => console.log("Reply:", text)}
        />
      </ComponentCard>

      <ComponentCard
        title="Version History"
        description="Track changes over time"
      >
        <VersionHistory 
          versions={[
            { id: "v1", author: "Alice", message: "Initial draft", timestamp: new Date(Date.now() - 86400000) },
            { id: "v2", author: "Bob", message: "Refined prompt", timestamp: new Date(Date.now() - 43200000) },
            { id: "v3", author: "Alice", message: "Final polish", timestamp: new Date() }
          ]}
          onSelect={(id) => console.log("Selected version:", id)}
          onRevert={(id) => console.log("Revert to:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Share Dialog"
        description="Invite collaborators"
      >
        <CollaborationShareDialog 
          onInvite={(email, role) => console.log("Invite:", email, role)}
          trigger={<Button variant="outline">Share</Button>}
        />
      </ComponentCard>
    </div>
  );
}
