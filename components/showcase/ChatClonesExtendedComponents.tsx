"use client";

import * as React from "react";
import { ManusChat, EmergentChat, LoveableChat } from "@/components/ai/chat-clones-extended";
import { ComponentCard } from "./ComponentCard";

export function ChatClonesExtendedComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Manus Chat"
        description="Minimalist dev-focused chat"
      >
        <ManusChat className="h-[600px]" />
      </ComponentCard>

      <ComponentCard
        title="Emergent Chat"
        description="Professional agent-focused chat"
      >
        <EmergentChat className="h-[600px]" />
      </ComponentCard>

      <ComponentCard
        title="Loveable Chat"
        description="Friendly creative chat"
      >
        <LoveableChat className="h-[600px]" />
      </ComponentCard>
    </div>
  );
}
