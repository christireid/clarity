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
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  { id: "chat", label: "Chat & Messages", icon: MessageSquare, description: "Core chat interface components", group: "Core Chat" },
  { id: "input", label: "Input & Commands", icon: Command, description: "Advanced input with command palette", group: "Core Chat" },
  { id: "messaging", label: "Advanced Messaging", icon: MessageSquare, description: "Threads, pins, search, forward", group: "Core Chat" },
  { id: "voice", label: "Voice & Audio", icon: Activity, description: "Speech-to-text, TTS, recording", group: "Core Chat" },
  { id: "realtime", label: "Real-time Features", icon: Activity, description: "Presence, typing, reactions", group: "Core Chat" },
  // AI & Agents
  { id: "agent", label: "Agent & Tools", icon: Bot, description: "Tool calling and agent workflows", group: "AI & Agents" },
  { id: "generative", label: "Generative UI", icon: Boxes, description: "Streaming, suggestions, approvals", group: "AI & Agents" },
  { id: "memory", label: "Memory & Context", icon: Database, description: "Memory management and RAG", group: "AI & Agents" },
  { id: "tokens", label: "Token Management", icon: Zap, description: "Budget, optimization, and costs", group: "AI & Agents" },
  // Development
  { id: "code", label: "Code & Preview", icon: Code, description: "Code blocks, diffs, and previews", group: "Development" },
  { id: "dev", label: "Dev Tools", icon: TestTube, description: "Git, tests, and env variables", group: "Development" },
  { id: "prompts", label: "Prompt Tooling", icon: FileText, description: "Prompt chains and versioning", group: "Development" },
  { id: "canvas", label: "Canvas & Workflow", icon: Workflow, description: "Node-based visual editors", group: "Development" },
  // Data & Media
  { id: "data", label: "Data & Charts", icon: BarChart3, description: "Tables, charts, visualizations", group: "Data & Media" },
  { id: "media", label: "Media & Sources", icon: FileText, description: "Audio, images, citations", group: "Data & Media" },
  { id: "diagrams", label: "Diagrams & Links", icon: Link2, description: "Mermaid, link previews", group: "Data & Media" },
  // UI Foundation
  { id: "ui", label: "UI Primitives", icon: Keyboard, description: "Forms, hotkeys, notifications", group: "UI Foundation" },
  { id: "loaders", label: "Loading States", icon: Zap, description: "Skeletons and indicators", group: "UI Foundation" },
  { id: "effects", label: "Effects & Animations", icon: Sparkles, description: "Particles, text fx, interactions", group: "UI Foundation" },
  { id: "ui-patterns", label: "UI Patterns", icon: Boxes, description: "Marquee, tabs, carousels", group: "UI Foundation" },
  // Platform & Safety
  { id: "clones", label: "Platform Clones", icon: Laptop, description: "ChatGPT, Claude, Perplexity+", group: "Platform & Safety" },
  { id: "safety", label: "Safety & Guardrails", icon: Shield, description: "Moderation, PII, fact-check", group: "Platform & Safety" },
  { id: "observability", label: "Observability", icon: Activity, description: "Traces, costs, rate limits", group: "Platform & Safety" },
  // Collaboration & Auth
  { id: "collaboration", label: "Collaboration", icon: Users, description: "Real-time cursors, comments", group: "Collaboration" },
  { id: "auth", label: "Auth & Profile", icon: User, description: "Login, signup, profiles", group: "Collaboration" },
  { id: "management", label: "Settings", icon: Settings, description: "App settings and config", group: "Collaboration" },
  // New categories
  { id: "layout", label: "Layouts", icon: Boxes, description: "Page layouts and structures", group: "More" },
  { id: "theme", label: "Theming", icon: Sun, description: "Theme switching and customization", group: "More" },
  { id: "speech", label: "Speech", icon: Activity, description: "Voice input and text-to-speech", group: "More" },
  { id: "feedback", label: "Feedback", icon: MessageSquare, description: "Ratings, reviews, reports", group: "More" },
  { id: "threads", label: "Threads", icon: MessageSquare, description: "Thread management and lists", group: "More" },
  { id: "utility", label: "Utilities", icon: Keyboard, description: "Copy, paste, passwords", group: "More" },
  { id: "translation", label: "Translation", icon: FileText, description: "Language detection and i18n", group: "More" },
  { id: "dashboards", label: "Dashboards", icon: BarChart3, description: "Full-featured admin dashboards", group: "More" },
  { id: "search", label: "Web Search", icon: Search, description: "Search results and AI summaries", group: "More" },
];

