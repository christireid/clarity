"use client";

import * as React from "react";
import { ChatGPTClone, ClaudeClone, PerplexityClone, GrokClone } from "@/components/ai/chat-clones";
import { ComponentCard } from "./ComponentCard";

export function CloneComponents() {
  const sampleMessages = [
    { id: "1", role: "user" as const, content: "What is the best way to learn programming?" },
    { id: "2", role: "assistant" as const, content: "Learning programming effectively involves several key strategies:\n\n1. **Start with fundamentals** - Choose a beginner-friendly language like Python or JavaScript\n2. **Practice daily** - Consistency is more important than long sessions\n3. **Build projects** - Apply what you learn to real problems\n4. **Read other's code** - Learn from open source projects\n5. **Join communities** - Engage with other developers" },
    { id: "3", role: "user" as const, content: "Can you give me a simple Python example?" },
  ];

  return (
    <div className="space-y-8">
      <ComponentCard
        title="ChatGPT Clone"
        description="OpenAI ChatGPT-style interface with dark theme"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ChatGPTClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Claude Clone"
        description="Anthropic Claude-style interface with clean design"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ClaudeClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Perplexity Clone"
        description="Perplexity-style interface with sources"
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

      <ComponentCard
        title="Grok Clone"
        description="xAI Grok-style interface with personality"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <GrokClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
