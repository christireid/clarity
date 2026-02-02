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
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Package,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Import Showcase Sections - Consolidated with no overlaps
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
import { RealtimeComponents } from "@/components/showcase/RealtimeComponents";
import { AdvancedMessagingComponents } from "@/components/showcase/AdvancedMessagingComponents";
import { VoiceComponents } from "@/components/showcase/VoiceComponents";
import { EffectsComponents } from "@/components/showcase/EffectsComponents";
import { UIPatternsComponents } from "@/components/showcase/UIPatternsComponents";
import { LayoutComponents } from "@/components/showcase/LayoutComponents";
import { ThemeComponents } from "@/components/showcase/ThemeComponents";
import { SpeechComponents } from "@/components/showcase/SpeechComponents";
import { FeedbackComponents } from "@/components/showcase/FeedbackComponents";
import { ThreadComponents } from "@/components/showcase/ThreadComponents";
import { UtilityComponents } from "@/components/showcase/UtilityComponents";
import { TranslationComponents } from "@/components/showcase/TranslationComponents";
import { DashboardsComponents } from "@/components/showcase/DashboardsComponents";
import { SearchComponents } from "@/components/showcase/SearchComponents";
import { HeroSection } from "@/components/showcase/HeroSection";

// Consolidated categories - each with distinct value, no overlaps
const componentCategories = [
  // Core Chat
  { id: "chat", label: "Chat & Messages", icon: MessageSquare, description: "Core chat interface components" },
  { id: "input", label: "Input & Commands", icon: Command, description: "Advanced input with command palette" },
  { id: "messaging", label: "Advanced Messaging", icon: MessageSquare, description: "Threads, pins, search, forward" },
  { id: "voice", label: "Voice & Audio", icon: Activity, description: "Speech-to-text, TTS, recording" },
  { id: "realtime", label: "Real-time Features", icon: Activity, description: "Presence, typing, reactions" },
  // AI & Agents
  { id: "agent", label: "Agent & Tools", icon: Bot, description: "Tool calling and agent workflows" },
  { id: "generative", label: "Generative UI", icon: Boxes, description: "Streaming, suggestions, approvals" },
  { id: "memory", label: "Memory & Context", icon: Database, description: "Memory management and RAG" },
  { id: "tokens", label: "Token Management", icon: Zap, description: "Budget, optimization, and costs" },
  // Development
  { id: "code", label: "Code & Preview", icon: Code, description: "Code blocks, diffs, and previews" },
  { id: "dev", label: "Dev Tools", icon: TestTube, description: "Git, tests, and env variables" },
  { id: "prompts", label: "Prompt Tooling", icon: FileText, description: "Prompt chains and versioning" },
  { id: "canvas", label: "Canvas & Workflow", icon: Workflow, description: "Node-based visual editors" },
  // Data & Media
  { id: "data", label: "Data & Charts", icon: BarChart3, description: "Tables, charts, visualizations" },
  { id: "media", label: "Media & Sources", icon: FileText, description: "Audio, images, citations" },
  { id: "diagrams", label: "Diagrams & Links", icon: Link2, description: "Mermaid, link previews" },
  // UI Foundation
  { id: "ui", label: "UI Primitives", icon: Keyboard, description: "Forms, hotkeys, notifications" },
  { id: "loaders", label: "Loading States", icon: Zap, description: "Skeletons and indicators" },
  { id: "effects", label: "Effects & Animations", icon: Sparkles, description: "Particles, text fx, interactions" },
  { id: "ui-patterns", label: "UI Patterns", icon: Boxes, description: "Marquee, tabs, carousels" },
  // Platform & Safety
  { id: "clones", label: "Platform Clones", icon: Laptop, description: "ChatGPT, Claude, Perplexity+" },
  { id: "safety", label: "Safety & Guardrails", icon: Shield, description: "Moderation, PII, fact-check" },
  { id: "observability", label: "Observability", icon: Activity, description: "Traces, costs, rate limits" },
  // Collaboration & Auth
  { id: "collaboration", label: "Collaboration", icon: Users, description: "Real-time cursors, comments" },
  { id: "auth", label: "Auth & Profile", icon: User, description: "Login, signup, profiles" },
  { id: "management", label: "Settings", icon: Settings, description: "App settings and config" },
  // New categories
  { id: "layout", label: "Layouts", icon: Boxes, description: "Page layouts and structures" },
  { id: "theme", label: "Theming", icon: Sun, description: "Theme switching and customization" },
  { id: "speech", label: "Speech", icon: Activity, description: "Voice input and text-to-speech" },
  { id: "feedback", label: "Feedback", icon: MessageSquare, description: "Ratings, reviews, reports" },
  { id: "threads", label: "Threads", icon: MessageSquare, description: "Thread management and lists" },
  { id: "utility", label: "Utilities", icon: Keyboard, description: "Copy, paste, passwords" },
  { id: "translation", label: "Translation", icon: FileText, description: "Language detection and i18n" },
  { id: "dashboards", label: "Dashboards", icon: BarChart3, description: "Full-featured admin dashboards" },
  { id: "search", label: "Web Search", icon: Search, description: "Search results and AI summaries" },
];

export default function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("chat");
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // Default closed on mobile
  const { theme, setTheme } = useTheme();

  const renderActiveComponent = () => {
    switch (activeCategory) {
      // Core Chat
      case "chat": return <ChatComponents />;
      case "input": return <InputComponents />;
      case "messaging": return <AdvancedMessagingComponents />;
      case "voice": return <VoiceComponents />;
      case "realtime": return <RealtimeComponents />;
      // AI & Agents
      case "agent": return <AgentComponents />;
      case "generative": return <GenerativeComponents />;
      case "memory": return <MemoryComponents />;
      case "tokens": return <TokenManagementComponents />;
      // Development
      case "code": return <CodeComponents />;
      case "dev": return <DevToolsComponents />;
      case "prompts": return <PromptToolingComponents />;
      case "canvas": return <CanvasComponents />;
      // Data & Media
      case "data": return <DataComponents />;
      case "media": return <MediaComponents />;
      case "diagrams": return <DiagramComponents />;
      // UI Foundation
      case "ui": return <UIComponents />;
      case "loaders": return <LoaderComponents />;
      case "effects": return <EffectsComponents />;
      case "ui-patterns": return <UIPatternsComponents />;
      // Platform & Safety
      case "clones": return <CloneComponents />;
      case "safety": return <SafetyComponents />;
      case "observability": return <ObservabilityComponents />;
      // Collaboration & Auth
      case "collaboration": return <CollaborationComponents />;
      case "auth": return <AuthComponents />;
      case "management": return <ManagementComponents />;
      // New categories
      case "layout": return <LayoutComponents />;
      case "theme": return <ThemeComponents />;
      case "speech": return <SpeechComponents />;
      case "feedback": return <FeedbackComponents />;
      case "threads": return <ThreadComponents />;
      case "utility": return <UtilityComponents />;
      case "translation": return <TranslationComponents />;
      case "dashboards": return <DashboardsComponents />;
      case "search": return <SearchComponents />;
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
          {/* Hero Section */}
          <HeroSection />

          {/* Header */}
          <header id="components" className="mb-8 pt-12 lg:pt-0"> {/* Added padding top for mobile menu button */}
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
