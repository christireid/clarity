"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { User, Bot, CheckCircle2, Clock, AlertCircle, Copy, ThumbsUp, ThumbsDown, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Message } from "./types";
import { renderGenerativeComponent } from "./GenerativeUIRegistry";

/**
 * ChatBubble - Individual message bubble
 * Supports user/assistant/system roles with proper accessibility
 */

interface ChatBubbleProps {
  message: Message;
  className?: string;
  onCopy?: (content: string) => void;
  onRegenerate?: () => void;
  onFeedback?: (type: 'up' | 'down') => void;
}

export function ChatBubble({ message, className, onCopy, onRegenerate, onFeedback }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const isSystem = message.role === 'system';
  const [copied, setCopied] = React.useState(false);

  const StatusIcon = {
    sending: Clock,
    sent: CheckCircle2,
    error: AlertCircle,
  }[message.status || 'sent'];

  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content);
    } else {
      navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser && "flex-row-reverse",
        className
      )}
      role="article"
      aria-label={`${message.role} message`}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isAssistant && "gradient-pastel-purple",
          isUser && "bg-neutral-200 dark:bg-neutral-800",
          isSystem && "bg-neutral-300 dark:bg-neutral-700"
        )}
        aria-hidden="true"
      >
        {isAssistant && <Bot className="w-4 h-4 text-neutral-700" />}
        {isUser && <User className="w-4 h-4 text-neutral-600" />}
        {isSystem && <span className="text-xs font-medium text-neutral-600">SYS</span>}
      </div>

      {/* Message Content */}
      <div className={cn("flex-1 max-w-[80%] space-y-1", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-lg p-3 text-sm relative group/bubble",
            isAssistant && "glass-medium",
            isUser && "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900",
            isSystem && "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          )}
        >
          {message.content}
          {message.metadata?.component && (
            <div className="mt-3 w-full border-t border-border/10 pt-3">
              {renderGenerativeComponent(message.metadata.component, message.metadata.props)}
            </div>
          )}
        </div>

        {/* Metadata & Actions */}
        <div className={cn("flex items-center gap-2 text-xs text-muted-foreground min-h-[20px]", isUser && "flex-row-reverse")}>
          <time dateTime={message.timestamp.toISOString()}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
          {message.status && StatusIcon && (
            <StatusIcon 
              className={cn(
                "w-3 h-3",
                message.status === 'error' && "text-error-500"
              )} 
              aria-label={message.status}
            />
          )}

          {/* Action Buttons (Visible on Hover) */}
          {!isUser && message.status !== 'sending' && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                onClick={handleCopy}
                title="Copy message"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              </Button>
              {onRegenerate && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  onClick={onRegenerate}
                  title="Regenerate"
                >
                  <RotateCw className="w-3 h-3" />
                </Button>
              )}
              {onFeedback && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    onClick={() => onFeedback('up')}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    onClick={() => onFeedback('down')}
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ChatBubble.List - Renders list of bubbles
 */
interface ChatBubbleListProps {
  items: Message[];
  className?: string;
  renderItem?: (message: Message) => React.ReactNode;
}

export function ChatBubbleList({ items, className, renderItem }: ChatBubbleListProps) {
  return (
    <div className={cn("space-y-4", className)} role="list" aria-label="Messages">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          {renderItem ? renderItem(item) : <ChatBubble message={item} />}
        </div>
      ))}
    </div>
  );
}

// Attach subcomponent
ChatBubble.List = ChatBubbleList;
