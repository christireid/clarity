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
            reactions={[
              { emoji: "👍", count: 3, userReacted: true },
              { emoji: "❤️", count: 1, userReacted: false },
              { emoji: "🚀", count: 5, userReacted: false }
            ]}
            onReact={(emoji) => console.log("React:", emoji)}
          />
          <QuickReactionBar onReact={(emoji) => console.log("Quick React:", emoji)} />
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
            users={[
              { name: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
              { name: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" }
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Typing Status"
        description="Real-time typing indicators"
      >
        <div className="space-y-4">
          <TypingStatus users={[{ name: "Alice" }]} />
          <TypingStatus users={[{ name: "Bob" }, { name: "Charlie" }]} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Presence"
        description="User online/offline status"
      >
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <PresenceDot status="online" />
            <PresenceDot status="idle" />
            <PresenceDot status="dnd" />
            <PresenceDot status="offline" />
          </div>
          <UserPresence user={{ name: "Alice", status: "online", lastSeen: new Date() }} />
          <WhosHere 
            users={[
              { id: "1", name: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
              { id: "2", name: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" }
            ]}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
