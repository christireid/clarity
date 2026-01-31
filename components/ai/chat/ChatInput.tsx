"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Send, Paperclip, Smile, AtSign, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SlashCommand, Mention } from "./types";

/**
 * ChatInput - Advanced input with slash commands and mentions
 * Full keyboard navigation and accessibility
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
      // Just typed "/"
      setShowSlashMenu(true);
      setShowMentionMenu(false);
      setSlashQuery("");
      setSelectedIndex(0);
    } else if (lastSlashIndex !== -1 && textBeforeCursor[lastSlashIndex - 1] === undefined || textBeforeCursor[lastSlashIndex - 1] === ' ') {
      // Typing after "/"
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

    // Keyboard shortcuts
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      // Open command palette (handled by parent)
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
    
    // Execute command action
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
      {/* Slash Command Menu */}
      {showSlashMenu && filteredCommands.length > 0 && (
        <div 
          className="absolute bottom-full left-0 right-0 mb-2 glass-heavy rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-none"
          role="listbox"
          aria-label="Slash commands"
        >
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.id}
              onClick={() => selectSlashCommand(cmd)}
              className={cn(
                "w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                "flex items-center gap-3",
                index === selectedIndex && "bg-neutral-100 dark:bg-neutral-800"
              )}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {cmd.icon && <span className="shrink-0">{cmd.icon}</span>}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  /{cmd.label}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {cmd.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mention Menu */}
      {showMentionMenu && filteredMentions.length > 0 && (
        <div 
          className="absolute bottom-full left-0 right-0 mb-2 glass-heavy rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-none"
          role="listbox"
          aria-label="Mentions"
        >
          {filteredMentions.map((mention, index) => (
            <button
              key={mention.id}
              onClick={() => selectMention(mention)}
              className={cn(
                "w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                "flex items-center gap-3",
                index === selectedIndex && "bg-neutral-100 dark:bg-neutral-800"
              )}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {mention.avatar ? (
                <img src={mention.avatar} alt="" className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs">
                  {mention.label[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">
                  @{mention.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {mention.type}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2 p-3">
        {/* Action Buttons */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => {
              setValue(value + '/');
              setShowSlashMenu(true);
              inputRef.current?.focus();
            }}
            aria-label="Insert slash command"
            title="Insert slash command (/)"
          >
            <Slash className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => {
              setValue(value + '@');
              setShowMentionMenu(true);
              inputRef.current?.focus();
            }}
            aria-label="Mention user"
            title="Mention user (@)"
          >
            <AtSign className="w-4 h-4" />
          </Button>
        </div>

        {/* Textarea */}
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 resize-none bg-transparent",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "outline-none focus:outline-none",
            "min-h-[36px] max-h-[200px]",
            "scrollbar-none"
          )}
          rows={1}
          aria-label="Message input"
          aria-describedby="chat-input-help"
        />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          size="icon"
          className="h-8 w-8 shrink-0 gradient-pastel-blue border-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-neutral-700" />
        </Button>
      </div>

      {/* Helper Text */}
      <div id="chat-input-help" className="sr-only">
        Type / for commands, @ to mention, Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
