/**
 * Stream Protocol Definition
 * A robust protocol for mixing text, data, and tool calls in a single stream.
 * 
 * Format:
 * [type]:[content]\n
 * 
 * Types:
 * 0: Text chunk (append to last message)
 * 1: Data/Metadata (JSON)
 * 2: Tool Call Start (JSON)
 * 3: Tool Call Args (String/JSON)
 * 4: Tool Call End
 * 5: Error (JSON)
 * 6: Ping/Heartbeat
 * 7: UI Component Stream (JSON - Streaming Props)
 * 8: Thinking/Reasoning Chunk (Append to thinking buffer)
 */

export enum StreamType {
  TEXT = '0',
  DATA = '1',
  TOOL_START = '2',
  TOOL_ARGS = '3',
  TOOL_END = '4',
  ERROR = '5',
  PING = '6',
  UI_STREAM = '7',
  THINKING = '8'
}

export interface StreamPart {
  type: StreamType;
  content: string;
}

export type StreamListener = (part: StreamPart) => void;
