"use client";

import * as React from "react";
import {
  Bot,
  Code,
  FileText,
  Layers,
  MessageSquare,
  Palette,
  Settings,
  Terminal,
  Workflow,
  Zap,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Package,
  GitBranch,
  Database,
  Search,
  Command,
  PanelLeft,
  BarChart3,
  Table2,
  Bell,
  Keyboard,
  Users,
  Laptop,
  TestTube,
  Link2,
  Boxes,
  Shield,
  Activity,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Import AI Components
import { MessageBubble } from "@/components/ai/message";
import type { Message } from "@/lib/ai-types";
import { ThinkingIndicator, ThinkingSteps } from "@/components/ai/thinking-indicator";
import { ToolCall } from "@/components/ai/tool-call";
import { CitationChip, SourceCard } from "@/components/ai/citation-chip";
import { CodeBlock } from "@/components/ai/code-block";
import { Sandbox } from "@/components/ai/sandbox";
import { FileTree } from "@/components/ai/file-tree";
import { Artifact } from "@/components/ai/artifact";
import { Terminal as TerminalComponent } from "@/components/ai/terminal";
import { WebPreview } from "@/components/ai/web-preview";
import { CodeDiff } from "@/components/ai/code-diff";
import { ChatInput } from "@/components/ai/chat-input";
import { CommandPalette } from "@/components/ai/command-palette";
import { ModelSelector } from "@/components/ai/model-selector";
import { FileUpload } from "@/components/ai/file-upload";
import { SettingsPanel } from "@/components/ai/settings-panel";
import { MCPManager } from "@/components/ai/mcp-manager";
import {
  MessageSkeleton,
  CodeBlockSkeleton,
  ShimmerText,
} from "@/components/ai/skeletons";
import { LoadingDots } from "@/components/ai/animations";
import {
  ConfirmDialog,
  DeleteConfirmDialog,
} from "@/components/ai/confirmation-dialog";
import {
  PromptManager,
  TokenCounter,
  PromptChainBuilder,
  PromptVersionHistory,
  PromptTestingPanel,
  PromptLibrary,
  SystemPromptEditor,
} from "@/components/ai/prompt-manager";
import {
  TokenBreakdownChart,
  TokenOptimizer,
  TokenStatusBadge,
  TokenBudgetAllocator,
  ContextWindowVisualizer,
  TokenCostCalculator,
  TokenUsageHistory,
  CompressionPreview,
  OptimizationSuggestions,
  OptimizerSettings,
} from "@/components/ai/token-optimizer";
import { Queue, Plan, TodoList, type QueueItem, type PlanStep } from "@/components/ai/queue";
import {
  ConversationManager,
  BranchingView,
  CheckpointView,
} from "@/components/ai/conversation-manager";
import {
  AgentStatus,
  SubAgentCard,
  HumanInTheLoop,
  TaskOrchestrator,
} from "@/components/ai/agent";
import {
  SourcesList,
  WebSearchResults,
  LinkPreview,
} from "@/components/ai/sources";
import {
  AudioPlayer,
  MicrophoneInput,
  ImageGallery,
} from "@/components/ai/media";

// Data & Charts
import {
  DataTable,
  type Column,
} from "@/components/ai/data-table";
import {
  StatCard,
  BarChartCard,
  LineChartCard,
  TokenUsage,
  RadialProgress,
  BenchmarkChart,
} from "@/components/ai/charts";

// Dev Tools
import { TestResults } from "@/components/ai/test-results";
import { CommitCard, PullRequestCard, BranchSelector } from "@/components/ai/git-components";
import { EnvVariablesManager } from "@/components/ai/env-variables";

// UI Components
import { DynamicForm, type FormSchema } from "@/components/ai/dynamic-form";
import { HotkeyHelpDialog, ShortcutHint, type HotkeyCategory } from "@/components/ai/hotkeys";
import { NotificationCenter, type Notification } from "@/components/ai/notifications";
import {
  UserAvatar,
  ModelAvatar,
  AvatarGroup,
  SenderDisplay,
  TypingAvatar,
} from "@/components/ai/avatars";
import { EmptyChatState, EmptyState, WelcomeScreen } from "@/components/ai/empty-states";

// Chatbot Clones
import { ChatGPTClone, ClaudeClone, PerplexityClone, GrokClone } from "@/components/ai/chat-clones";

// Diagrams & Generative UI
import { MermaidDiagram } from "@/components/ai/mermaid-diagram";
import { LinkPreview as LinkPreviewCard, RichLinkEmbed, SourceChip } from "@/components/ai/link-preview";
import {
  StreamingText,
  SuggestionChips,
  GeneratedForm,
  ProcessSteps,
  PredictiveAction,
  ApprovalRequest,
  CollapsibleOutput,
  QuickActions,
} from "@/components/ai/generative-ui";
import {
  SimpleTooltip,
  InfoTooltip,
  RichTooltip,
  CodeTooltip,
  ShortcutTooltip,
} from "@/components/ai/rich-tooltip";

// Memory Components
import {
  MemoryCard,
  MemoryManager,
  WorkingMemoryDisplay,
  MemoryTimeline,
  MemoryStats,
} from "@/components/ai/memory";

// Safety & Guardrails
import {
  ModerationBadge,
  ModerationDetails,
  PIIDetectionDisplay,
  FactCheckDisplay,
  SafetyFiltersPanel,
  ContentWarningBanner,
} from "@/components/ai/guardrails";

// Observability & Costs
import { TraceViewer, TraceList, DebugPanel } from "@/components/ai/trace-viewer";
import { CostDisplay, CostSummaryCard, BudgetProgress, ModelPricingTable } from "@/components/ai/cost-tracking";
import { RateLimitBadge, RateLimitProgress, APIUsageDashboard } from "@/components/ai/rate-limiting";

// Collaboration
import {
  LiveCursor,
  CollaboratorAvatars,
  PresenceIndicator,
  CommentThread,
  CommentsPanel,
  VersionHistory,
  ShareDialog as CollaborationShareDialog,
} from "@/components/ai/collaboration";

// Auth Components
import { LoginForm, SignUpForm, PasswordStrength, OTPInput, APIKeyDisplay, ProfileCard, ProfileEditor } from "@/components/ai/auth";

// Dashboards
import {
  TokenOptimizationDashboard,
  AgentTaskDashboard,
  PromptLibraryDashboard,
  ConversationHistoryDashboard,
} from "@/components/ai/dashboards";

// Additional New Components - Corrected imports
import { BranchPicker } from "@/components/ai/branch-picker";
import { ExpandableChat } from "@/components/ai/expandable-chat";
import { AITextarea } from "@/components/ai/ai-textarea";
import { PersonaCard, PersonaSelector, PersonaBadge } from "@/components/ai/persona";
import { SuggestionChip, SuggestionGrid, CategorySuggestions } from "@/components/ai/suggestion-chips";
import { PresetCard, PresetList, PresetEditor } from "@/components/ai/presets";
import { BookmarkCard, BookmarkList, BookmarkButton } from "@/components/ai/bookmarks";
import { ApprovalCard, ApprovalQueue, ApprovalWorkflow } from "@/components/ai/human-in-loop";
import { AnimatedBeam, AnimatedBeamMultiple, IntegrationBeamDiagram, FlowBeam } from "@/components/ai/animated-beam";
import { AIPromptPanel } from "@/components/ai/ai-prompt-panel";
import { ShareDialog, ShareLinkCard, EmbedCodeBlock } from "@/components/ai/share";
import { ContentPartText, ContentPartImage, ContentPartCode } from "@/components/ai/content-parts";
import { VoiceButton, VoiceRecorder, TextToSpeechButton, VoiceVisualizer, VoiceInputField } from "@/components/ai/voice-button";
import { AudioPlayer as AudioPlayerNew, AudioActionButton } from "@/components/ai/audio-player";
import { Particles, Sparkles as SparklesParticle, Meteors, GridPattern, DotPattern, FloatingParticles } from "@/components/ai/particles";
import { MessageActionsBar, ActionButton as ActionBtn } from "@/components/ai/message-actions";

// NEW Enhanced Animated Components
import {
  Ripple,
  Magnetic,
  CardTilt,
  LiquidButton,
  Dock,
  MouseTrail,
  Gooey,
} from "@/components/ai/interactive-animations";
import {
  Typewriter,
  TextReveal,
  FlipText,
  ScrambleText,
  AnimatedGradientText,
  SplitText,
  NumberTicker,
  MorphingText,
  GlitchText,
} from "@/components/ai/text-animations";
import {
  AuroraBackground,
  GradientMesh,
  NoiseTexture,
  AnimatedWaves,
  RadialGradient,
  SpotlightGrid,
  AnimatedGrid,
  RetroGrid,
  Starfield,
} from "@/components/ai/background-animations";
import {
  Marquee,
  Confetti,
  ScrollProgress,
  Parallax,
  StackedCards,
  AnimatedTabs,
  InfiniteCarousel,
  RevealOnScroll,
  BentoGrid,
} from "@/components/ai/ui-pattern-animations";
import { MessageEditor, EditableMessage } from "@/components/ai/message-editor";
import { MessageReactions, ReactionPicker, ReactionList, QuickReactionBar } from "@/components/ai/reactions";
import { MessageStatusIndicator, ReadReceiptAvatars, TypingStatus, OnlineStatusIndicator } from "@/components/ai/read-receipts";
import { ThreadReply, ThreadView, ReplyInput } from "@/components/ai/thread-replies";
import { PinnedMessage, PinnedMessagesList, PinnedMessageBanner } from "@/components/ai/pinned-messages";
import { SearchBar, SearchResultsList, HighlightedText } from "@/components/ai/search-messages";
import { MentionInput, MentionList, MentionBadge } from "@/components/ai/mentions";
import { ImageGenerationCard, ImageGenerationPreview, ImageGenerationProgress } from "@/components/ai/image-generation";
import { QuickReplyBar, QuickReplyChip, QuickReplyEditor } from "@/components/ai/quick-replies";
import { ForwardDialog, ForwardPreview } from "@/components/ai/message-forwarding";
import { ScheduledMessageCard, SchedulePickerDialog, ScheduledList } from "@/components/ai/scheduled-messages";
import { PresenceDot, UserPresence, PresenceList, TypingAwareness, WhosHere, ConnectionStatusIndicator } from "@/components/ai/presence";
import { ChatErrorBoundary, ErrorFallback, RetryableError, NetworkErrorCard } from "@/components/ai/error-boundary";
import { MessageGroup, DateSeparator, UnreadDivider, TimeGroup } from "@/components/ai/message-grouping";
import { RetryButton, RetryableRequest, OfflineIndicator, PendingQueue } from "@/components/ai/retry-logic";
import { TranslationBadge, LanguageSelector, TranslatedContent } from "@/components/ai/translation";
import { UnreadBadge, NewMessagesBanner, JumpToUnread } from "@/components/ai/unread-indicator";

const componentCategories = [
  {
    id: "chat",
    label: "Chat & Messages",
    icon: MessageSquare,
    description: "Core chat interface components",
  },
  {
    id: "code",
    label: "Code & Preview",
    icon: Code,
    description: "Code blocks, diffs, and live previews",
  },
  {
    id: "input",
    label: "Input & Commands",
    icon: Command,
    description: "Advanced input with palettes",
  },
  {
    id: "agent",
    label: "Agent & Tools",
    icon: Bot,
    description: "Tool calling and agent workflows",
  },
  {
    id: "canvas",
    label: "Canvas & Workflow",
    icon: Workflow,
    description: "Node-based visual editors",
  },
  {
    id: "management",
    label: "Management",
    icon: Settings,
    description: "Settings, prompts, and queues",
  },
  {
    id: "prompts",
    label: "Prompt Tooling",
    icon: FileText,
    description: "Prompt chains, testing, and versioning",
  },
  {
    id: "tokens",
    label: "Token Management",
    icon: Zap,
    description: "Budget, optimization, and cost tracking",
  },
  {
    id: "media",
    label: "Media & Sources",
    icon: FileText,
    description: "Audio, images, and citations",
  },
  {
    id: "loaders",
    label: "Loaders & States",
    icon: Zap,
    description: "Skeletons and loading states",
  },
  {
    id: "data",
    label: "Data & Charts",
    icon: BarChart3,
    description: "Tables, charts, and visualizations",
  },
  {
    id: "dev",
    label: "Dev Tools",
    icon: TestTube,
    description: "Git, tests, and env variables",
  },
  {
    id: "ui",
    label: "UI Components",
    icon: Keyboard,
    description: "Forms, hotkeys, and notifications",
  },
  {
    id: "clones",
    label: "Chat Clones",
    icon: Laptop,
    description: "ChatGPT, Claude, Perplexity, Grok",
  },
  {
    id: "diagrams",
    label: "Diagrams & Links",
    icon: Link2,
    description: "Mermaid, link previews, tooltips",
  },
  {
    id: "generative",
    label: "Generative UI",
    icon: Boxes,
    description: "Streaming, suggestions, approvals",
  },
  {
    id: "memory",
    label: "Memory & Context",
    icon: Database,
    description: "Memory management and persistence",
  },
  {
    id: "safety",
    label: "Safety & Guardrails",
    icon: Shield,
    description: "Moderation, PII, fact-checking",
  },
  {
    id: "observability",
    label: "Observability",
    icon: Activity,
    description: "Traces, costs, rate limits",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Users,
    description: "Real-time cursors, comments",
  },
  {
    id: "auth",
    label: "Auth & Profile",
    icon: User,
    description: "Login, signup, profile management",
  },
  // Dashboards Section
  {
    id: "dashboard-token",
    label: "Token Dashboard",
    icon: Zap,
    description: "Token optimization & observability",
  },
  {
    id: "dashboard-agent",
    label: "Agent Dashboard",
    icon: Bot,
    description: "Agentic task management",
  },
  {
    id: "dashboard-prompt",
    label: "Prompt Dashboard",
    icon: FileText,
    description: "Prompt library & management",
  },
  {
    id: "dashboard-context",
    label: "Context Dashboard",
    icon: Database,
    description: "Conversation history & memory",
  },
  // Additional Component Categories
  {
    id: "realtime",
    label: "Real-time Features",
    icon: Activity,
    description: "Presence, typing, reactions",
  },
  {
    id: "messaging",
    label: "Advanced Messaging",
    icon: MessageSquare,
    description: "Threads, pins, search, forward",
  },
  {
    id: "voice",
    label: "Voice & Audio",
    icon: Activity,
    description: "Speech-to-text, TTS, recording",
  },
  {
    id: "visual",
    label: "Visual Effects",
    icon: Sparkles,
    description: "Particles, beams, animations",
  },
  {
    id: "interactive-fx",
    label: "Interactive Effects",
    icon: Sparkles,
    description: "Ripple, magnetic, 3D tilt effects",
  },
  {
    id: "text-fx",
    label: "Text Animations",
    icon: FileText,
    description: "Typewriter, reveal, morphing text",
  },
  {
    id: "background-fx",
    label: "Background Effects",
    icon: Layers,
    description: "Aurora, gradients, patterns",
  },
  {
    id: "ui-patterns",
    label: "UI Patterns",
    icon: Boxes,
    description: "Marquee, tabs, carousels",
  },
];

export default function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("chat");
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-sidebar transition-transform lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">AI Components</h1>
              <p className="text-xs text-muted-foreground">React Library</p>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {componentCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <category.icon className="h-5 w-5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{category.label}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeCategory === category.id && "rotate-90"
                    )}
                  />
                </button>
              ))}
            </nav>

            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-accent" />
                <span className="font-medium text-sm">Install</span>
              </div>
              <code className="text-xs text-muted-foreground block break-all">
                npm install @ai-chat/components
              </code>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container max-w-6xl py-8 px-4 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {componentCategories.find((c) => c.id === activeCategory)?.label}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {componentCategories.find((c) => c.id === activeCategory)?.label} Components
            </h2>
            <p className="text-lg text-muted-foreground">
              {componentCategories.find((c) => c.id === activeCategory)?.description}
            </p>
          </header>

          {/* Component Sections */}
          <div className="space-y-12">
            {activeCategory === "chat" && <ChatComponents />}
            {activeCategory === "code" && <CodeComponents />}
            {activeCategory === "input" && <InputComponents />}
            {activeCategory === "agent" && <AgentComponents />}
            {activeCategory === "canvas" && <CanvasComponents />}
            {activeCategory === "management" && <ManagementComponents />}
            {activeCategory === "media" && <MediaComponents />}
            {activeCategory === "loaders" && <LoaderComponents />}
            {activeCategory === "data" && <DataComponents />}
            {activeCategory === "dev" && <DevToolsComponents />}
            {activeCategory === "ui" && <UIComponents />}
            {activeCategory === "clones" && <CloneComponents />}
            {activeCategory === "diagrams" && <DiagramComponents />}
            {activeCategory === "generative" && <GenerativeComponents />}
            {activeCategory === "memory" && <MemoryComponents />}
            {activeCategory === "safety" && <SafetyComponents />}
            {activeCategory === "observability" && <ObservabilityComponents />}
            {activeCategory === "collaboration" && <CollaborationComponents />}
{activeCategory === "auth" && <AuthComponents />}
  {activeCategory === "prompts" && <PromptToolingComponents />}
  {activeCategory === "tokens" && <TokenManagementComponents />}
  {/* Dashboards */}
  {activeCategory === "dashboard-token" && <DashboardTokenSection />}
  {activeCategory === "dashboard-agent" && <DashboardAgentSection />}
  {activeCategory === "dashboard-prompt" && <DashboardPromptSection />}
  {activeCategory === "dashboard-context" && <DashboardContextSection />}
  {/* Additional Component Categories */}
  {activeCategory === "realtime" && <RealtimeComponents />}
  {activeCategory === "messaging" && <AdvancedMessagingComponents />}
  {activeCategory === "voice" && <VoiceComponents />}
  {activeCategory === "visual" && <VisualEffectsComponents />}
  {activeCategory === "interactive-fx" && <InteractiveFxComponents />}
  {activeCategory === "text-fx" && <TextFxComponents />}
  {activeCategory === "background-fx" && <BackgroundFxComponents />}
  {activeCategory === "ui-patterns" && <UIPatternsComponents />}
  </div>
        </div>
      </main>
    </div>
  );
}

