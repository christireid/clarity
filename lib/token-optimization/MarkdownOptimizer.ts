/**
 * Markdown Optimizer - Optimize markdown for token efficiency
 */

import type { TokenStats } from './types';

export class MarkdownOptimizer {
  /**
   * Remove unnecessary markdown syntax
   */
  private removeExtraFormatting(markdown: string): string {
    return markdown
      // Remove bold+italic (***text*** -> **text**)
      .replace(/\*\*\*(.+?)\*\*\*/g, '**$1**')
      // Remove excessive heading levels (#### -> ###)
      .replace(/#{4,}/g, '###')
      // Simplify lists (- item -> • item)
      .replace(/^\s*[-*+]\s+/gm, '• ')
      // Remove empty links ([text]() -> text)
      .replace(/\[([^\]]+)\]\(\)/g, '$1');
  }

  /**
   * Compact code blocks
   */
  private optimizeCodeBlocks(markdown: string): string {
    return markdown
      // Remove language identifiers if not needed
      .replace(/```\w+\n/g, '```\n')
      // Remove excessive blank lines in code
      .replace(/(```[\s\S]*?```)/, (match) => {
        return match.replace(/\n{3,}/g, '\n\n');
      });
  }

  /**
   * Simplify tables
   */
  private optimizeTables(markdown: string): string {
    return markdown.replace(
      /\|(.+?)\|\n\|[-: ]+\|\n((?:\|.+?\|\n?)+)/g,
      (match, header, rows) => {
        // Convert to simpler format if table is small
        const rowCount = rows.split('\n').filter(Boolean).length;
        if (rowCount <= 3) {
          const headerCells = header.split('|').map((c: string) => c.trim()).filter(Boolean);
          const rowCells = rows.split('\n')
            .filter(Boolean)
            .map((r: string) => r.split('|').map((c: string) => c.trim()).filter(Boolean));
          
          let result = '';
          rowCells.forEach((row: string[]) => {
            row.forEach((cell: string, i: number) => {
              result += `${headerCells[i]}: ${cell}; `;
            });
            result += '\n';
          });
          return result;
        }
        return match;
      }
    );
  }

  /**
   * Remove comments
   */
  private removeComments(markdown: string): string {
    return markdown
      // HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Markdown reference links
      .replace(/^\[.+?\]:\s*.+$/gm, '');
  }

  /**
   * Optimize images
   */
  private optimizeImages(markdown: string): string {
    return markdown
      // Simplify image syntax
      .replace(/!\[([^\]]*?)\]\(([^)]+?)\s*"[^"]*"\)/g, '![$1]($2)')
      // Remove empty alt text
      .replace(/!\[\]\(([^)]+)\)/g, '![$1]');
  }

  /**
   * Compress whitespace
   */
  private compressWhitespace(markdown: string): string {
    return markdown
      // Multiple blank lines to double
      .replace(/\n{3,}/g, '\n\n')
      // Trim trailing whitespace
      .replace(/[ \t]+$/gm, '')
      // Trim leading/trailing
      .trim();
  }

  /**
   * Optimize markdown
   */
  optimize(markdown: string): { optimized: string; stats: TokenStats } {
    const original = markdown;
    
    let result = markdown;
    result = this.removeComments(result);
    result = this.removeExtraFormatting(result);
    result = this.optimizeCodeBlocks(result);
    result = this.optimizeTables(result);
    result = this.optimizeImages(result);
    result = this.compressWhitespace(result);

    return {
      optimized: result,
      stats: {
        original: original.length,
        optimized: result.length,
        saved: original.length - result.length,
        savedPercentage: ((original.length - result.length) / original.length) * 100,
      },
    };
  }

  /**
   * Convert to plain text (maximum compression)
   */
  toPlainText(markdown: string): string {
    return markdown
      // Remove all markdown syntax
      .replace(/[*_~`]/g, '')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/!?\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^>\s+/gm, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
  }
}
