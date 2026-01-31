"use client";

import * as React from "react";
import { MessageGroup, DateSeparator, UnreadDivider, TimeGroup } from "@/components/ai/message-grouping";
import { ComponentCard } from "./ComponentCard";

export function AdvancedMessagingComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Message Grouping"
        description="Visual grouping of messages"
      >
        <div className="space-y-4">
          <DateSeparator date={new Date()} />
          <MessageGroup 
            messages={[
              { id: "1", content: "Hello", role: "user", timestamp: new Date() },
              { id: "2", content: "How are you?", role: "user", timestamp: new Date() }
            ]}
            renderMessage={(msg) => (
              <div key={msg.id} className="p-2 bg-muted rounded">
                {msg.content}
              </div>
            )}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
