/**
 * Tool Calling - Optimize and manage tool definitions and execution
 */

import { z } from "zod";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: z.ZodSchema;
  execute: (args: any) => Promise<any>;
}

export class ToolCalling {
  private tools: Map<string, ToolDefinition> = new Map();

  /**
   * Register a tool
   */
  register(tool: ToolDefinition) {
    this.tools.set(tool.name, tool);
  }

  /**
   * Generate OpenAI-compatible tool schema
   */
  getSchemas(): any[] {
    return Array.from(this.tools.values()).map(tool => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: this.zodToJsonSchema(tool.parameters)
      }
    }));
  }

  /**
   * Parse and execute tool call
   */
  async execute(name: string, args: any): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool ${name} not found`);
    }

    // Validate arguments
    const validatedArgs = tool.parameters.parse(args);
    
    // Execute
    return await tool.execute(validatedArgs);
  }

  /**
   * Convert Zod schema to JSON Schema (Simplified)
   */
  private zodToJsonSchema(schema: z.ZodSchema): any {
    // This is a simplified converter. In a real app, use 'zod-to-json-schema' package
    // For now, we return a basic structure to demonstrate the concept
    const description = (schema as any).description;
    
    if (schema instanceof z.ZodObject) {
      const properties: any = {};
      const required: string[] = [];
      
      const shape = (schema as any).shape;
      for (const key in shape) {
        properties[key] = this.zodToJsonSchema(shape[key]);
        if (!shape[key].isOptional()) {
          required.push(key);
        }
      }
      
      return {
        type: "object",
        properties,
        required,
        description
      };
    }
    
    if (schema instanceof z.ZodString) return { type: "string", description };
    if (schema instanceof z.ZodNumber) return { type: "number", description };
    if (schema instanceof z.ZodBoolean) return { type: "boolean", description };
    
    return { type: "object", description }; // Fallback
  }
}
