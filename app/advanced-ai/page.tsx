"use client";

import * as React from "react";
import { Chat } from "@/components/ai/chat/Chat";
import { useAdvancedChat } from "@/components/ai/chat/useAdvancedChat";
import { TokenOptimizer } from "@/lib/token-optimization/TokenOptimizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Cpu, 
  Activity,
  StopCircle,
  RotateCw
} from "lucide-react";
import { SDKDevTools } from "@/components/ai/devtools/SDKDevTools";

// Initialize Optimizer
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
    streamLogs,
    stop,
    reload
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
    <div className="container mx-auto py-8 px-4 max-w-7xl relative h-screen max-h-[900px] flex flex-col">
      <div className="mb-6 space-y-2 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">Advanced AI Engine</h1>
        <p className="text-muted-foreground">
          Powered by <code>useAdvancedChat</code> hook with built-in Token Optimization, Streaming, & Virtualization.
        </p>
      </div>

      <Chat.Provider value={chatContextValue}>
        <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Left: Chat Interface */}
          <div className="lg:col-span-2 h-full flex flex-col min-h-0">
            <Chat className="h-full border border-border rounded-2xl shadow-sm bg-background flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
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
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <Button variant="destructive" size="sm" onClick={stop} className="h-8 gap-2">
                      <StopCircle className="w-4 h-4" /> Stop
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => reload()} className="h-8 gap-2">
                      <RotateCw className="w-4 h-4" /> Regenerate
                    </Button>
                  )}
                </div>
              </div>

              {/* Use Virtualized List for Performance */}
              <Chat.VirtualizedMessages 
                className="p-4" 
                renderBubble={(msg) => (
                  <Chat.Bubble 
                    message={msg} 
                    onCopy={() => console.log('Copied')} 
                    onRegenerate={() => reload()}
                    onFeedback={(type) => console.log('Feedback', type)}
                  />
                )}
              />
              
              <Chat.Input 
                onSend={handleSend}
                placeholder="Type 'chart', 'form', or ask a question..."
                className="p-4 border-t border-border shrink-0"
                slashCommands={slashCommands}
              />
            </Chat>
          </div>

          {/* Right: Inspector Panel */}
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
        ragContext={[]}
      />
    </div>
  );
}
