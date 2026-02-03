"use client";

import * as React from "react";
import { DynamicForm, type FormSchema } from "@/components/ai/dynamic-form";
import { HotkeyHelpDialog, ShortcutHint, type HotkeyCategory } from "@/components/ai/hotkeys";
import { NotificationCenter, type Notification } from "@/components/ai/notifications";
import { UserAvatar, ModelAvatar, AvatarGroup, SenderDisplay, TypingAvatar } from "@/components/ai/avatars";
import { EmptyChatState, EmptyState, WelcomeScreen } from "@/components/ai/empty-states";
import { LoadingButton, CopyButton as CopyBtn, FeedbackButtons as FeedbackBtns, ActionButtonGroup, SendButton, GenerateButton, RegenerateButton, ShareButton as ShareBtn } from "@/components/ai/buttons";
import { Actions, CopyButton, FeedbackButtons, MessageActionBar, FeedbackBar, QuickActions } from "@/components/ai/actions";
import { StatusBadge, StatusDot, OnlineStatus, ConnectionStatus, SystemHealth, ActivityIndicator } from "@/components/ai/status";
import { Timestamp, DurationDisplay, LiveTimer, LastUpdated, MessageTimestamp } from "@/components/ai/timestamp";
import { ScrollButton, ScrollToBottom, NewMessagesIndicator } from "@/components/ai/scroll-button";
import { DatePicker, TimeAgo } from "@/components/ai/date-picker";
import { EmojiPicker, EmojiReaction } from "@/components/ai/emoji-picker";
import { ColorPicker, ColorSwatch } from "@/components/ai/color-picker";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";
import { Search, Wifi, Server } from "lucide-react";

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
          avatars={[
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
            role="user"
            name="John Doe"
            timestamp={new Date("2024-01-01T10:00:00")}
          />
          <SenderDisplay
            role="assistant"
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
        <TypingAvatar model="gpt" name="GPT-4" />
      </ComponentCard>

      <ComponentCard
        title="Empty States"
        description="Display empty state messages"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <EmptyChatState
            onNewChat={() => console.log("New chat")}
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
          subtitle="Your intelligent assistant for coding, writing, and more"
          suggestions={[
            { text: "Write code - Generate, explain, or debug code", onClick: () => {} },
            { text: "Analyze data - Get insights from your data", onClick: () => {} },
            { text: "Create content - Write articles, emails, and more", onClick: () => {} },
          ]}
        />
      </ComponentCard>

      {/* Buttons */}
      <ComponentCard
        title="Action Buttons"
        description="Specialized buttons for AI interactions"
      >
        <div className="flex flex-wrap gap-3">
          <LoadingButton loading={false} onClick={() => {}}>Submit</LoadingButton>
          <LoadingButton loading={true} onClick={() => {}}>Processing...</LoadingButton>
          <CopyButton text="Hello World" />
          <SendButton onClick={() => {}} />
          <GenerateButton onClick={() => {}} />
          <RegenerateButton onClick={() => {}} />
          <ShareBtn onShare={() => {}} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Feedback Buttons"
        description="Collect user feedback on AI responses"
      >
        <FeedbackBtns
          onLike={() => console.log("Liked")}
          onDislike={() => console.log("Disliked")}
        />
      </ComponentCard>

      <ComponentCard
        title="Action Button Group"
        description="Grouped action buttons with menu"
      >
        <ActionButtonGroup
          actions={[
            { id: "copy", label: "Copy", onClick: () => console.log("Copy"), icon: <span>📋</span> },
            { id: "share", label: "Share", onClick: () => console.log("Share"), icon: <span>📤</span> },
            { id: "download", label: "Download", onClick: () => console.log("Download"), icon: <span>⬇️</span> },
          ]}
        />
      </ComponentCard>

      {/* Status Indicators */}
      <ComponentCard
        title="Status Badges"
        description="Visual status indicators"
      >
        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Success" />
          <StatusBadge status="error" label="Error" />
          <StatusBadge status="warning" label="Warning" />
          <StatusBadge status="info" label="Info" />
          <StatusBadge status="pending" label="Pending" />
          <StatusBadge status="idle" label="Idle" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Status Dots"
        description="Minimal status indicators"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <StatusDot status="success" />
            <span className="text-sm">Success</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="error" />
            <span className="text-sm">Error</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="warning" pulse />
            <span className="text-sm">Warning (pulse)</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="pending" />
            <span className="text-sm">Pending</span>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Connection Status"
        description="Network connection indicator"
      >
        <div className="flex gap-4">
          <ConnectionStatus status="connected" />
          <ConnectionStatus status="connecting" />
          <ConnectionStatus status="disconnected" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="System Health"
        description="Monitor system service status"
      >
        <SystemHealth
          services={[
            { name: "API Server", status: "healthy" },
            { name: "Database", status: "healthy" },
            { name: "Cache", status: "degraded" },
            { name: "AI Model", status: "down" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Activity Indicator"
        description="Show ongoing activity"
      >
        <div className="flex items-center gap-4">
          <ActivityIndicator isActive={true} label="Processing" />
          <ActivityIndicator isActive={false} label="Idle" />
        </div>
      </ComponentCard>

      {/* Timestamps */}
      <ComponentCard
        title="Timestamps"
        description="Display dates and times"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">Relative:</span>
            <Timestamp date={new Date(Date.now() - 60000)} format="relative" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">Absolute:</span>
            <Timestamp date={new Date()} format="absolute" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">Message:</span>
            <MessageTimestamp date={new Date()} edited />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-32">Last Updated:</span>
            <LastUpdated date={new Date(Date.now() - 3600000)} />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Duration & Timer"
        description="Display durations and live timers"
      >
        <div className="flex items-center gap-6">
          <DurationDisplay seconds={3661} />
          <LiveTimer startTime={new Date(Date.now() - 30000)} />
        </div>
      </ComponentCard>

      {/* Date & Time Pickers */}
      <ComponentCard
        title="Date Picker"
        description="Select dates with calendar"
      >
        <div className="flex gap-4 flex-wrap">
          <DatePicker
            value={new Date()}
            onChange={(date) => console.log("Date:", date)}
          />
          <TimeAgo date={new Date(Date.now() - 3600000)} />
        </div>
      </ComponentCard>

      {/* Emoji Picker */}
      <ComponentCard
        title="Emoji Picker"
        description="Select emojis and reactions"
      >
        <div className="flex gap-4 items-center">
          <EmojiPicker onSelect={(emoji) => console.log("Emoji:", emoji)} />
          <EmojiReaction
            reactions={[
              { emoji: "👍", count: 5, reacted: true },
              { emoji: "❤️", count: 3, reacted: false },
              { emoji: "🎉", count: 2, reacted: false }
            ]}
            onReact={(emoji) => console.log("React:", emoji)}
          />
        </div>
      </ComponentCard>

      {/* Color Picker */}
      <ComponentCard
        title="Color Picker"
        description="Select colors for customization"
      >
        <div className="flex items-center gap-4">
          <ColorPicker
            value="#3b82f6"
            onChange={(color) => console.log("Color:", color)}
          />
          <ColorSwatch
            colors={["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"]}
            selected="#3b82f6"
            onSelect={(color) => console.log("Swatch color:", color)}
          />
        </div>
      </ComponentCard>

      {/* Scroll Button */}
      <ComponentCard
        title="Scroll to Bottom"
        description="Jump to bottom of chat"
      >
        <div className="relative h-20 border rounded flex items-center justify-center">
          <ScrollToBottom onClick={() => console.log("Scroll to bottom")} />
        </div>
      </ComponentCard>

      {/* Actions Components */}
      <ComponentCard
        title="Actions"
        description="Flexible action buttons with tooltips"
      >
        <div className="space-y-4">
          <Actions
            items={[
              { key: "copy", icon: <span>📋</span>, label: "Copy", tooltip: "Copy to clipboard", onClick: () => console.log("Copy") },
              { key: "edit", icon: <span>✏️</span>, label: "Edit", tooltip: "Edit content", onClick: () => console.log("Edit") },
              { key: "delete", icon: <span>🗑️</span>, label: "Delete", tooltip: "Delete item", onClick: () => console.log("Delete"), danger: true },
            ]}
            direction="horizontal"
            variant="default"
            showLabels
          />
          <Actions
            items={[
              { key: "copy", icon: <span>📋</span>, tooltip: "Copy", onClick: () => {} },
              { key: "share", icon: <span>📤</span>, tooltip: "Share", onClick: () => {} },
              { key: "bookmark", icon: <span>🔖</span>, tooltip: "Bookmark", onClick: () => {} },
            ]}
            direction="horizontal"
            variant="ghost"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Message Action Bar"
        description="Complete action bar for AI messages"
      >
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <p className="text-sm">This is an AI response that you can interact with using the action bar below.</p>
          <MessageActionBar
            content="This is an AI response that you can interact with using the action bar below."
            onCopy={() => console.log("Copied")}
            onRegenerate={() => console.log("Regenerate")}
            onEdit={() => console.log("Edit")}
            onShare={() => console.log("Share")}
            onBookmark={() => console.log("Bookmark")}
            showCopy
            showRegenerate
            showFeedback
            showMore
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Feedback Bar"
        description="Star rating with optional feedback text"
      >
        <div className="space-y-6">
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">Simple Rating</span>
            <FeedbackBar
              variant="simple"
              onFeedback={(rating) => console.log("Rating:", rating)}
            />
          </div>
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">Detailed with Text Input</span>
            <FeedbackBar
              variant="detailed"
              showTextInput
              onFeedback={(rating, feedback) => console.log("Rating:", rating, "Feedback:", feedback)}
            />
          </div>
          <div>
            <span className="text-sm text-muted-foreground mb-2 block">Inline Feedback</span>
            <FeedbackBar
              variant="inline"
              onFeedback={(rating) => console.log("Inline rating:", rating)}
            />
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
