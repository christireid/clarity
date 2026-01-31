"use client";

import * as React from "react";
import { Chat } from "@/components/ai/chat/Chat";
import { useAdvancedChat } from "@/components/ai/chat/useAdvancedChat";
import { TokenOptimizer } from "@/lib/token-optimization/TokenOptimizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Zap, 
  Database, 
  Cpu, 
  Terminal
} from "lucide-react";

// Initialize Optimizer for display purposes (the hook has its own instance, or we could pass it)
const optimizer = new TokenOptimizer({
  contextWindow: { maxTokens: 4000, strategy: 'hybrid' },
  memoryConfig: { shortTermSize: 10, longTermSize: 50, compressionThreshold: 100 }
});
optimizer.rag.addDocument("doc1", "Next.js is a React framework for building full-stack web applications.", { source: "docs" });
optimizer.rag.addDocument("doc2", "Token optimization reduces AI costs by compressing prompts.", { source: "whitepaper" });

function StatsCard({ stats }: { stats: any }) {
  if (!stats) return null;
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 space-y-1">
        <div className="text-xs text-muted-foreground">Original Tokens</div>
        <div className="text-2xl font-bold">{stats.original}</div>
      </div>
      <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 space-y-1">
        <div className="text-xs text-emerald-600 dark:text-emerald-400">Optimized</div>
        <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{stats.optimized}</div>
      </div>
      <div className="col-span-2 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-border flex items-center justify-between">
        <span className="text-sm font-medium">Savings</span>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400">
          {stats.savedPercentage?.toFixed(1) || 0}% ({stats.saved} tokens)
        </Badge>
      </div>
    </div>
  );
}

export default function AdvancedAIShowcase() {
  const { 
    messages, 
    append, 
    isLoading, 
    setMessages, 
    optimizationStats 
  } = useAdvancedChat({
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Ready to optimize! Try asking about "Next.js" or type "Show me a chart".', timestamp: new Date() }
    ]
  });

  // Map hook state to ChatContext interface
  const chatContextValue = {
    messages,
    addMessage: async (msg: any) => {
       await append({ ...msg, id: Date.now().toString(), timestamp: new Date() });
    },
    updateMessage: (id: string, updates: any) => {
      setMessages(messages.map(m => m.id === id ? { ...m, ...updates } : m));
    },
    deleteMessage: (id: string) => {
      setMessages(messages.filter(m => m.id !== id));
    },
    isLoading,
    error: undefined
  };

  const handleSend = async (content: string) => {
    await append({ 
      id: Date.now().toString(),
      role: 'user', 
      content, 
      timestamp: new Date(),
      status: 'sent' 
    });
  };

  const slashCommands = [
    { id: '1', label: 'optimize', description: 'Force optimization', action: () => {} },
    { id: '2', label: 'chart', description: 'Generate chart', action: () => handleSend('Show me a chart') },
    { id: '3', label: 'form', description: 'Generate form', action: () => handleSend('Show me a form') },
  ];

  const mentions = [
    { id: '1', label: 'docs', type: 'variable' as const },
    { id: '2', label: 'rag', type: 'variable' as const },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced AI Engine</h1>
        <p className="text-muted-foreground">
          Powered by <code>useAdvancedChat</code> hook with built-in Token Optimization & Generative UI.
        </p>
      </div>

      <Chat.Provider value={chatContextValue}>
        <div className="grid lg:grid-cols-3 gap-6 h-[700px]">
          {/* Left: Chat Interface */}
          <div className="lg:col-span-2 h-full">
            <Chat className="h-full border border-border rounded-2xl shadow-sm bg-background">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Optimized Chat</h2>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> Token Saver Active</span>
                    </div>
                  </div>
                </div>
                {isLoading && (
                  <Badge variant="outline" className="animate-pulse">
                    Processing...
                  </Badge>
                )}
              </div>

              <Chat.Messages className="p-4" />
              
              <Chat.Input 
                onSend={handleSend}
                placeholder="Type 'chart', 'form', or ask a question..."
                className="p-4 border-t border-border"
                slashCommands={slashCommands}
                mentions={mentions}
              />
            </Chat>
          </div>

          {/* Right: Inspector Panel */}
          <div className="space-y-6 overflow-y-auto pr-2">
            {/* Stats Panel */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <BarChart3 className="w-4 h-4" />
                <span>Token Usage</span>
              </div>
              {optimizationStats ? (
                <StatsCard stats={optimizationStats} />
              ) : (
                <div className="text-sm text-muted-foreground text-center py-8">
                  Send a message to see token stats
                </div>
              )}
            </Card>

            {/* RAG Context Panel */}
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <Database className="w-4 h-4" />
                <span>Retrieved Context</span>
              </div>
              <div className="text-sm text-muted-foreground text-center py-8">
                 (RAG context is handled internally by the hook)
              </div>
            </Card>

            {/* System Logs */}
            <Card className="p-4 space-y-4">
               <div className="flex items-center gap-2 font-semibold">
                <Terminal className="w-4 h-4" />
                <span>System Log</span>
              </div>
              <div className="text-xs font-mono space-y-1 text-muted-foreground">
                <div>[System] useAdvancedChat initialized</div>
                <div>[Optimizer] Hybrid strategy active</div>
                {isLoading && <div>[System] Processing request...</div>}
              </div>
            </Card>
          </div>
        </div>
      </Chat.Provider>
    </div>
  );
}
