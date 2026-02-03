/**
 * Chat Type Definitions
 * Comprehensive types for chat components
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error' | 'streaming';
  attachments?: Attachment[];
  metadata?: Record<string, any>;
  thinkingSteps?: ThinkingStep[]; // New field
  citations?: Citation[];
  tokenCount?: number | { input?: number; output?: number; total: number };
  toolCalls?: ToolCall[];
  model?: string;
  createdAt?: Date;
}

export interface ThinkingStep {
  id: string;
  type: "thinking" | "planning" | "searching" | "analyzing" | "writing";
  content: string;
  status: "pending" | "active" | "complete";
  duration?: number;
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

// Add these missing types to support the MessageBubble component
export interface ToolCall {
  id: string;
  name: string;
  status: 'running' | 'complete' | 'error';
  args: Record<string, any>;
  result?: any;
  error?: string;
}

export interface Citation {
  id: string;
  title: string;
  url: string;
  snippet?: string;
  favicon?: string;
  domain?: string;
}
