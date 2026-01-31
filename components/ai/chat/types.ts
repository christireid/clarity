/**
 * Chat Type Definitions
 * Comprehensive types for chat components
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  attachments?: Attachment[];
  metadata?: Record<string, any>;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'video';
  url: string;
  name: string;
  size?: number;
}

export interface SlashCommand {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  keywords?: string[];
  action: (args?: string) => void | Promise<void>;
  group?: string;
}

export interface Mention {
  id: string;
  label: string;
  avatar?: string;
  type: 'user' | 'channel' | 'variable';
  metadata?: Record<string, any>;
}

export interface ChatContextValue {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  isLoading: boolean;
  error?: Error;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
  group?: string;
}
