"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Send, Paperclip, Smile, AtSign, Slash, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SlashCommand, Mention } from "./types";
import { useVoice } from "./useVoice";

/**
 * ChatInput - Advanced input with slash commands, mentions, and voice
 */

interface ChatInputProps {
  onSend: (content: string) => void;
  placeholder?: string;
  className?: string;
  slashCommands?: SlashCommand[];
  mentions?: Mention[];
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  placeholder = "Type a message...",
  className,
  slashCommands = [],
  mentions = [],
  disabled,
}: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const [showSlashMenu, setShowSlashMenu] = React.useState(false);
  const [showMentionMenu, setShowMentionMenu] = React.useState(false);
  const [slashQuery, setSlashQuery] = React.useState("");
  const [mentionQuery, setMentionQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = React.useState(0);

  // Voice Hook
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported } = useVoice();

  // Sync voice transcript to input
  React.useEffect(() => {
    if (transcript) {
      setValue(prev => {
        // Simple append for now. A real app might handle cursor position better.
        return transcript;
      });
    }
  }, [transcript]);

  // Handle Voice Toggle
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
      inputRef.current?.focus();
    }
  };

  // Filter slash commands
  const filteredCommands = React.useMemo(() => {
    if (!slashQuery) return slashCommands;
    return slashCommands.filter(cmd =>
      cmd.label.toLowerCase().includes(slashQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(slashQuery.toLowerCase()) ||
      cmd.keywords?.some(k => k.toLowerCase().includes(slashQuery.toLowerCase()))
    );
  }, [slashCommands, slashQuery]);

  // Filter mentions
  const filteredMentions = React.useMemo(() => {
    if (!mentionQuery) return mentions;
    return mentions.filter(m =>
      m.label.toLowerCase().includes(mentionQuery.toLowerCase())
    );
  }, [mentions, mentionQuery]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursor = e.target.selectionStart;
    setValue(newValue);
    setCursorPosition(cursor);

    // Check for slash command
    const textBeforeCursor = newValue.slice(0, cursor);
    const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
    
    if (lastSlashIndex !== -1 && lastSlashIndex === textBeforeCursor.length - 1) {
      setShowSlashMenu(true);
      setShowMentionMenu(false);
      setSlashQuery("");
      setSelectedIndex(0);
    } else if (lastSlashIndex !== -1 && (textBeforeCursor[lastSlashIndex - 1] === undefined || textBeforeCursor[lastSlashIndex - 1] === ' ')) {
      const query = textBeforeCursor.slice(lastSlashIndex + 1);
      if (!query.includes(' ')) {
        setShowSlashMenu(true);
        setSlashQuery(query);
        setSelectedIndex(0);
      } else {
        setShowSlashMenu(false);
      }
    } else {
      setShowSlashMenu(false);
    }

    // Check for mention
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    if (lastAtIndex !== -1 && (lastAtIndex === 0 || textBeforeCursor[lastAtIndex - 1] === ' ')) {
      const query = textBeforeCursor.slice(lastAtIndex + 1);
      if (!query.includes(' ')) {
        setShowMentionMenu(true);
        setShowSlashMenu(false);
        setMentionQuery(query);
        setSelectedIndex(0);
      } else {
        setShowMentionMenu(false);
      }
    } else if (!showSlashMenu) {
      setShowMentionMenu(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const activeMenu = showSlashMenu ? filteredCommands : showMentionMenu ? filteredMentions : [];
    
    if (activeMenu.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(activeMenu.length - 1, prev + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (showSlashMenu) {
          selectSlashCommand(filteredCommands[selectedIndex]);
        } else if (showMentionMenu) {
          selectMention(filteredMentions[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowSlashMenu(false);
        setShowMentionMenu(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Select slash command
  const selectSlashCommand = (command: SlashCommand) => {
    const textBeforeCursor = value.slice(0, cursorPosition);
    const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
    const newValue = value.slice(0, lastSlashIndex) + '/' + command.label + ' ' + value.slice(cursorPosition);
    setValue(newValue);
    setShowSlashMenu(false);
    inputRef.current?.focus();
    command.action(value.slice(lastSlashIndex + 1));
  };

  // Select mention
  const selectMention = (mention: Mention) => {
    const textBeforeCursor = value.slice(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const newValue = value.slice(0, lastAtIndex) + '@' + mention.label + ' ' + value.slice(cursorPosition);
    setValue(newValue);
    setShowMentionMenu(false);
    inputRef.current?.focus();
  };

  // Send message
  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    resetTranscript();
    setShowSlashMenu(false);
    setShowMentionMenu(false);
  };

  // Auto-resize textarea
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, [value]);

  return (
    <div className={cn("relative border-t border-border", className)}>
      {/* Menus */}
      {(showSlashMenu && filteredCommands.length > 0) && (
        <div className="absolute bottom-full left-0 right-0 mb-2 glass-heavy rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-none z-10" role="listbox">
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.id}
              onClick={() => selectSlashCommand(cmd)}
              className={cn(
                "w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-3",
                index === selectedIndex && "bg-neutral-100 dark:bg-neutral-800"
              )}
            >
              {cmd.icon}
              <div>
                <div className="text-sm font-medium">{cmd.label}</div>
                <div className="text-xs text-muted-foreground">{cmd.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {(showMentionMenu && filteredMentions.length > 0) && (
        <div className="absolute bottom-full left-0 right-0 mb-2 glass-heavy rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-none z-10" role="listbox">
          {filteredMentions.map((mention, index) => (
            <button
              key={mention.id}
              onClick={() => selectMention(mention)}
              className={cn(
                "w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-3",
                index === selectedIndex && "bg-neutral-100 dark:bg-neutral-800"
              )}
            >
              <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs">@</div>
              <div>
                <div className="text-sm font-medium">@{mention.label}</div>
                <div className="text-xs text-muted-foreground">{mention.type}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2 p-3">
        {/* Left Actions */}
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>
          {isSupported && (
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8 shrink-0 transition-colors", isListening && "text-red-500 bg-red-50 dark:bg-red-950/20")}
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : placeholder}
            disabled={disabled}
            className={cn(
              "w-full resize-none bg-transparent",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "outline-none focus:outline-none",
              "min-h-[36px] max-h-[200px]",
              "scrollbar-none"
            )}
            rows={1}
          />
          {isListening && (
            <div className="absolute right-2 bottom-2">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <Button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          size="icon"
          className="h-8 w-8 shrink-0 gradient-pastel-blue border-0"
        >
          <Send className="w-4 h-4 text-neutral-700" />
        </Button>
      </div>
    </div>
  );
}
