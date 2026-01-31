"use client";

import * as React from "react";
import { ThreadReply, ThreadView, ReplyInput } from "@/components/ai/thread-replies";
import { PinnedMessage, PinnedMessagesList, PinnedMessageBanner } from "@/components/ai/pinned-messages";
import { SearchBar, SearchResultsList, HighlightedText } from "@/components/ai/search-messages";
import { MentionInput, MentionList, MentionBadge } from "@/components/ai/mentions";
import { QuickReplyBar, QuickReplyChip } from "@/components/ai/quick-replies";
import { ForwardDialog, ForwardPreview } from "@/components/ai/message-forwarding";
import { MessageGroup, DateSeparator, UnreadDivider } from "@/components/ai/message-grouping";
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
          parentMessage={{ id: "1", content: "Main topic", author: "Alice" }}
          replies={[
            { id: "2", content: "Reply 1", author: "Bob", timestamp: new Date() },
            { id: "3", content: "Reply 2", author: "Charlie", timestamp: new Date() }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Pinned Messages"
        description="Important messages pinned to top"
      >
        <PinnedMessageBanner 
          message={{ id: "1", content: "Please read the guidelines before posting.", author: "Admin" }}
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
          replies={["Yes", "No", "Maybe", "Ask later"]}
          onSelect={(r) => console.log("Reply:", r)}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Forwarding"
        description="Share messages with others"
      >
        <ForwardDialog 
          message={{ id: "1", content: "Check this out!", author: "Alice" }}
          trigger={<Button variant="outline">Forward</Button>}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Grouping"
        description="Visual grouping of messages"
      >
        <div className="space-y-4">
          <DateSeparator date={new Date()} />
          <MessageGroup 
            messages={[
              { id: "1", content: "Hello", author: "Alice", timestamp: new Date() },
              { id: "2", content: "How are you?", author: "Alice", timestamp: new Date() }
            ]}
          />
          <UnreadDivider />
        </div>
      </ComponentCard>
    </div>
  );
}
