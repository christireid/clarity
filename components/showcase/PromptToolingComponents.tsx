"use client";

import * as React from "react";
import { PromptManager, SystemPromptEditor, TokenCounter, PromptChainBuilder, PromptVersionHistory, PromptTestingPanel, PromptLibrary } from "@/components/ai/prompt-manager";
import { BookmarkButton, BookmarksList, BookmarkDialog } from "@/components/ai/bookmarks";
import { PresetSelector, PresetEditor } from "@/components/ai/presets";
import { ComponentCard } from "./ComponentCard";

const samplePrompts = [
  { id: "1", name: "Code Review", content: "Review the following code for best practices...", category: "Development", description: "Comprehensive code review template", usageCount: 25, variables: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Summarize", content: "Summarize the following text in 3 key points...", category: "Writing", description: "Quick summary generator", usageCount: 18, variables: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "3", name: "Debug Help", content: "Help me debug the following error...", category: "Development", description: "Error analysis and debugging", usageCount: 42, variables: [], createdAt: new Date(), updatedAt: new Date() }
];

const samplePresets = [
  { id: "1", name: "Creative", description: "Higher temperature for creative tasks", temperature: 0.9, maxTokens: 2048 },
  { id: "2", name: "Precise", description: "Lower temperature for precise answers", temperature: 0.2, maxTokens: 4096 },
  { id: "3", name: "Balanced", description: "Balanced settings for general use", temperature: 0.7, maxTokens: 4096 }
];

export function PromptToolingComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Prompt Manager"
        description="Organize and manage prompts"
      >
        <PromptManager
          prompts={samplePrompts}
          onSelect={(prompt) => console.log("Selected:", prompt)}
          onSave={(prompt) => console.log("Saved:", prompt)}
        />
      </ComponentCard>

      <ComponentCard
        title="System Prompt Editor"
        description="Edit system prompts with templates"
      >
        <SystemPromptEditor
          value="You are a helpful assistant that specializes in software development."
          onChange={(value) => console.log("Updated:", value)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Chain Builder"
        description="Create multi-step prompt chains"
      >
        <PromptChainBuilder
          steps={[
            { id: "1", name: "Analyze", template: "Analyze the following code..." },
            { id: "2", name: "Suggest", template: "Based on the analysis, suggest improvements..." },
            { id: "3", name: "Implement", template: "Implement the suggested improvements..." }
          ]}
          onStepsChange={(steps) => console.log("Steps changed:", steps)}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Counter"
        description="Track token usage in prompts"
      >
        <TokenCounter
          text="This is a sample text to count tokens. The actual token count may vary depending on the tokenizer used by the model."
          maxTokens={4096}
        />
      </ComponentCard>

      <ComponentCard
        title="Preset Selector"
        description="Quick model configuration presets"
      >
        <PresetSelector
          presets={samplePresets}
          onSelect={(preset) => console.log("Selected preset:", preset)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Library"
        description="Browse and use saved prompts"
      >
        <PromptLibrary
          categories={[
            { id: "development", name: "Development", count: 2 },
            { id: "writing", name: "Writing", count: 1 }
          ]}
          prompts={samplePrompts}
          onSelectPrompt={(prompt) => console.log("Selected:", prompt.id)}
          onSelectCategory={(categoryId) => console.log("Category:", categoryId)}
        />
      </ComponentCard>
    </div>
  );
}
