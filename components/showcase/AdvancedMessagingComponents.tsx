"use client";

import * as React from "react";
import { ThreadReply, ThreadView, ReplyInput } from "@/components/ai/thread-replies";
import { PinnedMessage, PinnedMessagesList, PinnedMessageBanner } from "@/components/ai/pinned-messages";
import { SearchBar, SearchResultsList, HighlightedText } from "@/components/ai/search-messages";
import { MentionInput, MentionList, MentionBadge } from "@/components/ai/mentions";
import { QuickReplyBar } from "@/components/ai/quick-replies";
import { ForwardDialog, ForwardPreview } from "@/components/ai/message-forwarding";
import { MessageGroup, DateSeparator, UnreadSeparator } from "@/components/ai/message-grouping";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

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
            timestamp: new Date() 
          }}
          onUnpin={() => {}}
        />
      </ComponentCard>

      <ComponentCard
        title="Search Messages"
        description="Find content within chat"
      >
        <div className="space-y-4">
          <SearchBar onSearch={(q) => console.log("Search:", q)} />
          <HighlightedText text="This is a search result example." highlight="search" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Mentions"
        description="Tagging users"
      >
        <div className="flex gap-2">
          <MentionBadge name="Alice" />
          <MentionBadge name="Bob" />
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
        <ForwardDialog 
          message={{ 
            id: "1", 
            content: "Check this out!", 
            author: { id: "alice", name: "Alice" }, 
            timestamp: new Date() 
          }}
          trigger={<Button variant="outline">Forward</Button>}
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
    </div>
  );
}
