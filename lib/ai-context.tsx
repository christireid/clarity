"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type {
  Message,
  Conversation,
  Project,
  Model,
  MCPServer,
  Plugin,
  PromptTemplate,
  Agent,
  QueueItem,
} from "./ai-types";

interface AIState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  projects: Project[];
  currentProject: Project | null;
  models: Model[];
  selectedModel: Model | null;
  mcpServers: MCPServer[];
  plugins: Plugin[];
  promptTemplates: PromptTemplate[];
  agents: Agent[];
  queue: QueueItem[];
  isStreaming: boolean;
  isSidebarOpen: boolean;
  theme: "light" | "dark" | "system";
}

type AIAction =
  | { type: "SET_CONVERSATIONS"; payload: Conversation[] }
  | { type: "SET_CURRENT_CONVERSATION"; payload: Conversation | null }
  | { type: "ADD_MESSAGE"; payload: { conversationId: string; message: Message } }
  | { type: "UPDATE_MESSAGE"; payload: { conversationId: string; messageId: string; updates: Partial<Message> } }
  | { type: "DELETE_MESSAGE"; payload: { conversationId: string; messageId: string } }
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "SET_CURRENT_PROJECT"; payload: Project | null }
  | { type: "SET_MODELS"; payload: Model[] }
  | { type: "SET_SELECTED_MODEL"; payload: Model | null }
  | { type: "SET_MCP_SERVERS"; payload: MCPServer[] }
  | { type: "ADD_MCP_SERVER"; payload: MCPServer }
  | { type: "REMOVE_MCP_SERVER"; payload: string }
  | { type: "SET_PLUGINS"; payload: Plugin[] }
  | { type: "TOGGLE_PLUGIN"; payload: string }
  | { type: "SET_PROMPT_TEMPLATES"; payload: PromptTemplate[] }
  | { type: "SET_AGENTS"; payload: Agent[] }
  | { type: "SET_QUEUE"; payload: QueueItem[] }
  | { type: "ADD_TO_QUEUE"; payload: QueueItem }
  | { type: "REMOVE_FROM_QUEUE"; payload: string }
  | { type: "SET_STREAMING"; payload: boolean }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_THEME"; payload: "light" | "dark" | "system" }
  | { type: "CLEAR_CONVERSATION"; payload: string }
  | { type: "CREATE_CONVERSATION"; payload: Conversation }
  | { type: "DELETE_CONVERSATION"; payload: string };

const initialState: AIState = {
  conversations: [],
  currentConversation: null,
  projects: [],
  currentProject: null,
  models: [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Most capable model for complex tasks",
      contextWindow: 128000,
      maxOutput: 16384,
      capabilities: ["text", "vision", "code", "function-calling", "streaming"],
    },
    {
      id: "claude-sonnet-4",
      name: "Claude Sonnet 4",
      provider: "Anthropic",
      description: "Balanced performance and speed",
      contextWindow: 200000,
      maxOutput: 64000,
      capabilities: ["text", "vision", "code", "function-calling", "streaming", "reasoning"],
    },
    {
      id: "grok-3",
      name: "Grok 3",
      provider: "xAI",
      description: "Fast and efficient",
      contextWindow: 131072,
      maxOutput: 32000,
      capabilities: ["text", "code", "function-calling", "streaming"],
    },
  ],
  selectedModel: null,
  mcpServers: [],
  plugins: [],
  promptTemplates: [],
  agents: [],
  queue: [],
  isStreaming: false,
  isSidebarOpen: true,
  theme: "dark",
};

