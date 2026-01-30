"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Terminal as TerminalIcon,
  X,
  Minus,
  Square,
  Copy,
  Check,
  Play,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Terminal Line Types
interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "info" | "success" | "warning";
  content: string;
  timestamp?: Date;
  prompt?: string;
}

interface TerminalProps {
  lines?: TerminalLine[];
  title?: string;
  onCommand?: (command: string) => void;
  interactive?: boolean;
  className?: string;
  maxHeight?: string;
  showTimestamps?: boolean;
  prompt?: string;
  isExecuting?: boolean;
}

export function Terminal({
  lines = [],
  title = "Terminal",
  onCommand,
  interactive = false,
  className,
  maxHeight = "400px",
  showTimestamps = false,
  prompt = "$",
  isExecuting = false,
}: TerminalProps) {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isExecuting) return;

    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    onCommand?.(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const copyToClipboard = async () => {
    const text = lines.map((l) => l.content).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      case "input":
        return "text-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-[#0d0d0d] overflow-hidden font-mono text-sm",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 ml-3 text-muted-foreground">
            <TerminalIcon className="w-4 h-4" />
            <span className="text-xs">{title}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="p-4 overflow-y-auto scrollbar-thin"
        style={{ maxHeight }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className="flex items-start gap-2 py-0.5">
            {showTimestamps && line.timestamp && (
              <span className="text-xs text-muted-foreground/50 shrink-0">
                {line.timestamp.toLocaleTimeString()}
              </span>
            )}
            {line.type === "input" && (
              <span className="text-green-400 shrink-0">
                {line.prompt || prompt}
              </span>
            )}
            <span
              className={cn(
                "whitespace-pre-wrap break-all",
                getLineColor(line.type)
              )}
            >
              {line.content}
            </span>
          </div>
        ))}

        {/* Input Line */}
        {interactive && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-green-400 shrink-0">{prompt}</span>
            {isExecuting ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Executing...</span>
              </div>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-foreground caret-green-400"
                autoFocus
              />
            )}
          </form>
        )}

        {/* Blinking Cursor */}
        {!interactive && (
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}

// Compact Terminal Output
interface TerminalOutputProps {
  output: string;
  status?: "running" | "success" | "error" | "idle";
  className?: string;
}

export function TerminalOutput({
  output,
  status = "idle",
  className,
}: TerminalOutputProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-[#0d0d0d] font-mono text-xs overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border-b border-border">
        {status === "running" && (
          <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
        )}
        {status === "success" && (
          <Check className="w-3 h-3 text-green-400" />
        )}
        {status === "error" && <X className="w-3 h-3 text-red-400" />}
        <span className="text-muted-foreground">Output</span>
      </div>
      <pre className="p-3 text-muted-foreground whitespace-pre-wrap overflow-x-auto">
        {output}
      </pre>
    </div>
  );
}

// Stack Trace Component
interface StackTraceProps {
  error: string;
  stack?: string[];
  className?: string;
}

export function StackTrace({ error, stack = [], className }: StackTraceProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={cn(
        "rounded-md border border-red-500/30 bg-red-500/5 font-mono text-xs overflow-hidden",
        className
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-500/10 transition-colors"
      >
        <ChevronRight
          className={cn(
            "w-3 h-3 text-red-400 transition-transform",
            expanded && "rotate-90"
          )}
        />
        <X className="w-3 h-3 text-red-400" />
        <span className="text-red-400 font-medium">Error</span>
        <span className="text-red-300/80 truncate flex-1">{error}</span>
      </button>

      {expanded && stack.length > 0 && (
        <div className="px-3 pb-3 border-t border-red-500/20">
          <div className="mt-2 space-y-1">
            {stack.map((frame, i) => (
              <div
                key={i}
                className="text-red-300/60 pl-5 hover:text-red-300 cursor-pointer"
              >
                at {frame}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Test Results Component
interface TestResult {
  name: string;
  status: "passed" | "failed" | "skipped" | "running";
  duration?: number;
  error?: string;
}

interface TestResultsProps {
  title?: string;
  results: TestResult[];
  summary?: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
  };
  className?: string;
}

export function TestResults({
  title = "Test Results",
  results,
  summary,
  className,
}: TestResultsProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">{title}</span>
        </div>
        {summary && (
          <div className="flex items-center gap-3 text-xs">
            <span className="text-green-500">{summary.passed} passed</span>
            {summary.failed > 0 && (
              <span className="text-red-500">{summary.failed} failed</span>
            )}
            {summary.skipped > 0 && (
              <span className="text-yellow-500">{summary.skipped} skipped</span>
            )}
            <span className="text-muted-foreground">{summary.duration}ms</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {summary && (
        <div className="h-1 flex bg-muted">
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${(summary.passed / summary.total) * 100}%` }}
          />
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${(summary.failed / summary.total) * 100}%` }}
          />
          <div
            className="bg-yellow-500 transition-all"
            style={{ width: `${(summary.skipped / summary.total) * 100}%` }}
          />
        </div>
      )}

      {/* Results */}
      <div className="divide-y divide-border">
        {results.map((result, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-2 text-sm hover:bg-muted/30"
          >
            <div className="flex items-center gap-3">
              {result.status === "passed" && (
                <Check className="w-4 h-4 text-green-500" />
              )}
              {result.status === "failed" && (
                <X className="w-4 h-4 text-red-500" />
              )}
              {result.status === "skipped" && (
                <Minus className="w-4 h-4 text-yellow-500" />
              )}
              {result.status === "running" && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
              <span
                className={cn(
                  result.status === "failed" && "text-red-500",
                  result.status === "skipped" && "text-muted-foreground"
                )}
              >
                {result.name}
              </span>
            </div>
            {result.duration !== undefined && (
              <span className="text-xs text-muted-foreground">
                {result.duration}ms
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
