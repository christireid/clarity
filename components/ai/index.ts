/**
 * Clarity AI Component Library
 *
 * This barrel export includes all non-conflicting component modules.
 * Components with naming conflicts are excluded from the barrel and
 * should be imported directly from their module path if needed.
 *
 * Example direct import:
 *   import { StreamingText } from "@/components/ai/streaming"
 */

// --- Core Chat ---
export * from "./message";
export * from "./thinking-indicator";
export * from "./tool-call";
export * from "./citation-chip";
export * from "./markdown-renderer";
export * from "./chat-input";
export * from "./command-palette";
export * from "./model-selector";
export * from "./file-upload";
export * from "./bubble";
export * from "./chat-container";
export * from "./composer";
export * from "./scroll-button";
export * from "./quick-replies";
export * from "./message-editor";
export * from "./message-draft";
export * from "./message-forwarding";
export * from "./mentions";
export * from "./reactions";
export * from "./pinned-messages";
export * from "./scheduled-messages";
export * from "./error-boundary";

// --- Code & Preview ---
export * from "./code-block";
export * from "./sandbox";
export * from "./file-tree";
export * from "./artifact";
export * from "./terminal";
export * from "./code-editor";
export * from "./file-viewer";

// --- Canvas & Workflow ---
export * from "./canvas";
export * from "./workflow-nodes";
export * from "./mind-map";

// --- Agent & Tools ---
export * from "./agent";
export * from "./media";
export * from "./subgraphs";

// --- Settings & Management ---
export * from "./settings-panel";
export * from "./chat-sidebar";
export * from "./mcp-manager";
export * from "./confirmation-dialog";
export * from "./prompt-manager";
export * from "./conversation-manager";
export * from "./conversations-list";

// --- Dev Tools ---
export * from "./git-components";
export * from "./env-variables";

// --- Data & Visualization ---
export * from "./data-table";
export * from "./mermaid-diagram";
export * from "./schema-display";

// --- UI Components ---
export * from "./empty-states";
export * from "./notifications";
export * from "./dynamic-form";
export * from "./avatars";
export * from "./rich-tooltip";
export * from "./carousel";
export * from "./filters";
export * from "./sortable-list";
export * from "./buttons";
export * from "./date-picker";
export * from "./emoji-picker";
export * from "./color-picker";
export * from "./autocomplete";
export * from "./table-of-contents";
export * from "./question-flow";
export * from "./download";

// --- Generative & Streaming ---
export * from "./token-optimizer";
export * from "./context-management";

// --- Platform Clones ---
export * from "./chat-clones";
export * from "./v0-clone";

// --- Web & Search ---
export * from "./web-search";
export * from "./web-browser";

// --- Layout & Navigation ---
export * from "./panels";
export * from "./expandable-chat";
export * from "./layout";
export * from "./footer";

// --- Auth & Users ---
export * from "./auth";
export * from "./participants";
export * from "./persona";

// --- Content ---
export * from "./blog";
export * from "./docs";
export * from "./social-posts";
export * from "./generators";
export * from "./snippet-manager";
export * from "./mdx";

// --- Status & Indicators ---
export * from "./status";
export * from "./animations";
export * from "./animated-beam";
export * from "./particles";

// --- Safety & Observability ---
export * from "./guardrails";
export * from "./trace-viewer";
export * from "./model-fallback";
export * from "./rate-limiting";
export * from "./cost-tracking";
export * from "./retry-logic";

// --- AI Features ---
export * from "./memory";
export * from "./ai-textarea";
export * from "./ai-prompt-panel";
export * from "./presets";
export * from "./bookmarks";
export * from "./translation";
export * from "./threads";

// --- Theme ---
export * from "./theme";
export * from "./error-pages";
export * from "./dashboard";
export * from "./dashboards";
export * from "./branch-picker";