function aiReducer(state: AIState, action: AIAction): AIState {
  switch (action.type) {
    case "SET_CONVERSATIONS":
      return { ...state, conversations: action.payload };
    case "SET_CURRENT_CONVERSATION":
      return { ...state, currentConversation: action.payload };
    case "ADD_MESSAGE": {
      const conversations = state.conversations.map((conv) =>
        conv.id === action.payload.conversationId
          ? { ...conv, messages: [...conv.messages, action.payload.message], updatedAt: new Date() }
          : conv
      );
      const currentConversation =
        state.currentConversation?.id === action.payload.conversationId
          ? { ...state.currentConversation, messages: [...state.currentConversation.messages, action.payload.message] }
          : state.currentConversation;
      return { ...state, conversations, currentConversation };
    }
    case "UPDATE_MESSAGE": {
      const updateMessages = (messages: Message[]) =>
        messages.map((msg) =>
          msg.id === action.payload.messageId ? { ...msg, ...action.payload.updates } : msg
        );
      const conversations = state.conversations.map((conv) =>
        conv.id === action.payload.conversationId
          ? { ...conv, messages: updateMessages(conv.messages) }
          : conv
      );
      const currentConversation =
        state.currentConversation?.id === action.payload.conversationId
          ? { ...state.currentConversation, messages: updateMessages(state.currentConversation.messages) }
          : state.currentConversation;
      return { ...state, conversations, currentConversation };
    }
    case "DELETE_MESSAGE": {
      const filterMessages = (messages: Message[]) =>
        messages.filter((msg) => msg.id !== action.payload.messageId);
      const conversations = state.conversations.map((conv) =>
        conv.id === action.payload.conversationId
          ? { ...conv, messages: filterMessages(conv.messages) }
          : conv
      );
      const currentConversation =
        state.currentConversation?.id === action.payload.conversationId
          ? { ...state.currentConversation, messages: filterMessages(state.currentConversation.messages) }
          : state.currentConversation;
      return { ...state, conversations, currentConversation };
    }
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "SET_CURRENT_PROJECT":
      return { ...state, currentProject: action.payload };
    case "SET_MODELS":
      return { ...state, models: action.payload };
    case "SET_SELECTED_MODEL":
      return { ...state, selectedModel: action.payload };
    case "SET_MCP_SERVERS":
      return { ...state, mcpServers: action.payload };
    case "ADD_MCP_SERVER":
      return { ...state, mcpServers: [...state.mcpServers, action.payload] };
    case "REMOVE_MCP_SERVER":
      return { ...state, mcpServers: state.mcpServers.filter((s) => s.id !== action.payload) };
    case "SET_PLUGINS":
      return { ...state, plugins: action.payload };
    case "TOGGLE_PLUGIN":
      return {
        ...state,
        plugins: state.plugins.map((p) =>
          p.id === action.payload ? { ...p, enabled: !p.enabled } : p
        ),
      };
    case "SET_PROMPT_TEMPLATES":
      return { ...state, promptTemplates: action.payload };
    case "SET_AGENTS":
      return { ...state, agents: action.payload };
    case "SET_QUEUE":
      return { ...state, queue: action.payload };
    case "ADD_TO_QUEUE":
      return { ...state, queue: [...state.queue, action.payload] };
    case "REMOVE_FROM_QUEUE":
      return { ...state, queue: state.queue.filter((item) => item.id !== action.payload) };
    case "SET_STREAMING":
      return { ...state, isStreaming: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "CLEAR_CONVERSATION": {
      const conversations = state.conversations.map((conv) =>
        conv.id === action.payload ? { ...conv, messages: [] } : conv
      );
      const currentConversation =
        state.currentConversation?.id === action.payload
          ? { ...state.currentConversation, messages: [] }
          : state.currentConversation;
      return { ...state, conversations, currentConversation };
    }
    case "CREATE_CONVERSATION":
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversation: action.payload,
      };
    case "DELETE_CONVERSATION": {
      const conversations = state.conversations.filter((c) => c.id !== action.payload);
      const currentConversation =
        state.currentConversation?.id === action.payload ? null : state.currentConversation;
      return { ...state, conversations, currentConversation };
    }
    default:
      return state;
  }
}

interface AIContextValue extends AIState {
  dispatch: React.Dispatch<AIAction>;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  createConversation: (title?: string) => Conversation;
  deleteConversation: (id: string) => void;
  clearConversation: (id: string) => void;
  selectModel: (model: Model) => void;
  toggleSidebar: () => void;
}

const AIContext = createContext<AIContextValue | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(aiReducer, {
    ...initialState,
    selectedModel: initialState.models[0],
  });

  const addMessage = useCallback((conversationId: string, message: Message) => {
    dispatch({ type: "ADD_MESSAGE", payload: { conversationId, message } });
  }, []);

  const updateMessage = useCallback(
    (conversationId: string, messageId: string, updates: Partial<Message>) => {
      dispatch({ type: "UPDATE_MESSAGE", payload: { conversationId, messageId, updates } });
    },
    []
  );

  const deleteMessage = useCallback((conversationId: string, messageId: string) => {
    dispatch({ type: "DELETE_MESSAGE", payload: { conversationId, messageId } });
  }, []);

  const createConversation = useCallback((title?: string): Conversation => {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: title || "New Conversation",
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
      model: state.selectedModel?.id || "gpt-4o",
    };
    dispatch({ type: "CREATE_CONVERSATION", payload: conversation });
    return conversation;
  }, [state.selectedModel?.id]);

  const deleteConversation = useCallback((id: string) => {
    dispatch({ type: "DELETE_CONVERSATION", payload: id });
  }, []);

  const clearConversation = useCallback((id: string) => {
    dispatch({ type: "CLEAR_CONVERSATION", payload: id });
  }, []);

  const selectModel = useCallback((model: Model) => {
    dispatch({ type: "SET_SELECTED_MODEL", payload: model });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }, []);

  return (
    <AIContext.Provider
      value={{
        ...state,
        dispatch,
        addMessage,
        updateMessage,
        deleteMessage,
        createConversation,
        deleteConversation,
        clearConversation,
        selectModel,
        toggleSidebar,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
}
