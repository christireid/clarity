"use client";

import * as React from "react";
import { ChatInput } from "@/components/ai/chat-input";
import { ModelSelector } from "@/components/ai/model-selector";
import { CommandPalette } from "@/components/ai/command-palette";
import { FileUpload } from "@/components/ai/file-upload";
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
          onSubmit={(msg) => console.log("Submit:", msg)}
          onFileUpload={(files) => console.log("Files:", files)}
          placeholder="Type a message... Use / for commands, @ for mentions"
          showFileUpload
          showVoiceInput
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
              capabilities: ["vision", "function_calling", "json_mode"],
            },
            {
              id: "claude-3",
              name: "Claude 3 Opus",
              provider: "Anthropic",
              description: "Excellent for analysis and writing",
              contextWindow: 200000,
              capabilities: ["vision", "function_calling"],
            },
            {
              id: "gemini-pro",
              name: "Gemini Pro",
              provider: "Google",
              description: "Fast and efficient",
              contextWindow: 32000,
              capabilities: ["vision"],
            },
          ]}
          selectedId="gpt-4"
          onSelect={(id) => console.log("Selected:", id)}
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
              { id: "1", label: "New Chat", shortcut: "N", icon: <MessageSquare className="h-4 w-4" />, action: () => {} },
              { id: "2", label: "Search", shortcut: "S", icon: <Search className="h-4 w-4" />, action: () => {} },
              { id: "3", label: "Settings", shortcut: ",", icon: <Settings className="h-4 w-4" />, action: () => {} },
              { id: "4", label: "Toggle Sidebar", shortcut: "B", icon: <PanelLeft className="h-4 w-4" />, action: () => {} },
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
    </div>
  );
}
