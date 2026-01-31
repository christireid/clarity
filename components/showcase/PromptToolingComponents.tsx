"use client";

import * as React from "react";
import { PromptManager, PromptChainBuilder, PromptVersionHistory, PromptTestingPanel, PromptLibrary, SystemPromptEditor } from "@/components/ai/prompt-manager";
import { ComponentCard } from "./ComponentCard";

export function PromptToolingComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Prompt Manager"
        description="Edit and optimize prompts"
      >
        <PromptManager 
          prompt="Write a React component that..."
          onSave={(p) => console.log("Saved:", p)}
          onTest={(p) => console.log("Test:", p)}
        />
      </ComponentCard>

      <ComponentCard
        title="System Prompt Editor"
        description="Configure AI persona"
      >
        <SystemPromptEditor 
          systemPrompt="You are a helpful AI assistant specialized in React development."
          onChange={(p) => console.log("Changed:", p)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Chain Builder"
        description="Link prompts together"
      >
        <PromptChainBuilder 
          steps={[
            { id: "1", name: "Analyze", prompt: "Analyze the code..." },
            { id: "2", name: "Refactor", prompt: "Refactor based on analysis..." },
            { id: "3", name: "Test", prompt: "Generate tests for refactored code..." }
          ]}
          onReorder={(steps) => console.log("Reordered:", steps)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Version History"
        description="Track prompt iterations"
      >
        <PromptVersionHistory 
          versions={[
            { id: "v1", content: "Write code", timestamp: new Date(Date.now() - 86400000), author: "Alice" },
            { id: "v2", content: "Write efficient React code", timestamp: new Date(), author: "Bob" }
          ]}
          onSelect={(v) => console.log("Selected:", v)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Testing"
        description="Validate prompts against test cases"
      >
        <PromptTestingPanel 
          testCases={[
            { input: "Create button", expected: "Should output Button component" },
            { input: "Fix bug", expected: "Should identify error" }
          ]}
          onRun={(cases) => console.log("Running tests:", cases)}
        />
      </ComponentCard>
    </div>
  );
}
