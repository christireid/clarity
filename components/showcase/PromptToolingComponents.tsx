"use client";

import * as React from "react";
import { PromptManager, PromptChainBuilder, PromptVersionHistory, PromptTestingPanel, PromptLibrary, SystemPromptEditor, TokenCounter } from "@/components/ai/prompt-manager";
import { Bookmarks, BookmarkCard, BookmarkList } from "@/components/ai/bookmarks";
import { Presets, PresetCard, PresetSelector } from "@/components/ai/presets";
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
            { id: "v1", content: "Write code", timestamp: new Date("2024-01-01T09:00:00"), author: "Alice" },
            { id: "v2", content: "Write efficient React code", timestamp: new Date("2024-01-01T10:00:00"), author: "Bob" }
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

      {/* Token Counter */}
      <ComponentCard
        title="Token Counter"
        description="Count tokens in prompt"
      >
        <TokenCounter
          text="This is a sample prompt to count tokens. It helps estimate API costs."
          model="gpt-4"
        />
      </ComponentCard>

      {/* Bookmarks */}
      <ComponentCard
        title="Bookmarks"
        description="Save important prompts and responses"
      >
        <BookmarkList
          bookmarks={[
            { id: "1", title: "API Design Pattern", content: "RESTful API best practices...", tags: ["api", "design"], createdAt: new Date() },
            { id: "2", title: "React Hook Pattern", content: "Custom hook for data fetching...", tags: ["react", "hooks"], createdAt: new Date(Date.now() - 86400000) },
          ]}
          onSelect={(id) => console.log("Select:", id)}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </ComponentCard>

      {/* Presets */}
      <ComponentCard
        title="Preset Selector"
        description="Quick configuration presets"
      >
        <PresetSelector
          presets={[
            { id: "1", name: "Creative Writing", description: "High temperature, narrative focus", settings: { temperature: 0.9, maxTokens: 2000 } },
            { id: "2", name: "Code Generation", description: "Low temperature, precise output", settings: { temperature: 0.2, maxTokens: 4000 } },
            { id: "3", name: "Analysis", description: "Balanced settings for analysis", settings: { temperature: 0.5, maxTokens: 3000 } },
          ]}
          selectedId="2"
          onSelect={(id) => console.log("Select preset:", id)}
          onCreate={() => console.log("Create new preset")}
        />
      </ComponentCard>

      {/* Prompt Library */}
      <ComponentCard
        title="Prompt Library"
        description="Browse saved prompts"
      >
        <PromptLibrary
          prompts={[
            { id: "1", name: "Code Review", category: "Development", description: "Review code for best practices", usageCount: 45 },
            { id: "2", name: "Bug Analysis", category: "Development", description: "Analyze and fix bugs", usageCount: 32 },
            { id: "3", name: "Documentation", category: "Writing", description: "Generate documentation", usageCount: 28 },
          ]}
          onSelect={(id) => console.log("Select prompt:", id)}
          onDuplicate={(id) => console.log("Duplicate:", id)}
        />
      </ComponentCard>
    </div>
  );
}
