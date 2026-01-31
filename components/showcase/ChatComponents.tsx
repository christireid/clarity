"use client";

import * as React from "react";
import { MessageBubble } from "@/components/ai/message";
import { ThinkingIndicator, ThinkingSteps } from "@/components/ai/thinking-indicator";
import { ToolCall } from "@/components/ai/tool-call";
import { CitationChip, SourceCard } from "@/components/ai/citation-chip";
import { ComponentCard } from "./ComponentCard";

export function ChatComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Message"
        description="User and assistant messages with actions"
      >
        <div className="space-y-4">
          <MessageBubble
            message={{
              id: "1",
              role: "user",
              content: "Can you help me write a function to sort an array?",
              timestamp: new Date("2024-01-01T12:00:00"),
            }}
          />
          <MessageBubble
            message={{
              id: "2",
              role: "assistant",
              content: `Of course! Here's a simple implementation of quicksort in JavaScript:

\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
\`\`\`

This implementation has O(n log n) average time complexity.`,
              timestamp: new Date("2024-01-01T12:01:00"),
              model: "gpt-4",
            }}
            onCopy={() => {}}
            onRegenerate={() => {}}
            onEdit={() => {}}
            onFeedback={(type) => console.log("Feedback:", type)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Thinking Indicator"
        description="Shows AI reasoning process"
      >
        <div className="space-y-4">
          <ThinkingIndicator
            steps={[
              { id: "1", type: "thinking", content: "Analyzing your request", status: "complete" },
              { id: "2", type: "searching", content: "Looking up information", status: "active" },
            ]}
            isActive
          />
          <ThinkingIndicator
            steps={[
              { id: "1", type: "analyzing", content: "Breaking down the problem", status: "complete" },
              { id: "2", type: "planning", content: "Creating a solution plan", status: "complete" },
              { id: "3", type: "writing", content: "Generating response", status: "complete" },
            ]}
          />
          <ThinkingSteps
            steps={[
              { id: "1", text: "Analyzing the problem", status: "completed", duration: 1200 },
              { id: "2", text: "Searching for relevant patterns", status: "completed", duration: 800 },
              { id: "3", text: "Generating solution", status: "active" },
              { id: "4", text: "Validating output", status: "pending" },
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Tool Call"
        description="Display tool invocations and results"
      >
        <div className="space-y-4">
          <ToolCall
            toolCall={{
              id: "1",
              name: "web_search",
              status: "running",
              args: { query: "React best practices 2024" },
            }}
          />
          <ToolCall
            toolCall={{
              id: "2",
              name: "code_interpreter",
              status: "complete",
              args: { code: "print('Hello World')" },
              result: { output: "Hello World", exitCode: 0 },
            }}
          />
          <ToolCall
            toolCall={{
              id: "3",
              name: "file_read",
              status: "error",
              args: { path: "/etc/passwd" },
              error: "Permission denied",
            }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Citations"
        description="Inline citations and source cards"
      >
        <div className="space-y-4">
          <div className="text-foreground">
            According to recent studies <CitationChip index={1} title="AI Research 2024" url="https://example.com" />,
            large language models have shown significant improvements in reasoning tasks <CitationChip index={2} title="LLM Benchmarks" url="https://example.com/benchmarks" />.
          </div>
          <div className="flex gap-4 flex-wrap">
            <SourceCard
              title="AI Research Paper"
              url="https://arxiv.org/paper"
              description="Comprehensive analysis of modern AI systems"
              favicon="https://arxiv.org/favicon.ico"
            />
            <SourceCard
              title="Documentation"
              url="https://docs.example.com"
              description="Official API documentation and guides"
            />
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
