"use client";

import * as React from "react";
import { QuickReplyBar, QuickReplyChip, QuickReplyEditor } from "@/components/ai/quick-replies";
import { ComponentCard } from "./ComponentCard";

export function AdvancedMessagingComponents() {
  return (
    <div className="space-y-8">
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
    </div>
  );
}
