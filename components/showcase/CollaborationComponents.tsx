"use client";

import * as React from "react";
import { LiveCursor, CollaboratorAvatars, PresenceIndicator, CommentThread, CommentsPanel, VersionHistory, ShareDialog as CollaborationShareDialog } from "@/components/ai/collaboration";
import {
  ParticipantAvatar,
  ParticipantsStack,
  ParticipantsList,
  MultiTypingIndicator,
  PresenceIndicator as ParticipantPresence,
  InviteParticipants,
} from "@/components/ai/participants";
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
            { id: "v1", author: "Alice", message: "Initial draft", timestamp: new Date("2024-01-01T08:00:00") },
            { id: "v2", author: "Bob", message: "Refined prompt", timestamp: new Date("2024-01-01T09:00:00") },
            { id: "v3", author: "Alice", message: "Final polish", timestamp: new Date("2024-01-01T10:00:00") }
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

      {/* Participant Components */}
      <ComponentCard
        title="Participant Avatar"
        description="Avatar with status indicator"
      >
        <div className="flex items-center gap-4">
          <ParticipantAvatar
            participant={{ id: "1", name: "Alice", status: "online" }}
            size="lg"
          />
          <ParticipantAvatar
            participant={{ id: "2", name: "Bob", status: "away" }}
            size="md"
          />
          <ParticipantAvatar
            participant={{ id: "3", name: "Charlie", status: "busy" }}
            size="sm"
          />
          <ParticipantAvatar
            participant={{ id: "4", name: "Diana", status: "offline" }}
            size="md"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Participants Stack"
        description="Overlapping avatar group"
      >
        <ParticipantsStack
          participants={[
            { id: "1", name: "Alice", status: "online" },
            { id: "2", name: "Bob", status: "online" },
            { id: "3", name: "Charlie", status: "away" },
            { id: "4", name: "Diana", status: "online" },
            { id: "5", name: "Eve", status: "offline" },
            { id: "6", name: "Frank", status: "online" },
          ]}
          max={4}
          onShowAll={() => console.log("Show all")}
        />
      </ComponentCard>

      <ComponentCard
        title="Participants List"
        description="Full list with roles and actions"
      >
        <div className="max-w-sm">
          <ParticipantsList
            participants={[
              { id: "1", name: "Alice Smith", role: "owner", status: "online", email: "alice@example.com" },
              { id: "2", name: "Bob Jones", role: "admin", status: "online" },
              { id: "3", name: "Charlie Brown", role: "member", status: "away", isTyping: true },
              { id: "4", name: "Diana Prince", role: "viewer", status: "offline" },
            ]}
            currentUserId="1"
            onInvite={() => console.log("Invite")}
            onRemove={(p) => console.log("Remove:", p.name)}
            onMessage={(p) => console.log("Message:", p.name)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Multi Typing Indicator"
        description="Show who is typing"
      >
        <div className="space-y-4">
          <MultiTypingIndicator
            participants={[{ id: "1", name: "Alice", status: "online" }]}
          />
          <MultiTypingIndicator
            participants={[
              { id: "1", name: "Alice", status: "online" },
              { id: "2", name: "Bob", status: "online" },
            ]}
          />
          <MultiTypingIndicator
            participants={[
              { id: "1", name: "Alice", status: "online" },
              { id: "2", name: "Bob", status: "online" },
              { id: "3", name: "Charlie", status: "online" },
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Presence Counter"
        description="Online user count"
      >
        <ParticipantPresence online={8} total={12} />
      </ComponentCard>

      <ComponentCard
        title="Invite Participants"
        description="Email invitation form"
      >
        <div className="max-w-sm">
          <InviteParticipants
            onInvite={(emails) => console.log("Inviting:", emails)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
