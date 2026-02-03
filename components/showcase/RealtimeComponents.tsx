"use client";

import * as React from "react";
import { MessageReactions, QuickReactionBar } from "@/components/ai/reactions";
import { MessageStatusIndicator, ReadReceiptAvatars, TypingStatus, OnlineStatusIndicator } from "@/components/ai/read-receipts";
import { PresenceDot, UserPresence, PresenceList, TypingAwareness, WhosHere } from "@/components/ai/presence";
import { ComponentCard } from "./ComponentCard";

export function RealtimeComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Message Reactions"
        description="Emoji reactions to messages"
      >
        <div className="space-y-4">
          <MessageReactions
            messageId="msg-1"
            reactions={[
              { emoji: "👍", count: 3, users: ["Alice", "Bob", "Charlie"], reacted: true },
              { emoji: "❤️", count: 1, users: ["Diana"], reacted: false },
              { emoji: "🚀", count: 5, users: ["Eve", "Frank", "Grace", "Henry", "Ivy"], reacted: false }
            ]}
            onAddReaction={(messageId, emoji) => console.log("Add reaction:", messageId, emoji)}
            onRemoveReaction={(messageId, emoji) => console.log("Remove reaction:", messageId, emoji)}
          />
          <QuickReactionBar onSelect={(emoji) => console.log("Quick React:", emoji)} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Read Receipts"
        description="Message delivery status"
      >
        <div className="flex gap-8">
          <MessageStatusIndicator status="sent" />
          <MessageStatusIndicator status="delivered" />
          <MessageStatusIndicator status="read" />
          <ReadReceiptAvatars
            receipts={[
              { id: "r1", userId: "u1", userName: "Alice", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", readAt: new Date("2024-01-01T10:00:00") },
              { id: "r2", userId: "u2", userName: "Bob", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", readAt: new Date("2024-01-01T10:01:00") }
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Typing Status"
        description="Real-time typing indicators"
      >
        <div className="space-y-4">
          <TypingStatus users={["Alice"]} />
          <TypingStatus users={["Bob", "Charlie"]} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Presence"
        description="User online/offline status"
      >
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <PresenceDot status="online" />
            <PresenceDot status="away" />
            <PresenceDot status="busy" />
            <PresenceDot status="offline" />
          </div>
          <UserPresence user={{ id: "u1", name: "Alice", status: "online", lastSeen: new Date("2024-01-01T10:00:00") }} />
          <WhosHere
            users={[
              { id: "1", name: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", status: "online" },
              { id: "2", name: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", status: "online" }
            ]}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
