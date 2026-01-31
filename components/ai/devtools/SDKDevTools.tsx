"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Activity, Database, Zap, Minimize2, Maximize2, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DevToolsProps {
  optimizerStats?: any;
  streamLogs?: string[];
  ragContext?: any[];
  isOpen?: boolean;
}

export function SDKDevTools({ optimizerStats, streamLogs = [], ragContext = [] }: DevToolsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tokens');

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg gap-2 bg-background"
        onClick={() => setIsOpen(true)}
      >
        <Activity className="w-4 h-4" />
        SDK DevTools
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-[400px] h-[500px] shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Activity className="w-4 h-4" />
          SDK Inspector
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <Minimize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <div className="px-3 pt-3">
          <TabsList className="w-full">
            <TabsTrigger value="tokens" className="flex-1 text-xs">Tokens</TabsTrigger>
            <TabsTrigger value="stream" className="flex-1 text-xs">Stream</TabsTrigger>
            <TabsTrigger value="rag" className="flex-1 text-xs">RAG</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden p-3">
          <TabsContent value="tokens" className="h-full m-0 space-y-4">
            {optimizerStats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Original</div>
                    <div className="text-xl font-bold">{optimizerStats.original}</div>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Optimized</div>
                    <div className="text-xl font-bold text-emerald-600">{optimizerStats.optimized}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm p-2 border rounded-md">
                  <span>Savings</span>
                  <Badge variant="secondary">{optimizerStats.savedPercentage?.toFixed(1)}%</Badge>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                No optimization data
              </div>
            )}
          </TabsContent>

          <TabsContent value="stream" className="h-full m-0">
            <ScrollArea className="h-full rounded-md border p-2 bg-muted/30">
              <div className="space-y-1 font-mono text-xs">
                {streamLogs.length > 0 ? (
                  streamLogs.map((log, i) => (
                    <div key={i} className="break-all border-b border-border/50 pb-1 mb-1 last:border-0">
                      <span className="text-muted-foreground opacity-50">[{i}]</span> {log}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground pt-8">No stream logs</div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="rag" className="h-full m-0">
             <ScrollArea className="h-full rounded-md border p-2 bg-muted/30">
              <div className="space-y-2">
                {ragContext.length > 0 ? (
                  ragContext.map((doc, i) => (
                    <div key={i} className="p-2 bg-background border rounded text-xs space-y-1">
                      <div className="font-semibold flex justify-between">
                        <span>{doc.id}</span>
                        <Badge variant="outline" className="text-[10px] h-4">Doc</Badge>
                      </div>
                      <div className="text-muted-foreground line-clamp-3">
                        {doc.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground pt-8">No RAG context</div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
