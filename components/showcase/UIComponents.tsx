"use client";

import * as React from "react";
import { DynamicForm, type FormSchema } from "@/components/ai/dynamic-form";
import { HotkeyHelpDialog, ShortcutHint, type HotkeyCategory } from "@/components/ai/hotkeys";
import { NotificationCenter, type Notification } from "@/components/ai/notifications";
import { UserAvatar, ModelAvatar, AvatarGroup, SenderDisplay, TypingAvatar } from "@/components/ai/avatars";
import { EmptyChatState, EmptyState, WelcomeScreen } from "@/components/ai/empty-states";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function UIComponents() {
  const [hotkeyDialogOpen, setHotkeyDialogOpen] = React.useState(false);

  const formSchema: FormSchema = {
    fields: [
      { id: "name", type: "text", label: "Name", placeholder: "Enter your name", required: true },
      { id: "email", type: "email", label: "Email", placeholder: "your@email.com", required: true },
      { id: "role", type: "select", label: "Role", options: [
        { label: "Developer", value: "developer" },
        { label: "Designer", value: "designer" },
        { label: "Manager", value: "manager" },
      ]},
      { id: "temperature", type: "slider", label: "Temperature", defaultValue: 0.7, validation: { min: 0, max: 2 } },
      { id: "notifications", type: "switch", label: "Enable Notifications" },
      { id: "bio", type: "textarea", label: "Bio", placeholder: "Tell us about yourself" },
    ],
    submitLabel: "Save Settings",
  };

  const hotkeyCategories: HotkeyCategory[] = [
    {
      name: "Chat",
      hotkeys: [
        { id: "1", keys: ["cmd", "n"], label: "New Chat", action: () => {} },
        { id: "2", keys: ["cmd", "shift", "s"], label: "Save Conversation", action: () => {} },
        { id: "3", keys: ["cmd", "e"], label: "Export Chat", action: () => {} },
      ],
    },
    {
      name: "Navigation",
      hotkeys: [
        { id: "4", keys: ["cmd", "k"], label: "Command Palette", action: () => {} },
        { id: "5", keys: ["cmd", "b"], label: "Toggle Sidebar", action: () => {} },
        { id: "6", keys: ["cmd", ","], label: "Settings", action: () => {} },
      ],
    },
    {
      name: "Input",
      hotkeys: [
        { id: "7", keys: ["enter"], label: "Send Message", action: () => {} },
        { id: "8", keys: ["shift", "enter"], label: "New Line", action: () => {} },
        { id: "9", keys: ["/"], label: "Slash Commands", action: () => {} },
        { id: "10", keys: ["@"], label: "Mention Context", action: () => {} },
      ],
    },
  ];

  const notifications: Notification[] = [
    { id: "1", type: "success", title: "Task Completed", message: "Your AI agent finished processing the data.", timestamp: new Date("2024-01-01T10:00:00"), read: false },
    { id: "2", type: "info", title: "New Model Available", message: "GPT-5 is now available for testing.", timestamp: new Date("2024-01-01T09:00:00"), read: false },
    { id: "3", type: "warning", title: "Token Limit Warning", message: "You've used 90% of your monthly token allocation.", timestamp: new Date("2024-01-01T08:00:00"), read: true },
    { id: "4", type: "error", title: "API Error", message: "Failed to connect to the AI service. Retrying...", timestamp: new Date("2024-01-01T07:00:00"), read: true },
  ];

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Dynamic Form"
        description="Generate forms dynamically from JSON schema"
      >
        <div className="max-w-lg">
          <DynamicForm
            schema={formSchema}
            onSubmit={(data) => console.log("Form submitted:", data)}
            onCancel={() => console.log("Form cancelled")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Keyboard Shortcuts"
        description="Display keyboard shortcuts with visual keys"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <ShortcutHint keys={["cmd", "k"]} label="Command Palette" />
            <ShortcutHint keys={["cmd", "b"]} label="Toggle Sidebar" />
            <ShortcutHint keys={["cmd", "n"]} label="New Chat" />
          </div>
          <Button variant="outline" onClick={() => setHotkeyDialogOpen(true)}>
            View All Shortcuts
          </Button>
          <HotkeyHelpDialog
            open={hotkeyDialogOpen}
            onOpenChange={setHotkeyDialogOpen}
            categories={hotkeyCategories}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Notification Center"
        description="Manage and view notifications"
      >
        <NotificationCenter
          notifications={notifications}
          onRead={(id) => console.log("Mark read:", id)}
          onDelete={(id) => console.log("Delete:", id)}
          onClearAll={() => console.log("Clear all")}
        />
      </ComponentCard>

      <ComponentCard
        title="User Avatars"
        description="Display user and model avatars with status"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <UserAvatar name="John Doe" size="sm" status="online" showTooltip />
            <UserAvatar name="Jane Smith" size="md" status="busy" showTooltip />
            <UserAvatar name="Sam Wilson" size="lg" status="away" showTooltip />
            <UserAvatar name="Alex Johnson" size="xl" status="offline" showTooltip />
          </div>
          <div className="flex items-center gap-4">
            <ModelAvatar model="gpt" size="sm" />
            <ModelAvatar model="claude" size="md" />
            <ModelAvatar model="gemini" size="lg" />
            <ModelAvatar model="llama" size="xl" />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Avatar Group"
        description="Display multiple avatars in a group"
      >
        <AvatarGroup
          users={[
            { name: "Alice", status: "online" },
            { name: "Bob", status: "busy" },
            { name: "Charlie" },
            { name: "Diana", status: "away" },
            { name: "Eve" },
            { name: "Frank", status: "online" },
          ]}
          max={4}
          size="md"
        />
      </ComponentCard>

      <ComponentCard
        title="Sender Display"
        description="Show message sender with metadata"
      >
        <div className="space-y-4">
          <SenderDisplay
            type="user"
            name="John Doe"
            timestamp={new Date("2024-01-01T10:00:00")}
          />
          <SenderDisplay
            type="assistant"
            name="Claude"
            model="claude"
            timestamp={new Date("2024-01-01T10:01:00")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Typing Indicator"
        description="Show when AI is typing"
      >
        <TypingAvatar model="gpt" label="GPT-4 is thinking..." />
      </ComponentCard>

      <ComponentCard
        title="Empty States"
        description="Display empty state messages"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <EmptyChatState
            title="Start a conversation"
            description="Type a message to begin chatting with AI"
          />
          <EmptyState
            icon={<Search className="h-12 w-12" />}
            title="No results found"
            description="Try adjusting your search or filters"
            action={{ label: "Clear filters", onClick: () => {} }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Welcome Screen"
        description="Onboarding welcome screen"
      >
        <WelcomeScreen
          title="Welcome to AI Chat"
          description="Your intelligent assistant for coding, writing, and more"
          suggestions={[
            { label: "Write code", description: "Generate, explain, or debug code", onClick: () => {} },
            { label: "Analyze data", description: "Get insights from your data", onClick: () => {} },
            { label: "Create content", description: "Write articles, emails, and more", onClick: () => {} },
          ]}
        />
      </ComponentCard>
    </div>
  );
}
