"use client";

import * as React from "react";
import { ThreadView, InlineThread, ThreadMessageItem, ReplyPreview, QuotedMessage } from "@/components/ai/thread-replies";
import { PinnedMessage, PinnedMessagesList, PinnedMessageBanner } from "@/components/ai/pinned-messages";
import { SearchBar, SearchResultsList, HighlightedText } from "@/components/ai/search-messages";
import { MentionInput, MentionChip, MentionBadge, MentionedText } from "@/components/ai/mentions";
import { QuickReplyBar } from "@/components/ai/quick-replies";
import { ForwardButton, ForwardedMessageCard } from "@/components/ai/message-forwarding";
import { MessageGroup, DateSeparator, UnreadSeparator } from "@/components/ai/message-grouping";
import {
  SchedulePicker,
  ScheduledMessageCard,
  ScheduledMessagesList,
  ScheduleIndicator,
} from "@/components/ai/scheduled-messages";
import { MessageArchive, ArchivedMessageViewer } from "@/components/ai/message-archive";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

function SearchDemo() {
  const [value, setValue] = React.useState("");
  return (
    <div className="space-y-4">
      <SearchBar
        value={value}
        onChange={setValue}
        onSearch={(q) => console.log("Search:", q)}
        placeholder="Search messages..."
      />
      <HighlightedText text="This is a search result example." query="search" />
    </div>
  );
}

