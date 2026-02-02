"use client";

import * as React from "react";
import { MessageBubble } from "@/components/ai/message";
import { ThinkingIndicator, ThinkingSteps } from "@/components/ai/thinking-indicator";
import { ToolCall } from "@/components/ai/tool-call";
import { CitationChip, SourceCard } from "@/components/ai/citation-chip";
import { MarkdownRenderer } from "@/components/ai/markdown-renderer";
import { ChatSidebar, ConversationList } from "@/components/ai/chat-sidebar";
import { ChatContainer, ChatHeader, ChatMessages } from "@/components/ai/chat-container";
import { ExpandableChat, ChatWidget } from "@/components/ai/expandable-chat";
import { Bubble, BubbleList } from "@/components/ai/bubble";
import { Welcome, QuickPrompts, Suggestions } from "@/components/ai/welcome";
import { ConversationsList, ConversationItem } from "@/components/ai/conversations-list";
import { MessageActionsBar, InlineActions } from "@/components/ai/message-actions";
import { MessageEditor } from "@/components/ai/message-editor";
import { InlineCitation } from "@/components/ai/inline-citation";
import { DraftEditor, DraftIndicator, DraftList } from "@/components/ai/message-draft";
import { SystemMessage, DividerMessage, DateDivider, TypingIndicator, NotificationBubble, SystemBubble } from "@/components/ai/system-message";
import { UnreadBadge, NewMessagesBanner, JumpToUnread, ConversationUnreadIndicator } from "@/components/ai/unread-indicator";
import { Conversation, ConversationContent, MessageGroup, OpenInChat, ContextDisplay, Message as ConversationMessage } from "@/components/ai/conversation";
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

      {/* Markdown Rendering */}
      <ComponentCard
        title="Markdown Renderer"
        description="Rich markdown with syntax highlighting"
      >
        <MarkdownRenderer
          content={`# Heading 1
## Heading 2

This is **bold** and *italic* text.

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

- List item 1
- List item 2
- List item 3

> This is a blockquote

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`}
        />
      </ComponentCard>

      {/* Chat Sidebar */}
      <ComponentCard
        title="Chat Sidebar"
        description="Conversation history sidebar"
      >
        <div className="h-[400px] border rounded-lg overflow-hidden">
          <ChatSidebar
            conversations={[
              { id: "1", title: "React Best Practices", lastMessage: "Thanks for the help!", timestamp: new Date(), unread: 0 },
              { id: "2", title: "API Design Discussion", lastMessage: "Let me explain...", timestamp: new Date(Date.now() - 3600000), unread: 2 },
              { id: "3", title: "Code Review", lastMessage: "Looks good!", timestamp: new Date(Date.now() - 86400000), unread: 0 },
            ]}
            selectedId="1"
            onSelect={(id) => console.log("Selected:", id)}
            onNewChat={() => console.log("New chat")}
          />
        </div>
      </ComponentCard>

      {/* Conversations List */}
      <ComponentCard
        title="Conversations List"
        description="Filterable conversation list"
      >
        <ConversationsList
          conversations={[
            { id: "1", title: "Project Planning", preview: "Let's discuss the timeline", date: new Date(), pinned: true },
            { id: "2", title: "Bug Investigation", preview: "I found the issue", date: new Date(Date.now() - 7200000) },
            { id: "3", title: "Feature Request", preview: "Can you add...", date: new Date(Date.now() - 86400000) },
          ]}
          onSelect={(id) => console.log("Selected:", id)}
          onDelete={(id) => console.log("Delete:", id)}
          onPin={(id) => console.log("Pin:", id)}
        />
      </ComponentCard>

      {/* Bubble Messages */}
      <ComponentCard
        title="Chat Bubbles"
        description="Alternative bubble-style messages"
      >
        <BubbleList
          items={[
            { key: "1", role: "user", content: "What's the weather like?" },
            { key: "2", role: "ai", content: "I'd be happy to help with weather information! However, I don't have access to real-time weather data. You can check weather.com or your local weather service." },
          ]}
        />
      </ComponentCard>

      {/* Welcome & Prompts */}
      <ComponentCard
        title="Welcome Component"
        description="Onboarding with quick prompts"
      >
        <Welcome
          title="How can I help you today?"
          subtitle="I'm an AI assistant ready to help with coding, writing, and more."
        >
          <QuickPrompts
            prompts={[
              { label: "Write code", icon: "code", onClick: () => {} },
              { label: "Explain concept", icon: "lightbulb", onClick: () => {} },
              { label: "Debug issue", icon: "bug", onClick: () => {} },
              { label: "Generate ideas", icon: "sparkles", onClick: () => {} },
            ]}
          />
        </Welcome>
      </ComponentCard>

      {/* Message Actions */}
      <ComponentCard
        title="Message Actions Bar"
        description="Action toolbar for messages"
      >
        <MessageActionsBar
          onCopy={() => console.log("Copy")}
          onEdit={() => console.log("Edit")}
          onDelete={() => console.log("Delete")}
          onRegenerate={() => console.log("Regenerate")}
          onShare={() => console.log("Share")}
          onBookmark={() => console.log("Bookmark")}
        />
      </ComponentCard>

      {/* Message Editor */}
      <ComponentCard
        title="Message Editor"
        description="Inline message editing"
      >
        <MessageEditor
          initialContent="This is the original message that can be edited."
          onSave={(content) => console.log("Saved:", content)}
          onCancel={() => console.log("Cancelled")}
        />
      </ComponentCard>

      {/* Inline Citation */}
      <ComponentCard
        title="Inline Citations"
        description="Hover to preview sources"
      >
        <p className="text-foreground">
          The React framework was developed by Facebook <InlineCitation source={{ title: "React History", url: "https://react.dev/blog", snippet: "React was first deployed on Facebook's News Feed in 2011" }} /> and has since become one of the most popular frontend libraries <InlineCitation source={{ title: "Stack Overflow Survey", url: "https://stackoverflow.com/survey", snippet: "React remains the most wanted web framework" }} />.
        </p>
      </ComponentCard>

      {/* Message Draft */}
      <ComponentCard
        title="Message Draft"
        description="Save and restore message drafts"
      >
        <div className="space-y-4">
          <DraftIndicator hasDraft onRestore={() => console.log("Restore draft")} onDiscard={() => console.log("Discard draft")} />
          <MessageDraft
            content="This is a saved draft message that the user was working on..."
            savedAt={new Date(Date.now() - 300000)}
          />
        </div>
      </ComponentCard>

      {/* Expandable Chat Widget */}
      <ComponentCard
        title="Expandable Chat Widget"
        description="Floating chat widget for embedding"
      >
        <div className="h-[400px] relative border rounded-lg overflow-hidden bg-muted/20">
          <div className="absolute bottom-4 right-4">
            <ChatWidget
              title="Support Chat"
              subtitle="We typically reply in a few minutes"
              onSend={(message) => console.log("Send:", message)}
            />
          </div>
        </div>
      </ComponentCard>

      {/* System Messages */}
      <ComponentCard
        title="System Message"
        description="System notifications in chat"
      >
        <div className="space-y-4">
          <SystemMessage
            type="info"
            content="The conversation context has been updated."
          />
          <SystemMessage
            type="warning"
            content="You're approaching your usage limit."
          />
          <SystemMessage
            type="success"
            content="File uploaded successfully."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Dividers"
        description="Visual separators for chat sections"
      >
        <div className="space-y-4">
          <DividerMessage text="New messages below" />
          <DateDivider date={new Date()} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Typing Indicator"
        description="Show when someone is typing"
      >
        <div className="space-y-4">
          <TypingIndicator />
          <TypingIndicator label="Assistant is thinking" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="System Bubbles"
        description="System notifications as bubbles"
      >
        <div className="space-y-4">
          <NotificationBubble
            icon="info"
            title="New feature available"
            description="Check out the new voice input capability"
          />
          <SystemBubble
            content="The model has been updated to the latest version."
          />
        </div>
      </ComponentCard>

      {/* Unread Indicators */}
      <ComponentCard
        title="Unread Badge"
        description="Show unread message count"
      >
        <div className="flex items-center gap-4">
          <UnreadBadge count={3} />
          <UnreadBadge count={99} />
          <UnreadBadge count={150} max={99} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="New Messages Banner"
        description="Alert for new messages"
      >
        <NewMessagesBanner
          count={5}
          onClick={() => console.log("Scroll to new")}
        />
      </ComponentCard>

      <ComponentCard
        title="Jump to Unread"
        description="Quick navigation to unread"
      >
        <JumpToUnread
          count={12}
          onClick={() => console.log("Jump")}
        />
      </ComponentCard>

      <ComponentCard
        title="Conversation Unread"
        description="Unread state for conversation list"
      >
        <div className="space-y-2 max-w-xs">
          <ConversationUnreadIndicator
            title="Team Discussion"
            preview="Hey, did you see the new..."
            unreadCount={3}
            timestamp={new Date()}
          />
          <ConversationUnreadIndicator
            title="Project Updates"
            preview="The deployment is..."
            timestamp={new Date(Date.now() - 3600000)}
          />
        </div>
      </ComponentCard>

      {/* Conversation Components */}
      <ComponentCard
        title="Conversation Container"
        description="Full conversation wrapper with context"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <Conversation>
            <ConversationContent>
              <ConversationMessage from="user">Hello!</ConversationMessage>
              <ConversationMessage from="assistant">Hi there! How can I help you today?</ConversationMessage>
            </ConversationContent>
          </Conversation>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Message Group"
        description="Collapsible message section"
      >
        <MessageGroup title="Assistant Responses" count={3}>
          <div className="space-y-2 text-sm">
            <p>Here&apos;s what I found:</p>
            <p>First, you&apos;ll need to install the dependencies.</p>
            <p>Then, run the build command.</p>
          </div>
        </MessageGroup>
      </ComponentCard>

      <ComponentCard
        title="Open in Chat"
        description="Button to continue conversation in full chat"
      >
        <OpenInChat
          onClick={() => console.log("Open in chat")}
          label="Continue in Chat"
        />
      </ComponentCard>

      <ComponentCard
        title="Context Display"
        description="Show token usage and context window"
      >
        <ContextDisplay
          tokens={1234}
          maxTokens={4096}
          items={[
            { label: "System prompt", tokens: 200 },
            { label: "Conversation", tokens: 834 },
            { label: "Response buffer", tokens: 200 },
          ]}
        />
      </ComponentCard>
    </div>
  );
}
