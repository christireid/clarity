"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../Chat';
import { ChatBubble } from '../ChatBubble';
import { cn } from '@/lib/utils';
import type { Message } from '../types';

interface VirtualizedChatListProps {
  className?: string;
  renderBubble?: (message: Message) => React.ReactNode;
}

/**
 * Virtualized Chat List Component
 *
 * Note: For full virtualization support, install:
 * - react-window
 * - react-virtualized-auto-sizer
 *
 * This component provides a basic scrollable chat list implementation.
 * For large chat histories (1000+ messages), consider adding virtualization.
 */
export function VirtualizedChatList({ className, renderBubble }: VirtualizedChatListProps) {
  const { messages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(true);
  const lastMessageCountRef = useRef(messages.length);

  // Handle scroll events to detect if user scrolled up
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsSticky(isAtBottom);
  };

  // Scroll to bottom when messages change, ONLY if sticky
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current && isSticky && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    lastMessageCountRef.current = messages.length;
  }, [messages.length, isSticky]);

  // Initial scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsSticky(true);
    }
  };

  return (
    <div className={cn("flex-1 h-full min-h-0 relative", className)}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scrollbar-thin"
      >
        <div className="flex flex-col gap-4 p-4">
          {messages.map((message) => (
            <div key={message.id}>
              {renderBubble ? renderBubble(message) : <ChatBubble message={message} />}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Bottom Button (Visible when not sticky) */}
      {!isSticky && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs shadow-lg animate-in fade-in"
        >
          Scroll to bottom
        </button>
      )}
    </div>
  );
}
