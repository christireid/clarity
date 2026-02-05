"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ExternalLink,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ComponentCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  code?: string;
  componentName?: string;
  tags?: string[];
  fullWidth?: boolean;
}

export function ComponentCard({
  title,
  description,
  children,
  className,
  code,
  componentName,
  tags,
  fullWidth = false,
}: ComponentCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const importStatement = componentName
    ? `import { ${componentName} } from "@/components/ai";`
    : null;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md font-sans",
        className
      )}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold leading-none tracking-tight font-sans">
                {title}
              </h3>
              {componentName && (
                <Badge variant="outline" className="text-xs font-mono">
                  {componentName}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2 font-sans">{description}</p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-2 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {code && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowCode(!showCode)}
                title="Toggle code"
              >
                <Code className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setExpanded(!expanded)}
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Code Preview */}
      {code && showCode && (
        <div className="px-6 pb-4">
          <div className="relative rounded-lg border border-border bg-muted/50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
              <span className="text-xs font-medium text-muted-foreground">
                Usage
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs">
              <code className="text-foreground">
                {importStatement && (
                  <span className="text-muted-foreground">
                    {importStatement}
                    {"\n\n"}
                  </span>
                )}
                {code}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Component Preview */}
      <div
        className={cn(
          "mx-6 mb-6 rounded-lg border border-border bg-background/50 relative transition-all",
          expanded ? "p-8 min-h-[400px] max-h-[80vh] overflow-auto" : "p-4 md:p-6 min-h-[150px] max-h-[500px] overflow-auto",
          fullWidth && "mx-0 rounded-none border-x-0"
        )}
      >
        <div
          className={cn(
            "relative z-10",
            !fullWidth && "flex items-center justify-center",
            fullWidth && "w-full"
          )}
        >
          {children}
        </div>
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  );
}

// Simple variant for basic demos
export function SimpleCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 space-y-3 max-h-[400px] overflow-auto font-sans",
        className
      )}
    >
      <h4 className="text-sm font-medium text-muted-foreground font-sans">{title}</h4>
      <div>{children}</div>
    </div>
  );
}
