"use client";

import * as React from "react";
import {
  MessageSquare,
  Code,
  Command,
  Bot,
  Workflow,
  Settings,
  FileText,
  Zap,
  BarChart3,
  TestTube,
  Keyboard,
  Laptop,
  Link2,
  Boxes,
  Database,
  Shield,
  Activity,
  Users,
  User,
  Sparkles,
  Layers,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Package,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Import Refactored Sections
import { ChatComponents } from "@/components/showcase/ChatComponents";
import { CodeComponents } from "@/components/showcase/CodeComponents";
import { InputComponents } from "@/components/showcase/InputComponents";
import { AgentComponents } from "@/components/showcase/AgentComponents";
import { CanvasComponents } from "@/components/showcase/CanvasComponents";
import { ManagementComponents } from "@/components/showcase/ManagementComponents";
import { PromptToolingComponents } from "@/components/showcase/PromptToolingComponents";
import { TokenManagementComponents } from "@/components/showcase/TokenManagementComponents";
import { MediaComponents } from "@/components/showcase/MediaComponents";
import { LoaderComponents } from "@/components/showcase/LoaderComponents";
import { DataComponents } from "@/components/showcase/DataComponents";
import { DevToolsComponents } from "@/components/showcase/DevToolsComponents";
import { UIComponents } from "@/components/showcase/UIComponents";
import { CloneComponents } from "@/components/showcase/CloneComponents";
import { DiagramComponents } from "@/components/showcase/DiagramComponents";
import { GenerativeComponents } from "@/components/showcase/GenerativeComponents";
import { MemoryComponents } from "@/components/showcase/MemoryComponents";
import { SafetyComponents } from "@/components/showcase/SafetyComponents";
import { ObservabilityComponents } from "@/components/showcase/ObservabilityComponents";
import { CollaborationComponents } from "@/components/showcase/CollaborationComponents";
import { AuthComponents } from "@/components/showcase/AuthComponents";
import { DashboardTokenSection } from "@/components/showcase/DashboardTokenSection";
import { DashboardAgentSection } from "@/components/showcase/DashboardAgentSection";
import { DashboardPromptSection } from "@/components/showcase/DashboardPromptSection";
import { DashboardContextSection } from "@/components/showcase/DashboardContextSection";
import { RealtimeComponents } from "@/components/showcase/RealtimeComponents";
import { AdvancedMessagingComponents } from "@/components/showcase/AdvancedMessagingComponents";
import { VoiceComponents } from "@/components/showcase/VoiceComponents";
import { VisualEffectsComponents } from "@/components/showcase/VisualEffectsComponents";
import { InteractiveFxComponents } from "@/components/showcase/InteractiveFxComponents";
import { TextFxComponents } from "@/components/showcase/TextFxComponents";
import { BackgroundFxComponents } from "@/components/showcase/BackgroundFxComponents";
import { UIPatternsComponents } from "@/components/showcase/UIPatternsComponents";
import { AdvancedFxComponents } from "@/components/showcase/AdvancedFxComponents";
import { ChatClonesExtendedComponents } from "@/components/showcase/ChatClonesExtendedComponents";

const componentCategories = [
  { id: "chat", label: "Chat & Messages", icon: MessageSquare, description: "Core chat interface components" },
  { id: "code", label: "Code & Preview", icon: Code, description: "Code blocks, diffs, and live previews" },
  { id: "input", label: "Input & Commands", icon: Command, description: "Advanced input with palettes" },
  { id: "agent", label: "Agent & Tools", icon: Bot, description: "Tool calling and agent workflows" },
  { id: "canvas", label: "Canvas & Workflow", icon: Workflow, description: "Node-based visual editors" },
  { id: "management", label: "Management", icon: Settings, description: "Settings, prompts, and queues" },
  { id: "prompts", label: "Prompt Tooling", icon: FileText, description: "Prompt chains, testing, and versioning" },
  { id: "tokens", label: "Token Management", icon: Zap, description: "Budget, optimization, and cost tracking" },
  { id: "media", label: "Media & Sources", icon: FileText, description: "Audio, images, and citations" },
  { id: "loaders", label: "Loaders & States", icon: Zap, description: "Skeletons and loading states" },
  { id: "data", label: "Data & Charts", icon: BarChart3, description: "Tables, charts, and visualizations" },
  { id: "dev", label: "Dev Tools", icon: TestTube, description: "Git, tests, and env variables" },
  { id: "ui", label: "UI Components", icon: Keyboard, description: "Forms, hotkeys, and notifications" },
  { id: "clones", label: "Chat Clones", icon: Laptop, description: "ChatGPT, Claude, Perplexity, Grok" },
  { id: "diagrams", label: "Diagrams & Links", icon: Link2, description: "Mermaid, link previews, tooltips" },
  { id: "generative", label: "Generative UI", icon: Boxes, description: "Streaming, suggestions, approvals" },
  { id: "memory", label: "Memory & Context", icon: Database, description: "Memory management and persistence" },
  { id: "safety", label: "Safety & Guardrails", icon: Shield, description: "Moderation, PII, fact-checking" },
  { id: "observability", label: "Observability", icon: Activity, description: "Traces, costs, rate limits" },
  { id: "collaboration", label: "Collaboration", icon: Users, description: "Real-time cursors, comments" },
  { id: "auth", label: "Auth & Profile", icon: User, description: "Login, signup, profile management" },
  // Dashboards
  { id: "dashboard-token", label: "Token Dashboard", icon: Zap, description: "Token optimization & observability" },
  { id: "dashboard-agent", label: "Agent Dashboard", icon: Bot, description: "Agentic task management" },
  { id: "dashboard-prompt", label: "Prompt Dashboard", icon: FileText, description: "Prompt library & management" },
  { id: "dashboard-context", label: "Context Dashboard", icon: Database, description: "Conversation history & memory" },
  // Additional Categories
  { id: "realtime", label: "Real-time Features", icon: Activity, description: "Presence, typing, reactions" },
  { id: "messaging", label: "Advanced Messaging", icon: MessageSquare, description: "Threads, pins, search, forward" },
  { id: "voice", label: "Voice & Audio", icon: Activity, description: "Speech-to-text, TTS, recording" },
  { id: "visual", label: "Visual Effects", icon: Sparkles, description: "Particles, beams, animations" },
  { id: "interactive-fx", label: "Interactive Effects", icon: Sparkles, description: "Ripple, magnetic, 3D tilt effects" },
  { id: "text-fx", label: "Text Animations", icon: FileText, description: "Typewriter, reveal, morphing text" },
  { id: "background-fx", label: "Background Effects", icon: Layers, description: "Aurora, gradients, patterns" },
  { id: "ui-patterns", label: "UI Patterns", icon: Boxes, description: "Marquee, tabs, carousels" },
  { id: "advanced-fx", label: "Advanced Effects", icon: Sparkles, description: "Floating, morphing, 3D flips" },
  { id: "chat-clones-extended", label: "Platform Clones", icon: MessageSquare, description: "Manus, Emergent, Loveable" },
];

export default function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("chat");
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // Default closed on mobile
  const { theme, setTheme } = useTheme();

  const renderActiveComponent = () => {
    switch (activeCategory) {
      case "chat": return <ChatComponents />;
      case "code": return <CodeComponents />;
      case "input": return <InputComponents />;
      case "agent": return <AgentComponents />;
      case "canvas": return <CanvasComponents />;
      case "management": return <ManagementComponents />;
      case "prompts": return <PromptToolingComponents />;
      case "tokens": return <TokenManagementComponents />;
      case "media": return <MediaComponents />;
      case "loaders": return <LoaderComponents />;
      case "data": return <DataComponents />;
      case "dev": return <DevToolsComponents />;
      case "ui": return <UIComponents />;
      case "clones": return <CloneComponents />;
      case "diagrams": return <DiagramComponents />;
      case "generative": return <GenerativeComponents />;
      case "memory": return <MemoryComponents />;
      case "safety": return <SafetyComponents />;
      case "observability": return <ObservabilityComponents />;
      case "collaboration": return <CollaborationComponents />;
      case "auth": return <AuthComponents />;
      case "dashboard-token": return <DashboardTokenSection />;
      case "dashboard-agent": return <DashboardAgentSection />;
      case "dashboard-prompt": return <DashboardPromptSection />;
      case "dashboard-context": return <DashboardContextSection />;
      case "realtime": return <RealtimeComponents />;
      case "messaging": return <AdvancedMessagingComponents />;
      case "voice": return <VoiceComponents />;
      case "visual": return <VisualEffectsComponents />;
      case "interactive-fx": return <InteractiveFxComponents />;
      case "text-fx": return <TextFxComponents />;
      case "background-fx": return <BackgroundFxComponents />;
      case "ui-patterns": return <UIPatternsComponents />;
      case "advanced-fx": return <AdvancedFxComponents />;
      case "chat-clones-extended": return <ChatClonesExtendedComponents />;
      default: return <ChatComponents />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button - ONLY VISIBLE ON MOBILE */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-sidebar transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-border p-6 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">AI Components</h1>
              <p className="text-xs text-muted-foreground">React Library</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <nav className="space-y-1">
              {componentCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                    // Close sidebar on mobile when item selected
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <category.icon className="h-5 w-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{category.label}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform shrink-0",
                      activeCategory === category.id && "rotate-90"
                    )}
                  />
                </button>
              ))}
              
              <div className="my-2 border-t border-border/50" />
              
              <a
                href="/app/advanced-ai"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted text-foreground"
              >
                <Zap className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Advanced AI Demo</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Token Optimization & RAG
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 opacity-50 shrink-0" />
              </a>
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
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4 shrink-0">
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
          <header className="mb-8 pt-12 lg:pt-0"> {/* Added padding top for mobile menu button */}
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
            {renderActiveComponent()}
          </div>
        </div>
      </main>
    </div>
  );
}
