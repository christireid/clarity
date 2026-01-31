"use client";

import * as React from "react";
import { Chat } from "@/components/ai/chat/Chat";
import { useChat } from "@/components/ai/chat/Chat";
import { TokenOptimizer } from "@/lib/token-optimization/TokenOptimizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Zap, 
  Database, 
  Cpu, 
  ArrowRight,
  CheckCircle2,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";

// Initialize Optimizer
const optimizer = new TokenOptimizer({
  contextWindow: {
    maxTokens: 4000,
    strategy: 'hybrid',
    keepSystemMessages: true
  },
  memoryConfig: {
    shortTermSize: 10,
    longTermSize: 50,
    compressionThreshold: 100
  }
});

// Add some dummy RAG documents
optimizer.rag.addDocument("doc1", "Next.js is a React framework for building full-stack web applications. It supports Server Components.", { source: "docs" });
optimizer.rag.addDocument("doc2", "Token optimization is crucial for reducing AI costs and latency. Strategies include caching and compression.", { source: "whitepaper" });

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
          {stats.savedPercentage.toFixed(1)}% ({stats.saved} tokens)
        </Badge>
      </div>
    </div>
  );
}

function OptimizedChatInner() {
  const { addMessage, messages } = useChat();
  const [stats, setStats] = React.useState<any>(null);
  const [processingStep, setProcessingStep] = React.useState<string>("");
  const [ragContext, setRagContext] = React.useState<any[]>([]);

  const handleSend = async (content: string) => {
    // 1. Add User Message
    addMessage({ role: 'user', content, status: 'sent' });
    
    // 2. Simulate Optimization Pipeline
    setProcessingStep("🔍 Retrieving Context (RAG)...");
    const retrievedDocs = optimizer.rag.retrieve(content);
    setRagContext(retrievedDocs);
    await new Promise(r => setTimeout(r, 600));

    setProcessingStep("⚡ Optimizing Tokens...");
    const result = await optimizer.optimizeRequest(content, messages);
    setStats(result.stats);
    await new Promise(r => setTimeout(r, 600));

    setProcessingStep("🤖 Generating Response...");
    await new Promise(r => setTimeout(r, 800));

    setProcessingStep("");
    
    // 3. Add AI Response
    addMessage({ 
      role: 'assistant', 
      content: `I processed your request using the optimized context. Found ${retrievedDocs.length} relevant documents.`,
      metadata: { 
        stats: result.stats,
        ragCount: retrievedDocs.length
      }
    });
  };

  return (
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
            {processingStep && (
              <Badge variant="outline" className="animate-pulse">
                {processingStep}
              </Badge>
            )}
          </div>

          <Chat.Messages className="p-4" />
          
          <Chat.Input 
            onSend={handleSend}
            placeholder="Ask about Next.js or Token Optimization..."
            className="p-4 border-t border-border"
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
          {stats ? (
            <StatsCard stats={stats} />
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
          <div className="space-y-2">
            {ragContext.length > 0 ? (
              ragContext.map((doc, i) => (
                <div key={i} className="text-xs p-2 rounded bg-muted/50 border border-border">
                  <div className="font-medium mb-1 flex justify-between">
                    <span>{doc.id}</span>
                    <span className="text-muted-foreground">{doc.tokens} tokens</span>
                  </div>
                  <div className="opacity-80 line-clamp-2">{doc.content}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-8">
                No context retrieved yet
              </div>
            )}
          </div>
        </Card>

        {/* System Logs */}
        <Card className="p-4 space-y-4">
           <div className="flex items-center gap-2 font-semibold">
            <Terminal className="w-4 h-4" />
            <span>Optimization Log</span>
          </div>
          <div className="text-xs font-mono space-y-1 text-muted-foreground">
            <div>[System] Initialized hybrid strategy</div>
            <div>[Cache] Semantic cache warm</div>
            <div>[Router] Route: GPT-4o-mini (Low Cost)</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AdvancedAIShowcase() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced AI Engine</h1>
        <p className="text-muted-foreground">
          Demonstrating client-side Token Optimization, RAG, and Smart Routing.
        </p>
      </div>

      <Chat.Provider initialMessages={[
        { id: '1', role: 'assistant', content: 'Ready to optimize! Try asking about "Next.js" to test the RAG system.', timestamp: new Date() }
      ]}>
        <OptimizedChatInner />
      </Chat.Provider>
    </div>
  );
}
