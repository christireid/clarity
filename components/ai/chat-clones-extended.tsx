"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Sparkles,
  Plus,
  MoreVertical,
  User,
  Code,
  Image as ImageIcon,
  Zap,
  Clock,
  CheckCircle2,
} from "lucide-react";

// =============================================================================
// MANUS CHAT CLONE - Minimalist, dev-focused chat
// =============================================================================

interface ManusMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

interface ManusChatProps {
  className?: string;
}

export function ManusChat({ className }: ManusChatProps) {
  const [messages, setMessages] = React.useState<ManusMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey! I'm Manus. I can help you build, debug, and ship code faster. What are you working on?",
      timestamp: new Date(),
      status: "sent",
    },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ManusMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I can help you with that! Let me analyze your code and suggest improvements...",
          timestamp: new Date(),
          status: "sent",
        },
      ]);
    }, 1000);
  };

  return (
    <div className={cn("flex h-[600px] flex-col bg-background border border-border rounded-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Manus</h3>
            <p className="text-xs text-muted-foreground">AI Coding Assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-blue-500 to-purple-500"
                    : "bg-accent"
                )}
              >
                {message.role === "assistant" ? (
                  <Code className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={cn(
                  "flex-1 max-w-[80%] rounded-lg p-3 text-sm",
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.content}
                <div className="flex items-center gap-1 mt-1 text-xs opacity-60">
                  <Clock className="w-3 h-3" />
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.status === "sent" && <CheckCircle2 className="w-3 h-3 ml-1" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Manus anything about code..."
            className="flex-1"
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// EMERGENT CHAT CLONE - Professional, agent-focused chat
// =============================================================================

interface EmergentMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  thinking?: boolean;
  tools?: string[];
}

interface EmergentChatProps {
  className?: string;
}

export function EmergentChat({ className }: EmergentChatProps) {
  const [messages, setMessages] = React.useState<EmergentMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm E1, your AI coding agent. I can build full-stack applications, debug issues, and help you ship faster. What would you like to build today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: EmergentMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'll help you build that! Let me start by analyzing the requirements and setting up the project structure...",
          timestamp: new Date(),
          tools: ["Code Generation", "File System", "Testing"],
        },
      ]);
    }, 2000);
  };

  return (
    <div className={cn("flex h-[600px] flex-col bg-gradient-to-b from-background to-accent/5 border border-border rounded-lg shadow-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 p-4 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Emergent AI</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500" />
              E1 Agent - Ready
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <Plus className="w-3 h-3 mr-1" />
            New Chat
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500"
                    : "bg-gradient-to-br from-orange-400 to-pink-500"
                )}
              >
                {message.role === "assistant" ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 max-w-[85%] space-y-2">
                <div
                  className={cn(
                    "rounded-2xl p-4 text-sm shadow-sm",
                    message.role === "assistant"
                      ? "bg-card border border-border"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {message.content}
                </div>
                {message.tools && (
                  <div className="flex gap-2 flex-wrap">
                    {message.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 max-w-[85%]">
                <div className="rounded-2xl p-4 bg-card border border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0s" }} />
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                    <span>E1 is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/50 p-4 bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-background"
          />
          <Button onClick={handleSend} className="shrink-0 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// LOVEABLE CHAT CLONE - Friendly, creative chat
// =============================================================================

interface LoveableMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  reaction?: string;
}

interface LoveableChatProps {
  className?: string;
}

export function LoveableChat({ className }: LoveableChatProps) {
  const [messages, setMessages] = React.useState<LoveableMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! 👋 I'm here to help you create something amazing! Whether it's a website, an app, or anything in between, let's bring your ideas to life together. What's on your mind?",
      timestamp: new Date(),
      reaction: "💜",
    },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: LoveableMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "That sounds wonderful! ✨ I love it! Let me help you design and build that. We'll make it beautiful and functional!",
          timestamp: new Date(),
          reaction: "🎨",
        },
      ]);
    }, 1500);
  };

  return (
    <div className={cn("flex h-[600px] flex-col bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border border-pink-200 dark:border-pink-800 rounded-2xl shadow-xl", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-200 dark:border-pink-800 p-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center animate-pulse">
            <span className="text-xl">💜</span>
          </div>
          <div>
            <h3 className="font-bold text-sm bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Loveable</h3>
            <p className="text-xs text-muted-foreground">Your Creative AI Partner</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 items-start",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md",
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400"
                    : "bg-gradient-to-br from-orange-400 to-rose-400"
                )}
              >
                {message.role === "assistant" ? (
                  <span className="text-sm">💜</span>
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 max-w-[80%] space-y-2">
                <div
                  className={cn(
                    "rounded-3xl p-4 text-sm shadow-md",
                    message.role === "assistant"
                      ? "bg-white dark:bg-gray-900 border border-pink-200 dark:border-pink-800"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  )}
                >
                  {message.content}
                </div>
                <div className="flex items-center gap-2">
                  {message.reaction && (
                    <span className="text-lg">{message.reaction}</span>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-pink-200 dark:border-pink-800 p-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-b-2xl">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full border-pink-300 hover:bg-pink-100">
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Tell me what you'd love to create... ✨"
            className="flex-1 rounded-full border-pink-300 focus:border-purple-400 bg-white dark:bg-gray-900"
          />
          <Button 
            onClick={handleSend} 
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