export function AdvancedMessagingComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Threads"
        description="Nested message replies"
      >
        <ThreadView 
          thread={{
            id: "thread-1",
            parentMessageId: "1",
            messages: [
              { 
                id: "2", 
                content: "Reply 1", 
                author: { id: "bob", name: "Bob" }, 
                timestamp: new Date("2024-01-01T10:05:00") 
              },
              { 
                id: "3", 
                content: "Reply 2", 
                author: { id: "charlie", name: "Charlie" }, 
                timestamp: new Date("2024-01-01T10:10:00") 
              }
            ],
            participantCount: 2,
            lastActivity: new Date("2024-01-01T10:10:00")
          }}
          parentMessage={{ 
            id: "1", 
            content: "Main topic", 
            author: { id: "alice", name: "Alice" }, 
            timestamp: new Date("2024-01-01T10:00:00") 
          }}
          onReply={(content) => console.log("Reply:", content)}
        />
      </ComponentCard>

      <ComponentCard
        title="Pinned Messages"
        description="Important messages pinned to top"
      >
        <PinnedMessageBanner
          message={{
            id: "1",
            content: "Please read the guidelines before posting.",
            author: { id: "admin", name: "Admin" },
            pinnedAt: new Date(),
            pinnedBy: "Admin",
            messageTimestamp: new Date(),
          }}
          onUnpin={(id) => console.log("Unpin:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Search Messages"
        description="Find content within chat"
      >
        <SearchDemo />
      </ComponentCard>

      <ComponentCard
        title="Mentions"
        description="Tagging users and showing mention badges"
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <MentionChip mention={{ type: "user", id: "1", name: "Alice", displayText: "@Alice" }} />
            <MentionChip mention={{ type: "user", id: "2", name: "Bob", displayText: "@Bob" }} />
            <MentionChip mention={{ type: "channel", id: "3", name: "general", displayText: "#general" }} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Unread mentions:</span>
            <MentionBadge count={5} />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Quick Replies"
        description="Suggested responses"
      >
        <QuickReplyBar 
          replies={[
            { id: "1", title: "Yes", content: "Yes" },
            { id: "2", title: "No", content: "No" },
            { id: "3", title: "Maybe", content: "Maybe" },
            { id: "4", title: "Ask later", content: "Ask later" }
          ]}
          onSelect={(r) => console.log("Reply:", r)}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Forwarding"
        description="Share messages with others"
      >
        <ForwardButton
          message={{
            id: "1",
            content: "Check this out!",
            author: { name: "Alice" },
            timestamp: new Date()
          }}
          targets={[
            { id: "1", type: "user", name: "Bob", description: "Team member" },
            { id: "2", type: "channel", name: "#general", description: "General discussion" },
            { id: "3", type: "conversation", name: "Project Chat", description: "Project lead and team" }
          ]}
          onForward={(targetIds, note) => console.log("Forward to:", targetIds, note)}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Grouping"
        description="Visual grouping of messages"
      >
        <div className="space-y-4">
          <DateSeparator date={new Date("2024-01-01T10:00:00")} />
          <MessageGroup
            messages={[
              { id: "1", content: "Hello", role: "user", timestamp: new Date("2024-01-01T10:00:00") },
              { id: "2", content: "How are you?", role: "user", timestamp: new Date("2024-01-01T10:01:00") }
            ]}
            renderMessage={(msg) => (
              <div key={msg.id} className="p-2 bg-muted rounded">
                {msg.content}
              </div>
            )}
          />
          <UnreadSeparator />
        </div>
      </ComponentCard>

      {/* Scheduled Messages */}
      <ComponentCard
        title="Schedule Picker"
        description="Select date and time for scheduled send"
      >
        <SchedulePicker
          onChange={(date) => console.log("Scheduled for:", date)}
        />
      </ComponentCard>

      <ComponentCard
        title="Schedule Indicator"
        description="Show when message is scheduled"
      >
        <ScheduleIndicator
          scheduledFor={new Date(Date.now() + 3600000)}
          onClear={() => console.log("Cleared")}
        />
      </ComponentCard>

      <ComponentCard
        title="Scheduled Message Card"
        description="Preview of a scheduled message"
      >
        <div className="max-w-md">
          <ScheduledMessageCard
            message={{
              id: "1",
              content: "Don't forget the meeting tomorrow at 10am!",
              scheduledFor: new Date(Date.now() + 86400000),
              conversationId: "conv-1",
              conversationName: "Team Chat",
              status: "pending",
              createdAt: new Date(),
            }}
            onEdit={(m) => console.log("Edit:", m)}
            onDelete={(m) => console.log("Delete:", m)}
            onSendNow={(m) => console.log("Send now:", m)}
            onReschedule={(m, d) => console.log("Reschedule:", m, d)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Scheduled Messages List"
        description="All scheduled messages"
      >
        <ScheduledMessagesList
          messages={[
            {
              id: "1",
              content: "Weekly report reminder",
              scheduledFor: new Date(Date.now() + 3600000),
              conversationId: "conv-1",
              conversationName: "#reports",
              status: "pending",
              createdAt: new Date(),
            },
            {
              id: "2",
              content: "Happy birthday!",
              scheduledFor: new Date(Date.now() + 86400000),
              conversationId: "conv-2",
              conversationName: "Bob",
              status: "pending",
              createdAt: new Date(),
            },
            {
              id: "3",
              content: "Previous message",
              scheduledFor: new Date(Date.now() - 3600000),
              conversationId: "conv-1",
              conversationName: "#general",
              status: "sent",
              createdAt: new Date(Date.now() - 7200000),
            },
          ]}
          showPast
          onEdit={(m) => console.log("Edit:", m)}
          onDelete={(m) => console.log("Delete:", m)}
          onSendNow={(m) => console.log("Send now:", m)}
          onReschedule={(m, d) => console.log("Reschedule:", m, d)}
        />
      </ComponentCard>

      {/* Message Archive */}
      <ComponentCard
        title="Message Archive"
        description="Browse archived conversations"
      >
        <div className="h-[400px] border rounded-lg overflow-hidden">
          <MessageArchive
            conversations={[
              {
                id: "conv-1",
                title: "React Performance Discussion",
                messageCount: 24,
                archivedAt: new Date(Date.now() - 86400000 * 7),
                lastMessageAt: new Date(Date.now() - 86400000 * 8),
                preview: "Let me explain the optimization...",
              },
              {
                id: "conv-2",
                title: "API Design Review",
                messageCount: 18,
                archivedAt: new Date(Date.now() - 86400000 * 14),
                lastMessageAt: new Date(Date.now() - 86400000 * 15),
                preview: "The endpoint structure looks good...",
              },
              {
                id: "conv-3",
                title: "Bug Investigation",
                messageCount: 42,
                archivedAt: new Date(Date.now() - 86400000 * 30),
                lastMessageAt: new Date(Date.now() - 86400000 * 31),
                preview: "Found the root cause...",
              },
            ]}
            onView={(id) => console.log("View:", id)}
            onRestore={(ids) => console.log("Restore:", ids)}
            onDelete={(ids) => console.log("Delete:", ids)}
            onExport={(ids) => console.log("Export:", ids)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Archived Message Viewer"
        description="View messages in archived conversation"
      >
        <ArchivedMessageViewer
          title="React Performance Discussion"
          messages={[
            { id: "1", conversationId: "conv-1", conversationTitle: "React Performance Discussion", role: "user", content: "How do we optimize this query?", timestamp: new Date(Date.now() - 86400000) },
            { id: "2", conversationId: "conv-1", conversationTitle: "React Performance Discussion", role: "assistant", content: "There are several approaches we can take...", timestamp: new Date(Date.now() - 86400000 + 60000) },
            { id: "3", conversationId: "conv-1", conversationTitle: "React Performance Discussion", role: "user", content: "Can you show me an example?", timestamp: new Date(Date.now() - 86400000 + 120000) },
          ]}
          onClose={() => console.log("Close")}
        />
      </ComponentCard>
    </div>
  );
}
