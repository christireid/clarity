"use client";

import * as React from "react";
import { ChatGPTClone, ClaudeClone, PerplexityClone } from "@/components/ai/chat-clones";
import { ManusChat, EmergentChat, LoveableChat } from "@/components/ai/chat-clones-extended";
import { ComponentCard } from "./ComponentCard";

// Consolidated Platform Clones - each with distinct UX patterns
export function CloneComponents() {
  const sampleMessages = [
    { id: "1", role: "user" as const, content: "What is the best way to learn programming?" },
    { id: "2", role: "assistant" as const, content: "Learning programming effectively involves several key strategies:\n\n1. **Start with fundamentals** - Choose a beginner-friendly language like Python or JavaScript\n2. **Practice daily** - Consistency is more important than long sessions\n3. **Build projects** - Apply what you learn to real problems\n4. **Read other's code** - Learn from open source projects\n5. **Join communities** - Engage with other developers" },
    { id: "3", role: "user" as const, content: "Can you give me a simple Python example?" },
  ];

  return (
    <div className="space-y-8">
      {/* Sidebar Navigation Pattern */}
      <ComponentCard
        title="ChatGPT Clone"
        description="Sidebar navigation with conversation history"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ChatGPTClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      {/* Minimal Clean Design Pattern */}
      <ComponentCard
        title="Claude Clone"
        description="Minimal clean interface with model selector"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ClaudeClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      {/* Search + Sources Pattern */}
      <ComponentCard
        title="Perplexity Clone"
        description="Search-focused with inline sources and focus modes"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <PerplexityClone
            messages={[
              ...sampleMessages,
              {
                id: "4",
                role: "assistant" as const,
                content: "Here's a simple Python example that demonstrates basic concepts:",
                sources: [
                  { title: "Python Documentation", url: "https://docs.python.org" },
                  { title: "Real Python", url: "https://realpython.com" },
                ],
              },
            ]}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      {/* Developer Tools Pattern */}
      <ComponentCard
        title="Manus Chat"
        description="Developer-focused with slash commands"
      >
        <ManusChat className="h-[600px]" />
      </ComponentCard>

      {/* Agent/Tool Display Pattern */}
      <ComponentCard
        title="Emergent Chat"
        description="Agent-focused with tool metadata display"
      >
        <EmergentChat className="h-[600px]" />
      </ComponentCard>

      {/* Creative/Emotional Pattern */}
      <ComponentCard
        title="Loveable Chat"
        description="Friendly creative interface with reactions"
      >
        <LoveableChat className="h-[600px]" />
      </ComponentCard>
    </div>
  );
}
