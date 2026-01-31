/**
 * Prompt Template Engine
 * Lightweight utility for dynamic prompt generation.
 * Supports {{variable}} syntax.
 */

export class PromptTemplate {
  private template: string;
  private variables: Set<string>;

  constructor(template: string) {
    this.template = template;
    this.variables = this.extractVariables(template);
  }

  /**
   * Extract variable names from template
   */
  private extractVariables(template: string): Set<string> {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables = new Set<string>();
    let match;
    while ((match = regex.exec(template)) !== null) {
      variables.add(match[1].trim());
    }
    return variables;
  }

  /**
   * Render the template with provided values
   */
  render(values: Record<string, string>): string {
    return this.template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const name = key.trim();
      return values[name] || match; // Keep original if value missing
    });
  }

  /**
   * Get list of required variables
   */
  getRequiredVariables(): string[] {
    return Array.from(this.variables);
  }
}

/**
 * Helper to compile a prompt quickly
 */
export function compilePrompt(template: string, values: Record<string, string>): string {
  return new PromptTemplate(template).render(values);
}
