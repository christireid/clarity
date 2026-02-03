"use client";

import * as React from "react";
import { ChatInput } from "@/components/ai/chat-input";
import { ModelSelector } from "@/components/ai/model-selector";
import { CommandPalette } from "@/components/ai/command-palette";
import { FileUpload } from "@/components/ai/file-upload";
import { AITextarea } from "@/components/ai/ai-textarea";
import { Composer, ComposerHeader, SimpleComposer } from "@/components/ai/composer";
import { Autocomplete } from "@/components/ai/autocomplete";
import { MentionInput } from "@/components/ai/mentions";
import { SuggestionChips } from "@/components/ai/suggestion-chips";
import { QuickReplyBar, QuickReplyItem } from "@/components/ai/quick-replies";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";
import { Search, Settings, PanelLeft, MessageSquare } from "lucide-react";

export function InputComponents() {
  const [inputValue, setInputValue] = React.useState("");
  const [showPalette, setShowPalette] = React.useState(false);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Chat Input"
        description="Advanced input with file upload and commands"
      >
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => console.log("Submit:", inputValue)}
          placeholder="Type a message... Use / for commands, @ for mentions"
        />
      </ComponentCard>

      <ComponentCard
        title="Model Selector"
        description="Select AI models with details"
      >
        <ModelSelector
          models={[
            {
              id: "gpt-4",
              name: "GPT-4",
              provider: "OpenAI",
              description: "Most capable model for complex tasks",
              contextWindow: 128000,
              maxOutput: 8192,
              capabilities: ["vision", "function-calling", "code"],
            },
            {
              id: "claude-3",
              name: "Claude 3 Opus",
              provider: "Anthropic",
              description: "Excellent for analysis and writing",
              contextWindow: 200000,
              maxOutput: 4096,
              capabilities: ["vision", "function-calling", "reasoning"],
            },
            {
              id: "gemini-pro",
              name: "Gemini Pro",
              provider: "Google",
              description: "Fast and efficient",
              contextWindow: 32000,
              maxOutput: 8192,
              capabilities: ["vision", "text"],
            },
          ]}
          onSelect={(model) => console.log("Selected:", model.id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Command Palette"
        description="Keyboard-driven command interface"
      >
        <div className="space-y-4">
          <Button onClick={() => setShowPalette(true)}>
            Open Command Palette (Cmd+K)
          </Button>
          <CommandPalette
            open={showPalette}
            onOpenChange={setShowPalette}
            commands={[
              { id: "1", label: "New Chat", shortcut: ["⌘", "N"], icon: <MessageSquare className="h-4 w-4" />, action: () => {} },
              { id: "2", label: "Search", shortcut: ["⌘", "S"], icon: <Search className="h-4 w-4" />, action: () => {} },
              { id: "3", label: "Settings", shortcut: ["⌘", ","], icon: <Settings className="h-4 w-4" />, action: () => {} },
              { id: "4", label: "Toggle Sidebar", shortcut: ["⌘", "B"], icon: <PanelLeft className="h-4 w-4" />, action: () => {} },
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="File Upload"
        description="Drag and drop file upload zone"
      >
        <FileUpload
          onFilesChange={(files) => console.log("Uploaded:", files)}
          accept="image/*,.pdf,.txt,.md,.json"
          maxSize={10 * 1024 * 1024}
        />
      </ComponentCard>

      {/* AI Textarea */}
      <ComponentCard
        title="AI Textarea"
        description="Textarea with AI autocomplete suggestions"
      >
        <AITextarea
          placeholder="Start typing and AI will suggest completions..."
          showAIButton
          suggestions={[
            { id: "1", text: "Write a function that...", type: "completion" },
            { id: "2", text: "Explain the concept of...", type: "expansion" },
            { id: "3", text: "Create a component for...", type: "completion" },
          ]}
        />
      </ComponentCard>

      {/* Composer */}
      <ComponentCard
        title="Message Composer"
        description="Full-featured message composer with toolbar"
      >
        <Composer
          placeholder="Compose your message..."
          onSubmit={(value, slots) => console.log("Submit:", value, slots)}
          allowAttachments
          allowSpeech
        />
      </ComponentCard>

      {/* Autocomplete */}
      <ComponentCard
        title="Autocomplete Input"
        description="Input with dropdown suggestions"
      >
        <Autocomplete
          placeholder="Search for a command..."
          options={[
            { value: "new-file", label: "New file", description: "Create a new file" },
            { value: "open-folder", label: "Open folder", description: "Open a folder" },
            { value: "save-all", label: "Save all", description: "Save all open files" },
            { value: "find-in-files", label: "Find in files", description: "Search across project" },
          ]}
          onChange={(value) => console.log("Selected:", value)}
        />
      </ComponentCard>

      {/* Mention Input */}
      <ComponentCard
        title="Mention Input"
        description="@ mentions with user suggestions"
      >
        <MentionInput
          value=""
          onChange={(value, mentions) => console.log("Changed:", value, mentions)}
          placeholder="Type @ to mention someone..."
          users={[
            { id: "1", name: "Alice Johnson", username: "alice", avatar: "https://i.pravatar.cc/40?1" },
            { id: "2", name: "Bob Smith", username: "bob", avatar: "https://i.pravatar.cc/40?2" },
            { id: "3", name: "Carol White", username: "carol", avatar: "https://i.pravatar.cc/40?3" },
          ]}
        />
      </ComponentCard>

      {/* Suggestion Chips */}
      <ComponentCard
        title="Suggestion Chips"
        description="Quick action suggestions"
      >
        <SuggestionChips
          suggestions={[
            { id: "1", label: "Explain this code" },
            { id: "2", label: "Add error handling" },
            { id: "3", label: "Write tests" },
            { id: "4", label: "Optimize performance" },
          ]}
          onSelect={(suggestion) => console.log("Selected:", suggestion)}
        />
      </ComponentCard>

      {/* Quick Replies */}
      <ComponentCard
        title="Quick Reply Bar"
        description="Predefined quick responses"
      >
        <QuickReplyBar
          replies={[
            { id: "1", title: "Continue", content: "Yes, please continue" },
            { id: "2", title: "Example", content: "Show me an example" },
            { id: "3", title: "Explain", content: "Explain more" },
            { id: "4", title: "Restart", content: "Start over" },
          ]}
          onSelect={(reply) => console.log("Selected:", reply)}
        />
      </ComponentCard>
    </div>
  );
}
