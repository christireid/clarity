"use client";

import * as React from "react";
import { ChatInput } from "@/components/ai/chat-input";
import { ModelSelector } from "@/components/ai/model-selector";
import { CommandPalette } from "@/components/ai/command-palette";
import { FileUpload } from "@/components/ai/file-upload";
import { AITextarea, AutocompleteTextarea } from "@/components/ai/ai-textarea";
import { Composer, ComposerToolbar } from "@/components/ai/composer";
import { Autocomplete, AutocompleteItem } from "@/components/ai/autocomplete";
import { MentionInput, MentionList } from "@/components/ai/mentions";
import { SuggestionChips, SuggestionBar } from "@/components/ai/suggestion-chips";
import { QuickReplyBar, QuickReply } from "@/components/ai/quick-replies";
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

      {/* AI Textarea */}
      <ComponentCard
        title="AI Textarea"
        description="Textarea with AI autocomplete suggestions"
      >
        <AITextarea
          placeholder="Start typing and AI will suggest completions..."
          onSubmit={(text) => console.log("Submit:", text)}
          suggestions={[
            "Write a function that...",
            "Explain the concept of...",
            "Create a component for...",
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
          onSend={(content, attachments) => console.log("Send:", content, attachments)}
          showToolbar
          showAttachments
          showVoice
        >
          <ComposerToolbar
            onBold={() => {}}
            onItalic={() => {}}
            onCode={() => {}}
            onLink={() => {}}
          />
        </Composer>
      </ComponentCard>

      {/* Autocomplete */}
      <ComponentCard
        title="Autocomplete Input"
        description="Input with dropdown suggestions"
      >
        <Autocomplete
          placeholder="Search for a command..."
          items={[
            { id: "1", label: "New file", description: "Create a new file" },
            { id: "2", label: "Open folder", description: "Open a folder" },
            { id: "3", label: "Save all", description: "Save all open files" },
            { id: "4", label: "Find in files", description: "Search across project" },
          ]}
          onSelect={(item) => console.log("Selected:", item)}
        />
      </ComponentCard>

      {/* Mention Input */}
      <ComponentCard
        title="Mention Input"
        description="@ mentions with user suggestions"
      >
        <MentionInput
          placeholder="Type @ to mention someone..."
          users={[
            { id: "1", name: "Alice Johnson", avatar: "https://i.pravatar.cc/40?1" },
            { id: "2", name: "Bob Smith", avatar: "https://i.pravatar.cc/40?2" },
            { id: "3", name: "Carol White", avatar: "https://i.pravatar.cc/40?3" },
          ]}
          onMention={(user) => console.log("Mentioned:", user)}
          onSubmit={(text, mentions) => console.log("Submit:", text, mentions)}
        />
      </ComponentCard>

      {/* Suggestion Chips */}
      <ComponentCard
        title="Suggestion Chips"
        description="Quick action suggestions"
      >
        <SuggestionChips
          suggestions={[
            { id: "1", label: "Explain this code", onClick: () => {} },
            { id: "2", label: "Add error handling", onClick: () => {} },
            { id: "3", label: "Write tests", onClick: () => {} },
            { id: "4", label: "Optimize performance", onClick: () => {} },
          ]}
        />
      </ComponentCard>

      {/* Quick Replies */}
      <ComponentCard
        title="Quick Reply Bar"
        description="Predefined quick responses"
      >
        <QuickReplyBar>
          <QuickReply onClick={() => {}}>Yes, please continue</QuickReply>
          <QuickReply onClick={() => {}}>Show me an example</QuickReply>
          <QuickReply onClick={() => {}}>Explain more</QuickReply>
          <QuickReply onClick={() => {}}>Start over</QuickReply>
        </QuickReplyBar>
      </ComponentCard>
    </div>
  );
}
