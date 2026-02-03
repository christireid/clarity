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

const sampleCollaborators = [
  { id: "1", name: "Alice", email: "alice@example.com", color: "#ff5733", status: "online" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
  { id: "2", name: "Bob", email: "bob@example.com", color: "#33ff57", status: "online" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
  { id: "3", name: "Charlie", email: "charlie@example.com", color: "#3357ff", status: "away" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
];

export function CollaborationComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Live Cursor"
        description="Real-time user pointers"
      >
        <div className="relative h-40 bg-muted/20 rounded-md border border-dashed border-border overflow-hidden">
          <LiveCursor
            collaborator={{
              id: "1",
              name: "Alice",
              color: "#ff5733",
              status: "online",
              cursorPosition: { x: 100, y: 50 },
            }}
          />
          <LiveCursor
            collaborator={{
              id: "2",
              name: "Bob",
              color: "#33ff57",
              status: "online",
              cursorPosition: { x: 250, y: 120 },
            }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Collaborator Avatars"
        description="Active users on the page"
      >
        <CollaboratorAvatars collaborators={sampleCollaborators} />
      </ComponentCard>

      <ComponentCard
        title="Presence Indicator"
        description="User online status"
      >
        <PresenceIndicator
          collaborators={sampleCollaborators}
          currentUserId="1"
        />
      </ComponentCard>

      <ComponentCard
        title="Comment Thread"
        description="Contextual discussions"
      >
        <CommentThread
          comment={{
            id: "1",
            content: "Should we update this prompt?",
            author: sampleCollaborators[0],
            createdAt: new Date("2024-01-01T09:00:00"),
            replies: [
              {
                id: "2",
                content: "Yes, let's make it more specific.",
                author: sampleCollaborators[1],
                createdAt: new Date("2024-01-01T10:00:00"),
              },
            ],
          }}
          onReply={(text) => console.log("Reply:", text)}
        />
      </ComponentCard>

      <ComponentCard
        title="Comments Panel"
        description="Full comments list with actions"
      >
        <CommentsPanel
          comments={[
            {
              id: "1",
              content: "Great progress on this feature!",
              author: sampleCollaborators[0],
              createdAt: new Date("2024-01-01T09:00:00"),
            },
            {
              id: "2",
              content: "We might need to revisit the API design.",
              author: sampleCollaborators[1],
              createdAt: new Date("2024-01-01T10:00:00"),
            },
          ]}
          onAddComment={(content) => console.log("Add:", content)}
          onResolve={(id) => console.log("Resolve:", id)}
          onReply={(id, content) => console.log("Reply:", id, content)}
        />
      </ComponentCard>

      <ComponentCard
        title="Version History"
        description="Track changes over time"
      >
        <VersionHistory
          versions={[
            { id: "v1", author: sampleCollaborators[0], message: "Initial draft", timestamp: new Date("2024-01-01T08:00:00") },
            { id: "v2", author: sampleCollaborators[1], message: "Refined prompt", timestamp: new Date("2024-01-01T09:00:00") },
            { id: "v3", author: sampleCollaborators[0], message: "Final polish", timestamp: new Date("2024-01-01T10:00:00") },
          ]}
          onSelect={(id: string) => console.log("Selected version:", id)}
          onRevert={(id: string) => console.log("Revert to:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Share Dialog"
        description="Invite collaborators"
      >
        <CollaborationShareDialog
          collaborators={sampleCollaborators}
          onInvite={(email, role) => console.log("Invite:", email, role)}
          onCopyLink={() => console.log("Copy link")}
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
