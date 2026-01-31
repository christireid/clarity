"use client";

import * as React from "react";
import { Chat } from "@/components/ai/chat/Chat";
import { useAdvancedChat } from "@/components/ai/chat/useAdvancedChat";
import { TokenOptimizer } from "@/lib/token-optimization/TokenOptimizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, Cpu, Activity, StopCircle, RotateCw, Download, FileText, Trash2
} from "lucide-react";
import { SDKDevTools } from "@/components/ai/devtools/SDKDevTools";
import { Attachment } from "@/components/ai/chat/types";

// Initialize Optimizer
const optimizer = new TokenOptimizer({
  contextWindow: { maxTokens: 4000, strategy: 'hybrid' },
  memoryConfig: { shortTermSize: 10, longTermSize: 50, compressionThreshold: 100 }
});
optimizer.rag.addDocument("doc1", "Next.js is a React framework for building full-stack web applications.", { source: "docs" });
optimizer.rag.addDocument("doc2", "Token optimization reduces AI costs by compressing prompts.", { source: "whitepaper" });

export default function AdvancedAIShowcase() {
  const { 
    messages, append, isLoading, setMessages, optimizationStats, streamLogs, stop, reload, ragContext, config, setConfig, clear, contextWindow
  } = useAdvancedChat({
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Ready to optimize! Try asking about "Next.js", type "Show me a chart", or drop an image file.', timestamp: new Date() }
    ],
    // Enable Persistence
    persistenceKey: 'advanced-ai-chat-history-v1',
    initialConfig: {
      systemPrompt: 'You are a helpful assistant. Current date is {{date}}.',
      temperature: 0.7,
      model: 'gpt-4o'
    }
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

  const handleSend = async (content: string, attachments?: Attachment[]) => {
    await append({ 
      id: Date.now().toString(),
      role: 'user', 
      content, 
      timestamp: new Date(),
      status: 'sent',
      attachments 
    });
  };

  const handleExport = () => {
    const data = JSON.stringify(messages, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
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
          Powered by <code>useAdvancedChat</code> hook with built-in Token Optimization, Streaming, Virtualization & Multimodal Support.
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
                  <Button variant="ghost" size="icon" onClick={clear} title="Clear History" className="text-destructive/70 hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleExport} title="Export Chat">
                    <Download className="w-4 h-4" />
                  </Button>
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
                placeholder="Type 'chart', 'form', or drop files..."
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
        ragContext={ragContext}
        config={config}
        onConfigChange={setConfig}
        contextWindow={contextWindow}
      />
    </div>
  );
}