// Group categories by their group
const categoryGroups = componentCategories.reduce((acc, cat) => {
  if (!acc[cat.group]) acc[cat.group] = [];
  acc[cat.group].push(cat);
  return acc;
}, {} as Record<string, typeof componentCategories>);

export default function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("chat");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});
  const { theme, setTheme } = useTheme();

  // Filter categories based on search
  const filteredCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return componentCategories;
    const query = searchQuery.toLowerCase();
    return componentCategories.filter(
      cat =>
        cat.label.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group filtered categories
  const filteredGroups = React.useMemo(() => {
    return filteredCategories.reduce((acc, cat) => {
      if (!acc[cat.group]) acc[cat.group] = [];
      acc[cat.group].push(cat);
      return acc;
    }, {} as Record<string, typeof componentCategories>);
  }, [filteredCategories]);

  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

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

  const activeItem = componentCategories.find(c => c.id === activeCategory);

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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Clarity</h1>
              <p className="text-xs text-muted-foreground">AI Components</p>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-background"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <nav className="space-y-4">
              {Object.entries(filteredGroups).map(([group, categories]) => (
                <div key={group}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group)}
                    className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                  >
                    {group}
                    <ChevronRight className={cn(
                      "h-3 w-3 transition-transform",
                      !collapsedGroups[group] && "rotate-90"
                    )} />
                  </button>
                  {!collapsedGroups[group] && (
                    <div className="mt-1 space-y-0.5">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => {
                            setActiveCategory(category.id);
                            if (window.innerWidth < 1024) {
                              setSidebarOpen(false);
                            }
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                            activeCategory === category.id
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-muted text-foreground"
                          )}
                        >
                          <category.icon className="h-4 w-4 shrink-0" />
                          <span className="font-medium text-sm truncate">{category.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="my-2 border-t border-border/50" />

              {/* Quick Links */}
              <div className="space-y-1">
                <a
                  href="/advanced-ai"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted text-foreground group"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/10">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                  <span className="font-medium text-sm flex-1">Advanced AI Demo</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                </a>
                <a
                  href="/design-system"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted text-foreground group"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-violet-500/10">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  </div>
                  <span className="font-medium text-sm flex-1">Design System</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                </a>
              </div>
            </nav>

            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Quick Install</span>
              </div>
              <code className="text-xs text-muted-foreground block break-all font-mono bg-muted/50 p-2 rounded">
                npx clarity-ai init
              </code>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {componentCategories.length} components
                </Badge>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
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

          {/* Breadcrumb & Header */}
          <header id="components" className="mb-8 pt-12 lg:pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Components</span>
              <ChevronRight className="h-4 w-4" />
              <span>{activeItem?.group}</span>
              <ChevronRight className="h-4 w-4" />
              <Badge variant="secondary">{activeItem?.label}</Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {activeItem?.label} Components
            </h2>
            <p className="text-lg text-muted-foreground">
              {activeItem?.description}
            </p>
          </header>

          {/* Component Sections */}
          <div className="space-y-12">
            {renderActiveComponent()}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>Built with React, TypeScript, and Tailwind CSS</p>
              <div className="flex items-center gap-4">
                <a href="/advanced-ai" className="hover:text-foreground transition-colors">
                  Advanced Demo
                </a>
                <a href="/design-system" className="hover:text-foreground transition-colors">
                  Design System
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
