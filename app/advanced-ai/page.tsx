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
  Terminal,
  Activity
} from "lucide-react";
import { SDKDevTools } from "@/components/ai/devtools/SDKDevTools";

// Initialize Optimizer for display purposes
const optimizer = new TokenOptimizer({
  contextWindow: { maxTokens: 4000, strategy: 'hybrid' },
  memoryConfig: { shortTermSize: 10, longTermSize: 50, compressionThreshold: 100 }
});
optimizer.rag.addDocument("doc1", "Next.js is a React framework for building full-stack web applications.", { source: "docs" });
optimizer.rag.addDocument("doc2", "Token optimization reduces AI costs by compressing prompts.", { source: "whitepaper" });

export default function AdvancedAIShowcase() {
  const { 
    messages, 
    append, 
    isLoading, 
    setMessages, 
    optimizationStats,
    streamLogs
  } = useAdvancedChat({
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Ready to optimize! Try asking about "Next.js" or type "Show me a chart".', timestamp: new Date() }
    ]
  });

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

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl relative">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced AI Engine</h1>
        <p className="text-muted-foreground">
          Powered by <code>useAdvancedChat</code> hook with built-in Token Optimization, Streaming, & Virtualization.
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

              {/* Use Virtualized List for Performance */}
              <Chat.VirtualizedMessages className="p-4" />
              
              <Chat.Input 
                onSend={handleSend}
                placeholder="Type 'chart', 'form', or ask a question..."
                className="p-4 border-t border-border"
                slashCommands={slashCommands}
              />
            </Chat>
          </div>

          {/* Right: Inspector Panel (now using DevTools) */}
          <div className="space-y-6 overflow-y-auto pr-2">
             <Card className="p-6 bg-muted/20 border-dashed">
               <div className="text-center space-y-2">
                 <Activity className="w-8 h-8 mx-auto text-muted-foreground" />
                 <h3 className="font-medium">SDK DevTools</h3>
                 <p className="text-sm text-muted-foreground">
                   Check the floating panel in the bottom right corner for real-time inspection.
                 </p>
               </div>
             </Card>
          </div>
        </div>
      </Chat.Provider>

      {/* Floating DevTools */}
      <SDKDevTools 
        optimizerStats={optimizationStats} 
        streamLogs={streamLogs}
        ragContext={[]} // Pass real RAG context if available from hook
      />
    </div>
  );
}