// Component Section: Chat
function ChatComponents() {
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
              timestamp: new Date(),
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
              timestamp: new Date(),
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
          <p className="text-foreground">
            According to recent studies <CitationChip index={1} title="AI Research 2024" url="https://example.com" />,
            large language models have shown significant improvements in reasoning tasks <CitationChip index={2} title="LLM Benchmarks" />.
          </p>
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

// Component Section: Code
function CodeComponents() {
  const sampleCode = `import React from 'react';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}

export default Button;`;

  const oldCode = `function greet(name) {
  console.log("Hello " + name);
}`;

  const newCode = `function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}`;

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Code Block"
        description="Syntax highlighted code with actions"
      >
        <CodeBlock
          code={sampleCode}
          language="tsx"
          filename="Button.tsx"
          showLineNumbers
          highlightLines={[4, 5, 6]}
          onCopy={() => console.log("Copied")}
        />
      </ComponentCard>

      <ComponentCard
        title="Sandbox"
        description="Code execution with output"
      >
        <Sandbox
          title="React Component"
          status="success"
          files={[
            { name: "App.tsx", content: sampleCode, language: "tsx" },
            { name: "styles.css", content: ".btn { padding: 8px 16px; }", language: "css" },
          ]}
          output="Component rendered successfully"
        />
      </ComponentCard>

      <ComponentCard
        title="Code Diff"
        description="Side-by-side and unified diff views"
      >
        <CodeDiff
          oldCode={oldCode}
          newCode={newCode}
          language="typescript"
          oldTitle="Before"
          newTitle="After"
        />
      </ComponentCard>

      <ComponentCard
        title="Terminal"
        description="Interactive terminal component"
      >
        <TerminalComponent
          lines={[
            { type: "input", content: "npm install @ai-chat/components" },
            { type: "output", content: "Installing dependencies..." },
            { type: "success", content: "Successfully installed 42 packages" },
            { type: "input", content: "npm run dev" },
            { type: "output", content: "Starting development server..." },
            { type: "info", content: "Ready on http://localhost:3000" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="File Tree"
        description="Navigable file structure"
      >
        <FileTree
          files={[
            {
              id: "1",
              name: "src",
              type: "directory",
              children: [
                { id: "2", name: "components", type: "directory", children: [
                  { id: "3", name: "Button.tsx", type: "file" },
                  { id: "4", name: "Card.tsx", type: "file" },
                ]},
                { id: "5", name: "App.tsx", type: "file" },
                { id: "6", name: "index.tsx", type: "file" },
              ],
            },
            { id: "7", name: "package.json", type: "file" },
            { id: "8", name: "tsconfig.json", type: "file" },
          ]}
          onSelect={(file) => console.log("Selected:", file)}
        />
      </ComponentCard>

      <ComponentCard
        title="Web Preview"
        description="Embedded web content preview"
      >
        <WebPreview
          url="https://example.com"
          title="Example Website"
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Input
function InputComponents() {
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

// Component Section: Agent
function AgentComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Agent Status"
        description="Display agent state and progress"
      >
        <div className="space-y-4">
          <AgentStatus
            name="Research Agent"
            status="running"
            currentTask="Analyzing documents"
            progress={65}
            stepsCompleted={3}
            totalSteps={5}
          />
          <AgentStatus
            name="Code Assistant"
            status="idle"
            description="Ready to help with coding tasks"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Sub-Agent Cards"
        description="Display delegated agent tasks"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SubAgentCard
            name="Data Analyzer"
            status="completed"
            task="Process CSV data"
            result="Found 1,234 records"
            duration={2500}
          />
          <SubAgentCard
            name="Web Scraper"
            status="running"
            task="Fetch product prices"
            progress={45}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Human in the Loop"
        description="Request user approval for actions"
      >
        <HumanInTheLoop
          title="Confirm Database Update"
          description="The agent wants to update 150 records in the users table."
          action="UPDATE users SET status = 'active' WHERE last_login > '2024-01-01'"
          type="warning"
          onApprove={() => console.log("Approved")}
          onReject={() => console.log("Rejected")}
          onModify={(modified) => console.log("Modified:", modified)}
        />
      </ComponentCard>

      <ComponentCard
        title="Task Orchestrator"
        description="Manage multiple agent tasks"
      >
        <TaskOrchestrator
          tasks={[
            { id: "1", name: "Research", status: "completed", agent: "Research Agent" },
            { id: "2", name: "Analysis", status: "running", agent: "Data Agent", progress: 60 },
            { id: "3", name: "Report", status: "pending", agent: "Writer Agent" },
          ]}
          onPause={(id) => console.log("Pause:", id)}
          onResume={(id) => console.log("Resume:", id)}
          onCancel={(id) => console.log("Cancel:", id)}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Canvas
function CanvasComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Artifact"
        description="Display generated content artifacts"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Artifact
            type="code"
            title="API Handler"
            language="typescript"
            content={`export async function handler(req: Request) {
  const data = await req.json();
  return Response.json({ success: true });
}`}
          />
          <Artifact
            type="document"
            title="Project Proposal"
            content="# Project Overview\n\nThis document outlines the key objectives and milestones for Q1 2024."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Plan Execution"
        description="Step-by-step execution plan"
      >
        <Plan
          title="Build Feature"
          steps={[
            { id: "1", title: "Setup environment", status: "completed", duration: 1200 },
            { id: "2", title: "Install dependencies", status: "completed", duration: 3400 },
            { id: "3", title: "Create components", status: "running", description: "Building React components" },
            { id: "4", title: "Write tests", status: "pending" },
            { id: "5", title: "Deploy", status: "pending" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Branching View"
        description="Manage conversation branches"
      >
        <BranchingView
          branches={[
            { id: "main", name: "Main", messageId: "1", createdAt: new Date(), isActive: true },
            { id: "alt-1", name: "Alternative approach", messageId: "5", createdAt: new Date(Date.now() - 3600000) },
            { id: "alt-2", name: "Simplified version", messageId: "8", createdAt: new Date(Date.now() - 7200000) },
          ]}
          onSelect={(id) => console.log("Selected branch:", id)}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Management
function ManagementComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Settings Panel"
        description="Comprehensive settings interface"
      >
        <SettingsPanel
          settings={{
            theme: "dark",
            model: "gpt-4",
            temperature: 0.7,
            maxTokens: 4096,
            streamResponse: true,
            showThinking: true,
          }}
          onSettingsChange={(settings) => console.log("Settings:", settings)}
        />
      </ComponentCard>

      <ComponentCard
        title="Queue & Tasks"
        description="Manage pending operations"
      >
        <Queue
          items={[
            { id: "1", title: "Generate report", status: "running", progress: 45, createdAt: new Date() },
            { id: "2", title: "Process images", status: "pending", createdAt: new Date() },
            { id: "3", title: "Send notifications", status: "completed", createdAt: new Date(Date.now() - 60000), completedAt: new Date(), startedAt: new Date(Date.now() - 60000) },
          ]}
          onRemove={(id) => console.log("Remove:", id)}
          onRetry={(id) => console.log("Retry:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Todo List"
        description="Task management within chat"
      >
        <TodoList
          items={[
            { id: "1", text: "Review pull request", completed: true, priority: "high" },
            { id: "2", text: "Update documentation", completed: false, priority: "medium" },
            { id: "3", text: "Write unit tests", completed: false, priority: "low" },
          ]}
          onToggle={(id) => console.log("Toggle:", id)}
          onRemove={(id) => console.log("Remove:", id)}
          onAdd={(text) => console.log("Add:", text)}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Counter"
        description="Track token usage"
      >
        <div className="space-y-4">
          <TokenCounter text="This is a sample text to count tokens." maxTokens={4096} />
          <TokenCounter text={"A".repeat(3000)} maxTokens={4096} />
          <TokenCounter text={"A".repeat(3800)} maxTokens={4096} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Confirmation Dialogs"
        description="Confirm destructive actions"
      >
        <div className="flex gap-4">
          <ConfirmDialog
            title="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            onConfirm={() => console.log("Confirmed")}
            trigger={<Button variant="outline">Open Confirm</Button>}
          />
          <DeleteConfirmDialog
            itemName="conversation"
            onDelete={() => console.log("Deleted")}
            trigger={<Button variant="destructive">Delete</Button>}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Media
function MediaComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Sources List"
        description="Display search results and sources"
      >
        <SourcesList
          sources={[
            { id: "1", title: "React Documentation", url: "https://react.dev", description: "Official React documentation", favicon: "https://react.dev/favicon.ico" },
            { id: "2", title: "Next.js Guide", url: "https://nextjs.org", description: "The React Framework for the Web" },
            { id: "3", title: "TypeScript Handbook", url: "https://typescriptlang.org", description: "Learn TypeScript from the ground up" },
          ]}
          onSourceClick={(source) => console.log("Clicked:", source)}
        />
      </ComponentCard>

      <ComponentCard
        title="Web Search Results"
        description="Display web search results"
      >
        <WebSearchResults
          query="React best practices"
          results={[
            { id: "1", title: "React Best Practices 2024", url: "https://example.com/react", snippet: "Learn the latest React patterns and best practices for building modern applications..." },
            { id: "2", title: "Clean Code in React", url: "https://example.com/clean", snippet: "Discover how to write maintainable and scalable React code..." },
          ]}
          isLoading={false}
        />
      </ComponentCard>

      <ComponentCard
        title="Link Preview"
        description="Rich link previews"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <LinkPreview
            url="https://github.com"
            title="GitHub"
            description="Where the world builds software"
            image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          />
          <LinkPreview
            url="https://vercel.com"
            title="Vercel"
            description="Develop. Preview. Ship."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Audio Player"
        description="Music-style audio playback"
      >
        <AudioPlayer
          src="https://example.com/audio.mp3"
          title="Sample Track"
          artist="AI Generated"
          coverArt="https://via.placeholder.com/300"
        />
      </ComponentCard>

      <ComponentCard
        title="Microphone Input"
        description="Voice input with visualization"
      >
        <MicrophoneInput
          onTranscript={(text) => console.log("Transcript:", text)}
          onRecordingStart={() => console.log("Recording started")}
          onRecordingStop={() => console.log("Recording stopped")}
        />
      </ComponentCard>

      <ComponentCard
        title="Image Gallery"
        description="Display image collections"
      >
        <ImageGallery
          images={[
            { id: "1", src: "https://picsum.photos/400/300?1", alt: "Image 1", caption: "Generated image 1" },
            { id: "2", src: "https://picsum.photos/400/300?2", alt: "Image 2", caption: "Generated image 2" },
            { id: "3", src: "https://picsum.photos/400/300?3", alt: "Image 3", caption: "Generated image 3" },
            { id: "4", src: "https://picsum.photos/400/300?4", alt: "Image 4", caption: "Generated image 4" },
          ]}
          onImageClick={(image) => console.log("Clicked:", image)}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Loaders
function LoaderComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Message Skeleton"
        description="Loading placeholder for messages"
      >
        <div className="space-y-4">
          <MessageSkeleton />
          <MessageSkeleton variant="assistant" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Code Block Skeleton"
        description="Loading placeholder for code"
      >
        <CodeBlockSkeleton lines={8} />
      </ComponentCard>

      <ComponentCard
        title="Shimmer Text"
        description="Animated text loading effect"
      >
        <div className="space-y-4">
          <ShimmerText text="Generating response..." />
          <ShimmerText text="Analyzing your query and preparing a detailed answer..." />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Loading Dots"
        description="Simple animated dots"
      >
        <div className="flex items-center gap-8">
          <LoadingDots />
          <LoadingDots size="lg" />
          <LoadingDots color="accent" />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Data
function DataComponents() {
  const columns: Column<{ id: number; name: string; status: string; tokens: number }>[] = [
    { id: "id", header: "ID", accessorKey: "id", sortable: true },
    { id: "name", header: "Name", accessorKey: "name", sortable: true },
    { id: "status", header: "Status", accessorKey: "status" },
    { id: "tokens", header: "Tokens", accessorKey: "tokens", sortable: true, align: "right" },
  ];

  const tableData = [
    { id: 1, name: "Conversation 1", status: "Active", tokens: 1234 },
    { id: 2, name: "Conversation 2", status: "Completed", tokens: 2456 },
    { id: 3, name: "Conversation 3", status: "Active", tokens: 892 },
    { id: 4, name: "Conversation 4", status: "Paused", tokens: 3210 },
    { id: 5, name: "Conversation 5", status: "Active", tokens: 567 },
  ];

  const chartData = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1900 },
    { name: "Mar", value: 1500 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 1800 },
    { name: "Jun", value: 2400 },
  ];

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Data Table"
        description="Interactive data table with sorting, search, and pagination"
      >
        <DataTable 
          columns={columns} 
          data={tableData}
          selectable
          pagination
          pageSize={3}
        />
      </ComponentCard>

      <ComponentCard
        title="Stat Cards"
        description="Display key metrics with trends"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Conversations"
            value="1,234"
            trend={{ value: 12, direction: "up" }}
            description="from last month"
          />
          <StatCard
            title="Tokens Used"
            value="45.2K"
            trend={{ value: 5, direction: "down" }}
            description="from last month"
          />
          <StatCard
            title="Avg Response Time"
            value="1.2s"
            trend={{ value: 0, direction: "neutral" }}
            description="no change"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Bar Chart"
        description="Visualize data with bar charts"
      >
        <BarChartCard
          title="Monthly Usage"
          description="Token usage over time"
          data={chartData}
          height={250}
        />
      </ComponentCard>

      <ComponentCard
        title="Line Chart"
        description="Track trends with line charts"
      >
        <LineChartCard
          title="Response Times"
          description="Average response time per day"
          data={chartData}
          height={250}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Usage"
        description="Track token consumption"
      >
        <div className="max-w-sm">
          <TokenUsage
            used={3200}
            limit={4096}
            breakdown={{ prompt: 1200, completion: 2000 }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Radial Progress"
        description="Circular progress indicators"
      >
        <div className="flex items-center gap-8">
          <RadialProgress value={75} label="Tasks" />
          <RadialProgress value={45} label="Usage" color="hsl(var(--chart-2))" />
          <RadialProgress value={90} label="Quality" color="hsl(var(--chart-3))" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Benchmark Chart"
        description="Compare model performance"
      >
        <BenchmarkChart
          title="Model Comparison"
          description="Benchmark scores across different models"
          data={[
            { name: "GPT-4", score: 92, baseline: 85 },
            { name: "Claude 3", score: 89, baseline: 85 },
            { name: "Gemini Pro", score: 86, baseline: 85 },
            { name: "Llama 3", score: 82, baseline: 85 },
          ]}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Dev Tools
function DevToolsComponents() {
  const testData = {
    suites: [
      {
        id: "suite-1",
        name: "Authentication Tests",
        filePath: "src/auth.test.ts",
        status: "failed" as const,
        duration: 2340,
        tests: [
          { id: "t1", name: "should login with valid credentials", status: "passed" as const, duration: 120 },
          { id: "t2", name: "should reject invalid password", status: "passed" as const, duration: 85 },
          { id: "t3", name: "should handle session timeout", status: "failed" as const, duration: 450, error: { message: "Expected session to expire after 30 minutes", expected: "null", actual: "{ user: 'test' }" } },
        ],
      },
      {
        id: "suite-2",
        name: "API Integration",
        filePath: "src/api.test.ts",
        status: "passed" as const,
        duration: 1200,
        tests: [
          { id: "t4", name: "GET /users returns list", status: "passed" as const, duration: 200 },
          { id: "t5", name: "POST /users creates user", status: "passed" as const, duration: 180 },
        ],
      },
    ],
    summary: { total: 5, passed: 4, failed: 1, skipped: 0, duration: 3540 },
  };

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Test Results"
        description="Display test suite results with details"
      >
        <TestResults
          data={testData}
          onRunAll={() => console.log("Run all")}
          onRerunFailed={() => console.log("Rerun failed")}
        />
      </ComponentCard>

      <ComponentCard
        title="Commit Card"
        description="Display git commit details"
      >
        <CommitCard
          commit={{
            sha: "a1b2c3d4e5f6789012345678901234567890abcd",
            message: "feat: Add new AI chat components\n\nImplemented message bubbles, thinking indicators, and tool call displays.",
            author: { name: "John Doe", email: "john@example.com" },
            date: new Date(),
            branch: "main",
            files: [
              { path: "src/components/Message.tsx", status: "added", additions: 120, deletions: 0 },
              { path: "src/components/ToolCall.tsx", status: "added", additions: 85, deletions: 0 },
              { path: "src/index.ts", status: "modified", additions: 5, deletions: 2 },
            ],
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Pull Request Card"
        description="Display pull request information"
      >
        <PullRequestCard
          pr={{
            number: 42,
            title: "Add new AI chat components",
            description: "This PR adds a comprehensive set of AI chat components including messages, tool calls, and thinking indicators.",
            author: { name: "Jane Smith" },
            sourceBranch: "feature/ai-components",
            targetBranch: "main",
            status: "open",
            createdAt: new Date(Date.now() - 86400000),
            commits: 5,
            additions: 450,
            deletions: 23,
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Branch Selector"
        description="Select between git branches"
      >
        <BranchSelector
          branches={["main", "develop", "feature/ai-components", "bugfix/login-fix"]}
          currentBranch="main"
          onBranchChange={(branch) => console.log("Selected:", branch)}
        />
      </ComponentCard>

      <ComponentCard
        title="Environment Variables"
        description="Manage project environment variables"
      >
        <EnvVariablesManager
          variables={[
            { id: "1", key: "OPENAI_API_KEY", value: "sk-...abc123", scope: ["production", "preview"], encrypted: true },
            { id: "2", key: "DATABASE_URL", value: "postgresql://...", scope: ["all"] },
            { id: "3", key: "DEBUG_MODE", value: "true", scope: ["development"] },
          ]}
          onAdd={(v) => console.log("Add:", v)}
          onEdit={(id, v) => console.log("Edit:", id, v)}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: UI
function UIComponents() {
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
    { id: "1", type: "success", title: "Task Completed", message: "Your AI agent finished processing the data.", timestamp: new Date(), read: false },
    { id: "2", type: "info", title: "New Model Available", message: "GPT-5 is now available for testing.", timestamp: new Date(Date.now() - 3600000), read: false },
    { id: "3", type: "warning", title: "Token Limit Warning", message: "You've used 90% of your monthly token allocation.", timestamp: new Date(Date.now() - 7200000), read: true },
    { id: "4", type: "error", title: "API Error", message: "Failed to connect to the AI service. Retrying...", timestamp: new Date(Date.now() - 86400000), read: true },
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
            timestamp={new Date()}
          />
          <SenderDisplay
            type="assistant"
            name="Claude"
            model="claude"
            timestamp={new Date()}
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

// Component Section: Clones
function CloneComponents() {
  const sampleMessages = [
    { id: "1", role: "user" as const, content: "What is the best way to learn programming?" },
    { id: "2", role: "assistant" as const, content: "Learning programming effectively involves several key strategies:\n\n1. **Start with fundamentals** - Choose a beginner-friendly language like Python or JavaScript\n2. **Practice daily** - Consistency is more important than long sessions\n3. **Build projects** - Apply what you learn to real problems\n4. **Read other's code** - Learn from open source projects\n5. **Join communities** - Engage with other developers" },
    { id: "3", role: "user" as const, content: "Can you give me a simple Python example?" },
  ];

  return (
    <div className="space-y-8">
      <ComponentCard
        title="ChatGPT Clone"
        description="OpenAI ChatGPT-style interface with dark theme"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ChatGPTClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Claude Clone"
        description="Anthropic Claude-style interface with clean design"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ClaudeClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Perplexity Clone"
        description="Perplexity-style interface with sources"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <PerplexityClone
            messages={[
              ...sampleMessages,
              {
                id: "4",
                role: "assistant" as const,
                content: "Here's a simple Python example that demonstrates basic concepts:",
                sources: [
                  { title: "Python Documentation", url: "https://docs.python.org" },
                  { title: "Real Python", url: "https://realpython.com" },
                ],
              },
            ]}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Grok Clone"
        description="xAI Grok-style interface with personality"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <GrokClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Diagrams
function DiagramComponents() {
  const flowchartCode = `flowchart TD
    A[User Request] --> B{Parse Intent}
    B --> C[Tool Selection]
    B --> D[Direct Response]
    C --> E[Execute Tool]
    E --> F[Format Result]
    D --> G[Generate Response]
    F --> G`;

  const sequenceCode = `sequenceDiagram
    participant U as User
    participant A as AI Assistant
    participant T as Tool
    U->>A: Send message
    A->>A: Process request
    A->>T: Call tool
    T-->>A: Return result
    A->>U: Send response`;

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Mermaid Flowchart"
        description="Render flowchart diagrams with zoom controls"
      >
        <MermaidDiagram
          code={flowchartCode}
          title="AI Request Flow"
          editable
        />
      </ComponentCard>

      <ComponentCard
        title="Sequence Diagram"
        description="Visualize message sequences"
      >
        <MermaidDiagram
          code={sequenceCode}
          title="Chat Interaction"
        />
      </ComponentCard>

      <ComponentCard
        title="Link Preview"
        description="Rich link previews with hover cards"
      >
        <div className="space-y-4">
          <p className="text-sm">
            Check out <LinkPreviewCard
              url="https://github.com/vercel/ai"
              metadata={{
                url: "https://github.com/vercel/ai",
                title: "Vercel AI SDK",
                description: "Build AI-powered applications with React, Next.js, and more",
                siteName: "GitHub",
                type: "github",
              }}
            >the AI SDK</LinkPreviewCard> for building AI applications.
          </p>
          <LinkPreviewCard
            url="https://vercel.com"
            metadata={{
              url: "https://vercel.com",
              title: "Vercel: Build and deploy the best web experiences",
              description: "Vercel's frontend cloud gives developers frameworks, workflows, and infrastructure to build a faster, more personalized web.",
              image: "https://vercel.com/api/www/avatar?u=vercel&s=160",
              siteName: "Vercel",
            }}
            variant="card"
            className="max-w-sm"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Source Chips"
        description="Citation and source references"
      >
        <div className="flex flex-wrap gap-2">
          <SourceChip url="https://react.dev" title="React Documentation" index={1} />
          <SourceChip url="https://nextjs.org" title="Next.js Docs" index={2} />
          <SourceChip url="https://tailwindcss.com" title="Tailwind CSS" index={3} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Rich Tooltips"
        description="Enhanced tooltips with actions and metadata"
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm">With info</span>
            <InfoTooltip content="This is helpful information" variant="info" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Warning</span>
            <InfoTooltip content="This action cannot be undone" variant="warning" />
          </div>
          <RichTooltip
            title="GPT-4 Turbo"
            description="Latest model with improved capabilities"
            metadata={[
              { label: "Context Window", value: "128K tokens" },
              { label: "Training Data", value: "Apr 2024" },
            ]}
            badge={{ label: "New", variant: "default" }}
          >
            <Button variant="outline" size="sm">Hover for details</Button>
          </RichTooltip>
          <CodeTooltip code="const result = await ai.generate({ prompt });" language="typescript">
            <Button variant="outline" size="sm">Code preview</Button>
          </CodeTooltip>
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Generative UI
function GenerativeComponents() {
  const [streamKey, setStreamKey] = React.useState(0);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Streaming Text"
        description="Animate text as if being typed in real-time"
      >
        <div className="space-y-4">
          <StreamingText
            key={streamKey}
            text="The AI SDK provides a powerful set of primitives for building AI-powered applications. It supports streaming responses, tool calling, structured data generation, and seamless integration with popular AI providers."
            speed={15}
            onComplete={() => console.log("Streaming complete")}
          />
          <Button variant="outline" size="sm" onClick={() => setStreamKey((k) => k + 1)}>
            Replay Animation
          </Button>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Suggestion Chips"
        description="AI-generated suggestions for user actions"
      >
        <SuggestionChips
          suggestions={[
            "Explain this code",
            "Write tests",
            "Add documentation",
            "Optimize performance",
            "Fix bugs",
          ]}
          onSelect={(suggestion) => console.log("Selected:", suggestion)}
        />
      </ComponentCard>

      <ComponentCard
        title="Process Steps"
        description="Show multi-step AI processes with status"
      >
        <ProcessSteps
          steps={[
            { id: "1", title: "Analyzing request", description: "Understanding user intent", status: "completed" },
            { id: "2", title: "Searching knowledge base", description: "Finding relevant information", status: "completed" },
            { id: "3", title: "Generating response", description: "Creating comprehensive answer", status: "in-progress" },
            { id: "4", title: "Formatting output", description: "Applying markdown styling", status: "pending" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Predictive Action"
        description="AI suggests next actions based on context"
      >
        <PredictiveAction
          title="Add Error Handling"
          description="The AI detected that this function lacks proper error handling. Would you like to add try-catch blocks and error logging?"
          confidence={0.89}
          onAccept={() => console.log("Accepted")}
          onReject={() => console.log("Rejected")}
          onModify={() => console.log("Modify requested")}
        />
      </ComponentCard>

      <ComponentCard
        title="Human-in-the-Loop Approval"
        description="Request user approval for sensitive operations"
      >
        <ApprovalRequest
          title="Deploy to Production"
          description="The AI is ready to deploy the following changes to your production environment."
          details={[
            { label: "Environment", value: "Production (us-east-1)" },
            { label: "Changes", value: "3 files modified" },
            { label: "Tests", value: "All 47 tests passing" },
          ]}
          preview={
            <div className="text-sm font-mono text-muted-foreground">
              <div>+ app/api/route.ts</div>
              <div>~ lib/utils.ts</div>
              <div>~ package.json</div>
            </div>
          }
          onApprove={() => console.log("Approved")}
          onDeny={() => console.log("Denied")}
          onRequestChanges={(feedback) => console.log("Changes requested:", feedback)}
        />
      </ComponentCard>

      <ComponentCard
        title="Generated Form"
        description="AI-generated forms for collecting user input"
      >
        <div className="max-w-md">
          <GeneratedForm
            title="User Profile"
            description="Please provide your information"
            fields={[
              { id: "name", type: "text", label: "Full Name", placeholder: "John Doe", required: true },
              { id: "email", type: "email", label: "Email", placeholder: "john@example.com", required: true },
              { id: "role", type: "radio", label: "Role", options: [
                { label: "Developer", value: "dev" },
                { label: "Designer", value: "design" },
                { label: "Manager", value: "manager" },
              ]},
              { id: "subscribe", type: "checkbox", label: "Newsletter", placeholder: "Subscribe to updates" },
            ]}
            onSubmit={(data) => console.log("Form data:", data)}
            submitLabel="Save Profile"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Collapsible Output"
        description="Expandable sections for detailed AI output"
      >
        <div className="space-y-3">
          <CollapsibleOutput title="Analysis Results" badge="3 items" defaultExpanded>
            <ul className="space-y-2 text-sm">
              <li>Performance improved by 23%</li>
              <li>Bundle size reduced by 15KB</li>
              <li>No breaking changes detected</li>
            </ul>
          </CollapsibleOutput>
          <CollapsibleOutput title="Debug Logs" badge="12 entries">
            <pre className="text-xs font-mono text-muted-foreground">
              {`[INFO] Starting analysis...
[INFO] Found 5 components
[WARN] Deprecated API usage in Button.tsx
[INFO] Analysis complete`}
            </pre>
          </CollapsibleOutput>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Quick Actions"
        description="Contextual action buttons and cards"
      >
        <div className="space-y-4">
          <QuickActions
            variant="cards"
            actions={[
              { id: "1", label: "Generate Code", description: "Create implementation from spec", icon: <Code className="h-5 w-5" /> },
              { id: "2", label: "Write Tests", description: "Generate unit and integration tests", icon: <TestTube className="h-5 w-5" /> },
              { id: "3", label: "Add Documentation", description: "Create JSDoc and README", icon: <FileText className="h-5 w-5" /> },
              { id: "4", label: "Deploy Changes", description: "Push to staging or production", icon: <Boxes className="h-5 w-5" /> },
            ]}
            onSelect={(action) => console.log("Selected:", action)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Memory
function MemoryComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Memory Card"
        description="Display stored memories and context"
      >
        <div className="space-y-4">
          <MemoryCard
            id="mem-1"
            content="User prefers TypeScript over JavaScript for all projects"
            type="preference"
            timestamp={new Date()}
            relevance={0.95}
          />
          <MemoryCard
            id="mem-2"
            content="Working on an e-commerce project using Next.js"
            type="context"
            timestamp={new Date(Date.now() - 86400000)}
            relevance={0.87}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Memory Manager"
        description="Manage stored memories and knowledge"
      >
        <MemoryManager
          memories={[
            { id: "1", content: "User is a senior developer with 10 years experience", type: "user_info", timestamp: new Date(), tags: ["profile"] },
            { id: "2", content: "Currently building a React Native mobile app", type: "context", timestamp: new Date(), tags: ["project"] },
            { id: "3", content: "Prefers functional programming patterns", type: "preference", timestamp: new Date(), tags: ["style"] },
          ]}
          onEdit={(id, content) => console.log("Edit:", id, content)}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Working Memory Display"
        description="Show active conversation context"
      >
        <WorkingMemoryDisplay
          items={[
            { id: "1", type: "file", content: "App.tsx - Main application component", tokens: 450 },
            { id: "2", type: "conversation", content: "Previous discussion about routing", tokens: 280 },
            { id: "3", type: "context", content: "Using Next.js 14 with App Router", tokens: 120 },
          ]}
          totalTokens={850}
          maxTokens={4096}
        />
      </ComponentCard>

      <ComponentCard
        title="Memory Timeline"
        description="Chronological view of stored memories"
      >
        <MemoryTimeline
          events={[
            { id: "1", timestamp: new Date(), title: "Project started", description: "Initialized Next.js project with TypeScript" },
            { id: "2", timestamp: new Date(Date.now() - 3600000), title: "User preference noted", description: "Prefers Tailwind CSS for styling" },
            { id: "3", timestamp: new Date(Date.now() - 7200000), title: "Context updated", description: "Switched to App Router architecture" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Memory Stats"
        description="Statistics about stored memories"
      >
        <MemoryStats
          stats={{
            total: 47,
            byType: { preference: 12, context: 23, user_info: 8, fact: 4 },
            totalTokens: 3420,
            lastUpdated: new Date(),
          }}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Safety
function SafetyComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Moderation Badge"
        description="Display content moderation status"
      >
        <div className="flex flex-wrap gap-4">
          <ModerationBadge status="safe" />
          <ModerationBadge status="warning" reason="Potentially sensitive topic" />
          <ModerationBadge status="blocked" reason="Content violates policy" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Moderation Details"
        description="Detailed moderation results"
      >
        <ModerationDetails
          categories={{
            hate: { flagged: false, score: 0.02 },
            harassment: { flagged: false, score: 0.01 },
            violence: { flagged: false, score: 0.03 },
            sexual: { flagged: false, score: 0.01 },
            self_harm: { flagged: false, score: 0.00 },
          }}
          overall="safe"
        />
      </ComponentCard>

      <ComponentCard
        title="PII Detection"
        description="Detect and redact personally identifiable information"
      >
        <PIIDetectionDisplay
          text="My email is john.doe@example.com and my phone is 555-0123"
          detectedPII={[
            { type: "email", value: "john.doe@example.com", start: 12, end: 33 },
            { type: "phone", value: "555-0123", start: 51, end: 59 },
          ]}
          onRedact={() => console.log("Redact PII")}
        />
      </ComponentCard>

      <ComponentCard
        title="Fact Checking"
        description="Verify factual claims in AI responses"
      >
        <FactCheckDisplay
          claim="The Earth orbits around the Sun"
          result={{
            verdict: "verified",
            confidence: 0.99,
            sources: [
              { title: "NASA", url: "https://nasa.gov" },
              { title: "Scientific American", url: "https://scientificamerican.com" },
            ],
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Safety Filters Panel"
        description="Configure content safety filters"
      >
        <SafetyFiltersPanel
          filters={{
            blockHate: true,
            blockViolence: true,
            blockSexual: true,
            blockHarassment: true,
            blockSelfHarm: true,
            sensitivityLevel: "medium",
          }}
          onFiltersChange={(filters) => console.log("Filters:", filters)}
        />
      </ComponentCard>

      <ComponentCard
        title="Content Warning Banner"
        description="Display warnings for sensitive content"
      >
        <div className="space-y-4">
          <ContentWarningBanner
            type="warning"
            message="This content discusses sensitive topics"
            onAcknowledge={() => console.log("Acknowledged")}
          />
          <ContentWarningBanner
            type="error"
            message="This content has been blocked due to policy violations"
          />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Observability
function ObservabilityComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Trace Viewer"
        description="Inspect AI request traces and spans"
      >
        <TraceViewer
          trace={{
            id: "trace-123",
            startTime: new Date(Date.now() - 5000),
            endTime: new Date(),
            duration: 5000,
            spans: [
              { id: "span-1", name: "Input processing", startTime: 0, duration: 500, attributes: { tokens: 120 } },
              { id: "span-2", name: "Model inference", startTime: 500, duration: 3800, attributes: { model: "gpt-4" } },
              { id: "span-3", name: "Output formatting", startTime: 4300, duration: 700, attributes: { tokens: 450 } },
            ],
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Trace List"
        description="Browse recent request traces"
      >
        <TraceList
          traces={[
            { id: "1", timestamp: new Date(), duration: 2340, status: "success", model: "gpt-4", tokens: 1200 },
            { id: "2", timestamp: new Date(Date.now() - 60000), duration: 1890, status: "success", model: "claude-3", tokens: 980 },
            { id: "3", timestamp: new Date(Date.now() - 120000), duration: 450, status: "error", model: "gpt-4", error: "Rate limit exceeded" },
          ]}
          onTraceClick={(id) => console.log("View trace:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Debug Panel"
        description="Real-time debugging information"
      >
        <DebugPanel
          data={{
            model: "gpt-4-turbo",
            temperature: 0.7,
            maxTokens: 4096,
            promptTokens: 1200,
            completionTokens: 850,
            totalTokens: 2050,
            latency: 2340,
            timestamp: new Date(),
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Cost Display"
        description="Track API costs and spending"
      >
        <div className="space-y-4">
          <CostDisplay
            amount={0.0234}
            currency="USD"
            breakdown={{ prompt: 0.0120, completion: 0.0114 }}
          />
          <CostSummaryCard
            total={45.67}
            currency="USD"
            period="This month"
            breakdown={[
              { model: "GPT-4", cost: 23.45, percentage: 51 },
              { model: "Claude 3", cost: 15.32, percentage: 34 },
              { model: "Gemini Pro", cost: 6.90, percentage: 15 },
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Budget Progress"
        description="Monitor spending against budget"
      >
        <BudgetProgress
          spent={234.56}
          budget={500}
          period="Monthly"
          alert={false}
        />
      </ComponentCard>

      <ComponentCard
        title="Model Pricing Table"
        description="Compare model costs"
      >
        <ModelPricingTable
          models={[
            { name: "GPT-4 Turbo", inputPrice: 0.01, outputPrice: 0.03, currency: "USD", per: "1K tokens" },
            { name: "Claude 3 Opus", inputPrice: 0.015, outputPrice: 0.075, currency: "USD", per: "1K tokens" },
            { name: "Gemini Pro", inputPrice: 0.0005, outputPrice: 0.0015, currency: "USD", per: "1K tokens" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Rate Limit Indicators"
        description="Display API rate limit status"
      >
        <div className="space-y-4">
          <RateLimitBadge
            remaining={450}
            limit={500}
            resetAt={new Date(Date.now() + 3600000)}
          />
          <RateLimitProgress
            requests={{ used: 450, limit: 500 }}
            tokens={{ used: 45000, limit: 50000 }}
            resetAt={new Date(Date.now() + 3600000)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="API Usage Dashboard"
        description="Comprehensive API usage metrics"
      >
        <APIUsageDashboard
          metrics={{
            requests: { today: 234, week: 1456, month: 5678 },
            tokens: { today: 234000, week: 1456000, month: 5678000 },
            costs: { today: 12.34, week: 67.89, month: 234.56 },
            topModels: [
              { name: "GPT-4", usage: 60 },
              { name: "Claude 3", usage: 30 },
              { name: "Gemini", usage: 10 },
            ],
          }}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Collaboration
function CollaborationComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Live Cursors"
        description="Show real-time cursor positions of collaborators"
      >
        <div className="relative h-40 border border-border rounded-lg bg-muted/20 overflow-hidden">
          <LiveCursor
            user={{ id: "1", name: "Alice", color: "#3b82f6" }}
            position={{ x: 50, y: 30 }}
          />
          <LiveCursor
            user={{ id: "2", name: "Bob", color: "#10b981" }}
            position={{ x: 150, y: 80 }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Collaborator Avatars"
        description="Display active collaborators"
      >
        <CollaboratorAvatars
          users={[
            { id: "1", name: "Alice", avatar: "A", status: "active", color: "#3b82f6" },
            { id: "2", name: "Bob", avatar: "B", status: "active", color: "#10b981" },
            { id: "3", name: "Charlie", avatar: "C", status: "idle", color: "#f59e0b" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Presence Indicator"
        description="Show who's currently viewing"
      >
        <PresenceIndicator
          viewers={[
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "3", name: "Charlie" },
          ]}
          activeUsers={2}
        />
      </ComponentCard>

      <ComponentCard
        title="Comment Thread"
        description="Discussion threads on content"
      >
        <CommentThread
          comments={[
            { id: "1", author: { name: "Alice" }, content: "Should we use TypeScript here?", timestamp: new Date(), replies: [
              { id: "2", author: { name: "Bob" }, content: "Yes, definitely. Type safety is important.", timestamp: new Date() },
            ]},
            { id: "3", author: { name: "Charlie" }, content: "Looks good to me!", timestamp: new Date() },
          ]}
          onReply={(commentId, content) => console.log("Reply:", commentId, content)}
          onResolve={(threadId) => console.log("Resolve:", threadId)}
        />
      </ComponentCard>

      <ComponentCard
        title="Comments Panel"
        description="Sidebar panel for managing comments"
      >
        <CommentsPanel
          comments={[
            { id: "1", author: { name: "Alice" }, content: "Line 42: This could be optimized", timestamp: new Date(), resolved: false, location: "line-42" },
            { id: "2", author: { name: "Bob" }, content: "Great implementation!", timestamp: new Date(), resolved: true, location: "line-15" },
          ]}
          onCommentClick={(id) => console.log("Navigate to:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Version History"
        description="Track changes and revisions"
      >
        <VersionHistory
          versions={[
            { id: "v3", timestamp: new Date(), author: { name: "Alice" }, message: "Added error handling", isCurrent: true },
            { id: "v2", timestamp: new Date(Date.now() - 3600000), author: { name: "Bob" }, message: "Refactored components" },
            { id: "v1", timestamp: new Date(Date.now() - 7200000), author: { name: "Alice" }, message: "Initial implementation" },
          ]}
          onRestore={(id) => console.log("Restore:", id)}
          onCompare={(v1, v2) => console.log("Compare:", v1, v2)}
        />
      </ComponentCard>

      <ComponentCard
        title="Share Dialog"
        description="Share conversations with others"
      >
        <CollaborationShareDialog
          url="https://chat.example.com/share/abc123"
          permissions={["view", "comment", "edit"]}
          onShare={(permission) => console.log("Share with:", permission)}
          trigger={<Button>Share Conversation</Button>}
        />
      </ComponentCard>
    </div>
  );
}

// Component Section: Auth
function AuthComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Login Form"
        description="User authentication form"
      >
        <div className="max-w-md mx-auto">
          <LoginForm
            onSubmit={(credentials) => console.log("Login:", credentials)}
            onForgotPassword={() => console.log("Forgot password")}
            providers={["google", "github"]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Signup Form"
        description="User registration form"
      >
        <div className="max-w-md mx-auto">
          <SignUpForm
            onSubmit={(data) => console.log("Signup:", data)}
            providers={["google", "github"]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Profile Card"
        description="Display user profile information"
      >
        <div className="max-w-md mx-auto">
          <ProfileCard
            user={{
              id: "user-1",
              name: "John Doe",
              email: "john@example.com",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              bio: "Software developer passionate about AI and web technologies",
              joinedAt: new Date(Date.now() - 90 * 86400000),
              stats: {
                conversations: 234,
                tokensUsed: 1234567,
                achievements: 12,
              },
            }}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Profile Editor"
        description="Edit user profile"
      >
        <div className="max-w-md mx-auto">
          <ProfileEditor
            user={{
              id: "user-1",
              name: "John Doe",
              email: "john@example.com",
              bio: "Software developer",
            }}
            onSave={(data) => console.log("Save:", data)}
            onCancel={() => console.log("Cancel")}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Prompt Tooling
function PromptToolingComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Prompt Manager"
        description="Manage and organize prompts"
      >
        <PromptManager
          prompts={[
            { id: "1", name: "Code Review", content: "Review this code for best practices:\n{{code}}", category: "Development", tags: ["code", "review"], variables: ["code"] },
            { id: "2", name: "Bug Fix Helper", content: "Help fix this bug:\n{{code}}\nError message: {{error}}", category: "Development", tags: ["debug", "fix"], variables: ["code", "error"] },
            { id: "3", name: "Documentation", content: "Write documentation for:\n{{code}}", category: "Writing", tags: ["docs"], isFavorite: true, variables: ["code"] },
          ]}
          onSave={(prompt) => console.log("Save prompt:", prompt)}
          onSelect={(prompt) => console.log("Selected:", prompt)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Chain Builder"
        description="Build multi-step prompt workflows"
      >
        <PromptChainBuilder
          steps={[
            { id: "1", name: "Analyze Requirements", template: "Analyze these requirements and identify key components:\n{{requirements}}" },
            { id: "2", name: "Design Architecture", template: "Based on the analysis, design a solution architecture" },
            { id: "3", name: "Generate Code", template: "Implement the designed architecture with clean, tested code" },
          ]}
          onStepsChange={(steps) => console.log("Steps updated:", steps)}
          onRun={() => console.log("Running chain...")}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Version History"
        description="Track prompt changes over time"
      >
        <PromptVersionHistory
          versions={[
            { id: "v3", content: "Analyze and explain the following code, focusing on performance:\n{{code}}", timestamp: new Date(), author: "Alice", changes: "Added performance focus" },
            { id: "v2", content: "Explain the following code:\n{{code}}", timestamp: new Date(Date.now() - 86400000), author: "Bob", changes: "Simplified prompt" },
            { id: "v1", content: "Review and explain this code in detail:\n{{code}}", timestamp: new Date(Date.now() - 172800000), author: "Alice", changes: "Initial version" },
          ]}
          currentVersion="v3"
          onRestore={(version) => console.log("Restore version:", version)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Testing Panel"
        description="Test prompts with different inputs"
      >
        <PromptTestingPanel
          template={{ id: "1", name: "Explain Concept", content: "Explain {{concept}} in simple terms for a beginner" }}
          results={[
            { id: "1", input: { concept: "recursion" }, output: "Recursion is when a function calls itself...", tokens: 45, latency: 230, timestamp: new Date(), success: true },
            { id: "2", input: { concept: "closure" }, output: "A closure is a function that remembers its outer scope...", tokens: 52, latency: 180, timestamp: new Date(Date.now() - 60000), success: true },
          ]}
          onRunTest={(variables) => console.log("Testing with:", variables)}
        />
      </ComponentCard>

      <ComponentCard
        title="Prompt Library"
        description="Browse and use prompt templates"
      >
        <PromptLibrary
          categories={[
            { id: "coding", name: "Coding", count: 5 },
            { id: "writing", name: "Writing", count: 3 },
            { id: "analysis", name: "Analysis", count: 2 },
          ]}
          prompts={[
            { id: "1", name: "Code Review", description: "Review code for best practices and potential issues", content: "", category: "coding", tags: ["review", "quality"] },
            { id: "2", name: "Debug Assistant", description: "Help identify and fix bugs in code", content: "", category: "coding", tags: ["debug", "fix"], isFavorite: true },
            { id: "3", name: "Email Draft", description: "Draft professional emails", content: "", category: "writing", tags: ["email", "communication"] },
          ]}
          onSelectPrompt={(prompt) => console.log("Selected:", prompt)}
          onSelectCategory={(cat) => console.log("Category:", cat)}
        />
      </ComponentCard>

      <ComponentCard
        title="System Prompt Editor"
        description="Configure system-level instructions"
      >
        <SystemPromptEditor
          value="You are a helpful AI assistant specialized in software development. You write clean, efficient code and explain concepts clearly."
          onChange={(content) => console.log("Updated system prompt:", content)}
          presets={[
            { id: "1", name: "Code Assistant", content: "You are a coding assistant focused on writing clean, maintainable code." },
            { id: "2", name: "Teacher", content: "You are a patient teacher who explains concepts step by step." },
          ]}
          maxTokens={2048}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Counter"
        description="Track token usage in real-time"
      >
        <div className="space-y-4">
          <TokenCounter
            text="This is a sample text that demonstrates token counting functionality. The counter estimates tokens based on text length."
            maxTokens={4096}
          />
          <TokenCounter
            text={"A much longer prompt that approaches the token limit. " + "A".repeat(50)}
            maxTokens={4096}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Token Management
function TokenManagementComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Token Breakdown Chart"
        description="Visualize token distribution"
      >
        <TokenBreakdownChart
          breakdown={[
            { category: "System Prompt", tokens: 200, percentage: 9, optimizable: false },
            { category: "Context/RAG", tokens: 1200, percentage: 52, optimizable: true, savings: 300 },
            { category: "User Message", tokens: 450, percentage: 20, optimizable: true, savings: 50 },
            { category: "Chat History", tokens: 450, percentage: 19, optimizable: true, savings: 200 },
          ]}
          total={2300}
          limit={4096}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Status Badge"
        description="Quick token usage indicators"
      >
        <div className="flex flex-wrap gap-4">
          <TokenStatusBadge used={1200} limit={4096} />
          <TokenStatusBadge used={3200} limit={4096} />
          <TokenStatusBadge used={3800} limit={4096} />
          <TokenStatusBadge used={4500} limit={4096} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Token Budget Allocator"
        description="Allocate token budgets across components"
      >
        <TokenBudgetAllocator
          budgets={[
            { id: "system", name: "System Prompt", allocated: 500, used: 200, priority: "high", locked: true },
            { id: "context", name: "Context/RAG", allocated: 1500, used: 1200, priority: "medium" },
            { id: "history", name: "Chat History", allocated: 1000, used: 800, priority: "low" },
            { id: "response", name: "Response", allocated: 1096, used: 0, priority: "high" },
          ]}
          totalLimit={4096}
          onBudgetsChange={(budgets) => console.log("Budgets changed:", budgets)}
        />
      </ComponentCard>

      <ComponentCard
        title="Context Window Visualizer"
        description="Visualize context window usage"
      >
        <ContextWindowVisualizer
          items={[
            { id: "1", type: "system", label: "System Prompt", tokens: 200, content: "You are a helpful assistant..." },
            { id: "2", type: "context", label: "RAG Context", tokens: 1500, content: "Retrieved documentation...", truncatable: true },
            { id: "3", type: "user", label: "User Message 1", tokens: 150, content: "How do I...?" },
            { id: "4", type: "assistant", label: "Assistant Response 1", tokens: 400, content: "You can do this by..." },
            { id: "5", type: "user", label: "User Message 2", tokens: 80, content: "Can you explain more?" },
          ]}
          limit={4096}
          onTruncate={(id) => console.log("Truncate:", id)}
          onRemove={(id) => console.log("Remove:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Cost Calculator"
        description="Calculate costs for different models"
      >
        <TokenCostCalculator
          inputTokens={2500}
          outputTokens={1200}
          models={[
            { id: "gpt-4o", name: "GPT-4o", inputCost: 2.5, outputCost: 10, contextLimit: 128000 },
            { id: "gpt-4o-mini", name: "GPT-4o Mini", inputCost: 0.15, outputCost: 0.6, contextLimit: 128000 },
            { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", inputCost: 3, outputCost: 15, contextLimit: 200000 },
            { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", inputCost: 0.25, outputCost: 1.25, contextLimit: 200000 },
          ]}
          selectedModel="gpt-4o"
          onModelChange={(model) => console.log("Model changed:", model)}
        />
      </ComponentCard>

      <ComponentCard
        title="Token Usage History"
        description="Track token usage over time"
      >
        <TokenUsageHistory
          records={[
            { timestamp: new Date(Date.now() - 6 * 86400000), inputTokens: 12000, outputTokens: 4500, cost: 0.23 },
            { timestamp: new Date(Date.now() - 5 * 86400000), inputTokens: 15000, outputTokens: 6000, cost: 0.31 },
            { timestamp: new Date(Date.now() - 4 * 86400000), inputTokens: 18000, outputTokens: 7200, cost: 0.38 },
            { timestamp: new Date(Date.now() - 3 * 86400000), inputTokens: 14000, outputTokens: 5500, cost: 0.29 },
            { timestamp: new Date(Date.now() - 2 * 86400000), inputTokens: 20000, outputTokens: 8000, cost: 0.42 },
            { timestamp: new Date(Date.now() - 1 * 86400000), inputTokens: 22000, outputTokens: 9000, cost: 0.47 },
            { timestamp: new Date(), inputTokens: 16000, outputTokens: 6500, cost: 0.34 },
          ]}
          period="week"
          onPeriodChange={(period) => console.log("Period changed:", period)}
        />
      </ComponentCard>

      <ComponentCard
        title="Compression Preview"
        description="Preview compressed prompt versions"
      >
        <CompressionPreview
          original="This is a very long prompt that contains a lot of unnecessary words, redundant phrases, and verbose explanations that could potentially be compressed significantly to reduce the overall token count while still maintaining the essential meaning and intent of the original message."
          compressed="Long prompt with unnecessary words and verbose explanations. Can be compressed to reduce tokens while maintaining meaning."
          savings={35}
          method="summarization"
          onAccept={() => console.log("Accepted compression")}
          onReject={() => console.log("Rejected compression")}
        />
      </ComponentCard>

      <ComponentCard
        title="Optimization Suggestions"
        description="AI-powered optimization recommendations"
      >
        <OptimizationSuggestions
          suggestions={[
            { id: "1", title: "Remove Redundant History", description: "Older messages can be summarized or removed", impact: "high", savings: 450, type: "truncation", automated: true },
            { id: "2", title: "Compress Code Blocks", description: "Minify embedded code snippets", impact: "medium", savings: 120, type: "compression" },
            { id: "3", title: "Summarize Context", description: "Replace verbose context with summary", impact: "high", savings: 300, type: "summarization", automated: true },
          ]}
          onApply={(id) => console.log("Apply suggestion:", id)}
          onDismiss={(id) => console.log("Dismiss suggestion:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Optimizer Settings"
        description="Configure optimization preferences"
      >
        <OptimizerSettings
          settings={{
            autoTruncate: true,
            maxHistoryMessages: 20,
            summarizeThreshold: 80,
            compressCode: false,
            removeFormatting: false,
          }}
          onChange={(settings) => console.log("Settings changed:", settings)}
        />
      </ComponentCard>
    </div>
  );
}

// Dashboard Sections
function DashboardTokenSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Token Optimization Dashboard"
        description="Complete token management and optimization interface"
      >
        <TokenOptimizationDashboard />
      </ComponentCard>
    </div>
  );
}

function DashboardAgentSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Agent Task Dashboard"
        description="Monitor and manage agent tasks"
      >
        <AgentTaskDashboard />
      </ComponentCard>
    </div>
  );
}

function DashboardPromptSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Prompt Library Dashboard"
        description="Browse and manage prompt templates"
      >
        <PromptLibraryDashboard />
      </ComponentCard>
    </div>
  );
}

function DashboardContextSection() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Conversation History Dashboard"
        description="View conversation history and memory"
      >
        <ConversationHistoryDashboard />
      </ComponentCard>
    </div>
  );
}

// Additional Component Sections
function RealtimeComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Presence Status"
        description="Show user online/offline status"
      >
        <div className="flex flex-wrap gap-4">
          <PresenceDot status="online" />
          <PresenceDot status="away" />
          <PresenceDot status="busy" />
          <PresenceDot status="offline" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Typing Indicators"
        description="Show who is currently typing"
      >
        <TypingAwareness
          users={[
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Who's Here"
        description="Display active participants"
      >
        <WhosHere
          users={[
            { id: "1", name: "Alice", status: "online" },
            { id: "2", name: "Bob", status: "online" },
            { id: "3", name: "Charlie", status: "away" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Reactions"
        description="Add emoji reactions to messages"
      >
        <div className="space-y-4">
          <MessageReactions
            reactions={[
              { emoji: "👍", count: 5, userReacted: true },
              { emoji: "❤️", count: 3, userReacted: false },
              { emoji: "😊", count: 2, userReacted: false },
            ]}
            onReact={(emoji) => console.log("React:", emoji)}
          />
          <ReactionPicker
            onSelect={(emoji) => console.log("Selected:", emoji)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

function AdvancedMessagingComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Thread Replies"
        description="Conversation threading"
      >
        <ThreadView
          parentMessage={{ id: "1", content: "What's the best way to optimize React?", author: "Alice" }}
          replies={[
            { id: "2", content: "Use React.memo for expensive components", author: "Bob", timestamp: new Date() },
            { id: "3", content: "Don't forget useMemo and useCallback", author: "Charlie", timestamp: new Date() },
          ]}
          onReply={(content) => console.log("Reply:", content)}
        />
      </ComponentCard>

      <ComponentCard
        title="Pinned Messages"
        description="Pin important messages"
      >
        <div className="space-y-4">
          <PinnedList
            messages={[
              { id: "1", content: "Meeting at 3 PM today", author: "Alice", pinnedAt: new Date() },
              { id: "2", content: "Please review the PR before EOD", author: "Bob", pinnedAt: new Date() },
            ]}
            onUnpin={(id) => console.log("Unpin:", id)}
          />
          <PinButton
            isPinned={false}
            onPin={() => console.log("Pin message")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Message Search"
        description="Search through messages"
      >
        <SearchInput
          onSearch={(query) => console.log("Search:", query)}
        />
        <SearchResults
          results={[
            { id: "1", content: "This is a matching message", author: "Alice", timestamp: new Date(), highlights: ["matching"] },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Actions"
        description="Action bar for messages"
      >
        <MessageActionsBar
          actions={[
            { id: "reply", label: "Reply", icon: <MessageSquare className="h-4 w-4" /> },
            { id: "edit", label: "Edit", icon: <Code className="h-4 w-4" /> },
            { id: "delete", label: "Delete", icon: <X className="h-4 w-4" /> },
          ]}
          onAction={(id) => console.log("Action:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Editor"
        description="Edit existing messages"
      >
        <MessageEditor
          initialContent="Original message content"
          onSave={(content) => console.log("Save:", content)}
          onCancel={() => console.log("Cancel")}
        />
      </ComponentCard>

      <ComponentCard
        title="Message Forwarding"
        description="Forward messages to other chats"
      >
        <ForwardDialog
          message={{ id: "1", content: "Important information to share" }}
          onForward={(chatIds) => console.log("Forward to:", chatIds)}
          trigger={<Button>Forward Message</Button>}
        />
      </ComponentCard>

      <ComponentCard
        title="Scheduled Messages"
        description="Schedule messages for later"
      >
        <ScheduledMessageCard
          content="Scheduled reminder"
          scheduledFor={new Date(Date.now() + 3600000)}
          onCancel={() => console.log("Cancel scheduled")}
        />
      </ComponentCard>

      <ComponentCard
        title="Read Receipts"
        description="Show message read status"
      >
        <ReadReceiptAvatars
          readers={[
            { id: "1", name: "Alice", readAt: new Date() },
            { id: "2", name: "Bob", readAt: new Date() },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Unread Indicator"
        description="Show unread message count"
      >
        <div className="space-y-4">
          <UnreadCounter count={5} />
          <UnreadBanner
            count={3}
            onJump={() => console.log("Jump to unread")}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

function VoiceComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Voice Button"
        description="Toggle voice input"
      >
        <VoiceButton
          isRecording={false}
          onToggle={() => console.log("Toggle recording")}
        />
      </ComponentCard>

      <ComponentCard
        title="Voice Recorder"
        description="Record voice messages"
      >
        <VoiceRecorder
          onRecordingComplete={(blob) => console.log("Recording complete:", blob)}
        />
      </ComponentCard>

      <ComponentCard
        title="Text-to-Speech"
        description="Convert text to speech"
      >
        <TextToSpeechButton
          text="This is a sample text that will be converted to speech."
          onPlay={() => console.log("Playing")}
          onPause={() => console.log("Paused")}
        />
      </ComponentCard>

      <ComponentCard
        title="Voice Input Field"
        description="Voice input with visualization"
      >
        <VoiceInputField
          onTranscript={(text) => console.log("Transcript:", text)}
          placeholder="Click microphone to speak..."
        />
      </ComponentCard>

      <ComponentCard
        title="Audio Player"
        description="Play audio messages"
      >
        <AudioPlayer
          src="/audio-sample.mp3"
          onPlay={() => console.log("Playing")}
          onPause={() => console.log("Paused")}
          onEnded={() => console.log("Ended")}
        />
      </ComponentCard>

      <ComponentCard
        title="Voice Visualizer"
        description="Visualize audio levels"
      >
        <VoiceVisualizer
          isActive={true}
          volume={0.5}
        />
      </ComponentCard>
    </div>
  );
}

function VisualEffectsComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Particle Background"
        description="Animated particle effects"
      >
        <div className="relative h-64 rounded-lg overflow-hidden border border-border">
          <Particles />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Sparkle Effect"
        description="Sparkling animations"
      >
        <div className="relative h-32 rounded-lg overflow-hidden border border-border">
          <SparklesParticle />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Meteor Shower"
        description="Falling meteor animations"
      >
        <div className="relative h-64 rounded-lg overflow-hidden border border-border bg-slate-950">
          <Meteors />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Grid Pattern"
        description="Background grid pattern"
      >
        <div className="relative h-64 rounded-lg overflow-hidden border border-border">
          <GridPattern />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Animated Beam"
        description="Connection beam animations"
      >
        <div className="relative">
          <div className="flex justify-between items-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary" />
            <AnimatedBeam />
            <div className="w-12 h-12 rounded-full bg-secondary" />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Image Generation"
        description="Show image generation progress"
      >
        <ImageGenerationPreview
          prompt="A beautiful sunset over mountains"
          status="generating"
          progress={65}
        />
      </ComponentCard>

      <ComponentCard
        title="Dot Pattern"
        description="Background dot pattern"
      >
        <div className="relative h-64 rounded-lg overflow-hidden border border-border">
          <DotPattern />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Floating Particles"
        description="Floating particle animation"
      >
        <div className="relative h-64 rounded-lg overflow-hidden border border-border bg-slate-900">
          <FloatingParticles />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Integration Beam Diagram"
        description="Show data flow between services"
      >
        <IntegrationBeamDiagram
          nodes={[
            { id: "1", label: "User", icon: "user" },
            { id: "2", label: "API", icon: "server" },
            { id: "3", label: "Database", icon: "database" },
          ]}
        />
      </ComponentCard>
    </div>
  );
}

// =============================================================================
// NEW ENHANCED ANIMATED COMPONENTS SECTIONS
// =============================================================================

// Component Section: Interactive Effects
function InteractiveFxComponents() {
  const [showConfetti, setShowConfetti] = React.useState(false);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Ripple Effect"
        description="Animated ripple on hover and click"
      >
        <div className="flex justify-center">
          <Ripple className="w-64 h-64 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-lg font-semibold">Hover Here</span>
          </Ripple>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Magnetic Element"
        description="Elements that follow your cursor"
      >
        <div className="flex justify-center gap-8">
          <Magnetic>
            <div className="w-24 h-24 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              Drag Me
            </div>
          </Magnetic>
          <Magnetic intensity={0.5}>
            <div className="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">
              Pull Me
            </div>
          </Magnetic>
        </div>
      </ComponentCard>

      <ComponentCard
        title="3D Card Tilt"
        description="Interactive 3D perspective card with glare"
      >
        <div className="flex justify-center">
          <CardTilt className="w-80">
            <div className="h-48 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary p-6 text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">3D Card</h3>
              <p className="text-sm opacity-90">Move your mouse over this card to see the 3D tilt effect with realistic lighting.</p>
            </div>
          </CardTilt>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Liquid Button"
        description="Morphing liquid hover effects"
      >
        <div className="flex gap-4 flex-wrap justify-center">
          <LiquidButton variant="primary">Primary Button</LiquidButton>
          <LiquidButton variant="secondary">Secondary Button</LiquidButton>
          <LiquidButton variant="ghost">Ghost Button</LiquidButton>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Dock Animation"
        description="macOS-style dock with magnification"
      >
        <div className="flex justify-center">
          <Dock
            items={[
              { icon: <Bot className="w-6 h-6" />, label: "AI Assistant" },
              { icon: <Code className="w-6 h-6" />, label: "Code Editor" },
              { icon: <FileText className="w-6 h-6" />, label: "Documents" },
              { icon: <Settings className="w-6 h-6" />, label: "Settings" },
              { icon: <MessageSquare className="w-6 h-6" />, label: "Messages" },
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Gooey Effect"
        description="Blob morphing effect"
      >
        <div className="flex justify-center">
          <Gooey blur={15}>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-primary animate-float" />
              <div className="w-16 h-16 rounded-full bg-accent animate-float" style={{ animationDelay: "0.5s" }} />
              <div className="w-16 h-16 rounded-full bg-secondary animate-float" style={{ animationDelay: "1s" }} />
            </div>
          </Gooey>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Confetti"
        description="Celebration confetti animation"
      >
        <div className="flex justify-center">
          <Button onClick={() => setShowConfetti(!showConfetti)}>
            {showConfetti ? "🎉 Celebrating!" : "Celebrate 🎉"}
          </Button>
          <Confetti active={showConfetti} />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Text Animations
function TextFxComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Typewriter"
        description="Classic typewriter effect"
      >
        <div className="text-2xl">
          <Typewriter
            text={["Hello, World!", "Welcome to the showcase.", "Enjoy the animations!"]}
            speed={100}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Text Reveal"
        description="Text reveals word by word"
      >
        <div className="space-y-4">
          <div className="text-lg">
            <TextReveal variant="fade">
              This text fades in word by word creating a smooth reveal effect.
            </TextReveal>
          </div>
          <div className="text-lg">
            <TextReveal variant="slide">
              This text slides up word by word for a dynamic entrance.
            </TextReveal>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Flip Text"
        description="Text that flips between multiple states"
      >
        <div className="text-3xl font-bold text-center">
          Building{" "}
          <FlipText
            words={["Amazing", "Beautiful", "Creative", "Dynamic"]}
            duration={2000}
            className="text-accent"
          />{" "}
          Experiences
        </div>
      </ComponentCard>

      <ComponentCard
        title="Scramble Text"
        description="Text scrambling effect"
      >
        <div className="text-2xl font-bold text-center">
          <ScrambleText text="DECODING MESSAGE" speed={30} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Animated Gradient Text"
        description="Text with flowing gradient"
      >
        <div className="text-4xl font-bold text-center">
          <AnimatedGradientText>
            Gradient Animation
          </AnimatedGradientText>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Split Text"
        description="Character-by-character animation"
      >
        <div className="space-y-4">
          <div className="text-xl">
            <SplitText variant="fade">Fading characters</SplitText>
          </div>
          <div className="text-xl">
            <SplitText variant="scale">Scaling characters</SplitText>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Number Ticker"
        description="Animated counting numbers"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <NumberTicker value={1000} duration={2} className="text-4xl font-bold" suffix="+" />
            <p className="text-sm text-muted-foreground mt-2">Users</p>
          </div>
          <div>
            <NumberTicker value={99.9} duration={2} className="text-4xl font-bold" decimalPlaces={1} suffix="%" />
            <p className="text-sm text-muted-foreground mt-2">Uptime</p>
          </div>
          <div>
            <NumberTicker value={50} duration={2} className="text-4xl font-bold" prefix="$" suffix="M" />
            <p className="text-sm text-muted-foreground mt-2">Revenue</p>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Morphing Text"
        description="Text that morphs between states"
      >
        <div className="text-3xl font-bold text-center">
          <MorphingText
            texts={["Innovation", "Excellence", "Creativity", "Success"]}
            duration={2500}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Glitch Text"
        description="Cyberpunk glitch effect"
      >
        <div className="text-4xl font-bold text-center">
          <GlitchText>SYSTEM ERROR</GlitchText>
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: Background Effects
function BackgroundFxComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Aurora Background"
        description="Northern lights effect"
      >
        <AuroraBackground className="h-64 rounded-lg">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-white">Aurora Borealis</h2>
          </div>
        </AuroraBackground>
      </ComponentCard>

      <ComponentCard
        title="Gradient Mesh"
        description="Animated mesh gradient with moving orbs"
      >
        <GradientMesh className="h-64 rounded-lg">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-white">Mesh Gradient</h2>
          </div>
        </GradientMesh>
      </ComponentCard>

      <ComponentCard
        title="Noise Texture"
        description="Animated noise background"
      >
        <NoiseTexture className="h-64 rounded-lg bg-gradient-to-br from-primary to-accent">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-white">Noise Effect</h2>
          </div>
        </NoiseTexture>
      </ComponentCard>

      <ComponentCard
        title="Animated Waves"
        description="Layered wave animation"
      >
        <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900">
          <AnimatedWaves />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Radial Gradient"
        description="Animated radial gradient"
      >
        <RadialGradient className="h-64 rounded-lg">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-white">Radial Glow</h2>
          </div>
        </RadialGradient>
      </ComponentCard>

      <ComponentCard
        title="Spotlight Grid"
        description="Interactive spotlight on grid"
      >
        <SpotlightGrid className="h-64 rounded-lg bg-background">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold">Move your mouse</h2>
          </div>
        </SpotlightGrid>
      </ComponentCard>

      <ComponentCard
        title="Animated Grid"
        description="Moving grid background"
      >
        <AnimatedGrid className="h-64 rounded-lg bg-background">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold">Animated Grid</h2>
          </div>
        </AnimatedGrid>
      </ComponentCard>

      <ComponentCard
        title="Retro Grid"
        description="Cyberpunk style grid"
      >
        <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-b from-background to-accent/20">
          <RetroGrid />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h2 className="text-3xl font-bold">Retro Cyberpunk</h2>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Starfield"
        description="Animated 3D starfield"
      >
        <div className="relative h-64 rounded-lg overflow-hidden bg-black">
          <Starfield starCount={150} speedFactor={0.05} />
        </div>
      </ComponentCard>
    </div>
  );
}

// Component Section: UI Patterns
function UIPatternsComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Marquee"
        description="Infinite scrolling content"
      >
        <Marquee speed="normal" pauseOnHover>
          <div className="flex gap-8 px-4">
            {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-lg bg-accent/10 font-semibold whitespace-nowrap">
                {tech}
              </div>
            ))}
          </div>
        </Marquee>
      </ComponentCard>

      <ComponentCard
        title="Scroll Progress"
        description="Linear and circular progress indicators"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Scroll the page to see the progress indicators (top bar and bottom-right circle)
          </p>
          <ScrollProgress variant="linear" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Animated Tabs"
        description="Tabs with smooth indicator animation"
      >
        <AnimatedTabs
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: <div className="p-4">Overview content goes here with smooth transitions.</div>,
            },
            {
              id: "analytics",
              label: "Analytics",
              content: <div className="p-4">Analytics dashboard with beautiful charts and metrics.</div>,
            },
            {
              id: "settings",
              label: "Settings",
              content: <div className="p-4">Configure your preferences and settings here.</div>,
            },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Infinite Carousel"
        description="Auto-scrolling carousel"
      >
        <InfiniteCarousel
          speed={20}
          items={[
            <div key="1" className="w-64 h-40 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              Slide 1
            </div>,
            <div key="2" className="w-64 h-40 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              Slide 2
            </div>,
            <div key="3" className="w-64 h-40 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold">
              Slide 3
            </div>,
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Reveal on Scroll"
        description="Elements reveal when scrolled into view"
      >
        <div className="space-y-4">
          <RevealOnScroll direction="up">
            <div className="p-6 rounded-lg bg-accent/10">Slides up on scroll</div>
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={100}>
            <div className="p-6 rounded-lg bg-accent/10">Slides from left on scroll</div>
          </RevealOnScroll>
          <RevealOnScroll direction="zoom" delay={200}>
            <div className="p-6 rounded-lg bg-accent/10">Zooms in on scroll</div>
          </RevealOnScroll>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Bento Grid"
        description="Animated bento grid layout"
      >
        <BentoGrid>
          <div className="md:col-span-2">
            <h3 className="font-bold mb-2">Feature 1</h3>
            <p className="text-sm text-muted-foreground">Amazing feature description</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Feature 2</h3>
            <p className="text-sm text-muted-foreground">Another great feature</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Feature 3</h3>
            <p className="text-sm text-muted-foreground">More awesome features</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-bold mb-2">Feature 4</h3>
            <p className="text-sm text-muted-foreground">Even more features to explore</p>
          </div>
        </BentoGrid>
      </ComponentCard>

      <ComponentCard
        title="Parallax"
        description="Smooth parallax scrolling"
      >
        <div className="h-96 overflow-y-scroll border border-border rounded-lg">
          <div className="h-[200vh] relative">
            <Parallax speed={0.5} className="absolute top-20 left-1/2 -translate-x-1/2">
              <div className="w-64 h-64 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold">
                Parallax Effect
              </div>
            </Parallax>
            <div className="absolute top-0 left-0 right-0 p-8 text-center">
              <p className="text-lg font-semibold">Scroll down to see parallax</p>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}

// Helper Component
function ComponentCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
