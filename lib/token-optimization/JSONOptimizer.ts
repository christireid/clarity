/**
 * JSON Optimizer - Minimize JSON payloads for token efficiency
 */

import type { TokenStats } from './types';

export class JSONOptimizer {
  private keyMap: Map<string, string> = new Map();
  private reverseKeyMap: Map<string, string> = new Map();
  private keyCounter = 0;

  /**
   * Generate short key
   */
  private generateShortKey(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let key = '';
    let num = this.keyCounter++;
    
    do {
      key = chars[num % chars.length] + key;
      num = Math.floor(num / chars.length);
    } while (num > 0);
    
    return key;
  }

  /**
   * Shorten object keys
   */
  private shortenKeys(obj: any, map: Map<string, string>): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.shortenKeys(item, map));
    }
    
    if (obj !== null && typeof obj === 'object') {
      const shortened: any = {};
      
      for (const [key, value] of Object.entries(obj)) {
        let shortKey = map.get(key);
        if (!shortKey) {
          shortKey = this.generateShortKey();
          map.set(key, shortKey);
          this.reverseKeyMap.set(shortKey, key);
        }
        shortened[shortKey] = this.shortenKeys(value, map);
      }
      
      return shortened;
    }
    
    return obj;
  }

  /**
   * Remove null and undefined values
   */
  private removeNullish(obj: any): any {
    if (Array.isArray(obj)) {
      return obj
        .map(item => this.removeNullish(item))
        .filter(item => item !== null && item !== undefined);
    }
    
    if (obj !== null && typeof obj === 'object') {
      const cleaned: any = {};
      
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined) {
          const cleaned_value = this.removeNullish(value);
          if (cleaned_value !== null && cleaned_value !== undefined) {
            cleaned[key] = cleaned_value;
          }
        }
      }
      
      return cleaned;
    }
    
    return obj;
  }

  /**
   * Optimize numbers
   */
  private optimizeNumbers(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.optimizeNumbers(item));
    }
    
    if (obj !== null && typeof obj === 'object') {
      const optimized: any = {};
      
      for (const [key, value] of Object.entries(obj)) {
        optimized[key] = this.optimizeNumbers(value);
      }
      
      return optimized;
    }
    
    if (typeof obj === 'number') {
      // Round to reasonable precision
      if (!Number.isInteger(obj)) {
        const rounded = Math.round(obj * 1000) / 1000;
        return rounded;
      }
    }
    
    return obj;
  }

  /**
   * Deduplicate strings
   */
  private deduplicateStrings(obj: any, stringMap: Map<string, string>): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.deduplicateStrings(item, stringMap));
    }
    
    if (obj !== null && typeof obj === 'object') {
      const deduplicated: any = {};
      
      for (const [key, value] of Object.entries(obj)) {
        deduplicated[key] = this.deduplicateStrings(value, stringMap);
      }
      
      return deduplicated;
    }
    
    if (typeof obj === 'string' && obj.length > 20) {
      // Store long strings in map
      const existing = Array.from(stringMap.entries())
        .find(([_, v]) => v === obj);
      
      if (existing) {
        return `$ref:${existing[0]}`;
      }
      
      const id = `s${stringMap.size}`;
      stringMap.set(id, obj);
      return `$ref:${id}`;
    }
    
    return obj;
  }

  /**
   * Optimize JSON
   */
  optimize(
    data: any,
    options: {
      shortenKeys?: boolean;
      removeNullish?: boolean;
      optimizeNumbers?: boolean;
      deduplicateStrings?: boolean;
    } = {}
  ): { optimized: any; keyMap?: Record<string, string>; stringMap?: Record<string, string>; stats: TokenStats } {
    const original = JSON.stringify(data);
    let result = data;

    // Remove nullish values
    if (options.removeNullish !== false) {
      result = this.removeNullish(result);
    }

    // Optimize numbers
    if (options.optimizeNumbers !== false) {
      result = this.optimizeNumbers(result);
    }

    // Deduplicate strings
    const stringMap = new Map<string, string>();
    if (options.deduplicateStrings) {
      result = this.deduplicateStrings(result, stringMap);
    }

    // Shorten keys
    const keyMap = new Map<string, string>();
    if (options.shortenKeys) {
      result = this.shortenKeys(result, keyMap);
    }

    const optimized = JSON.stringify(result);

    return {
      optimized: result,
      keyMap: keyMap.size > 0 ? Object.fromEntries(keyMap) : undefined,
      stringMap: stringMap.size > 0 ? Object.fromEntries(stringMap) : undefined,
      stats: {
        original: original.length,
        optimized: optimized.length,
        saved: original.length - optimized.length,
        savedPercentage: ((original.length - optimized.length) / original.length) * 100,
      },
    };
  }

  /**
   * Restore original JSON
   */
  restore(
    optimized: any,
    keyMap?: Record<string, string>,
    stringMap?: Record<string, string>
  ): any {
    let result = optimized;

    // Restore strings
    if (stringMap) {
      const restoreStrings = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(restoreStrings);
        }
        
        if (obj !== null && typeof obj === 'object') {
          const restored: any = {};
          for (const [key, value] of Object.entries(obj)) {
            restored[key] = restoreStrings(value);
          }
          return restored;
        }
        
        if (typeof obj === 'string' && obj.startsWith('$ref:')) {
          const id = obj.slice(5);
          return stringMap[id] || obj;
        }
        
        return obj;
      };
      result = restoreStrings(result);
    }

    // Restore keys
    if (keyMap) {
      const reverseMap = Object.fromEntries(
        Object.entries(keyMap).map(([k, v]) => [v, k])
      );
      
      const restoreKeys = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(restoreKeys);
        }
        
        if (obj !== null && typeof obj === 'object') {
          const restored: any = {};
          for (const [key, value] of Object.entries(obj)) {
            const originalKey = reverseMap[key] || key;
            restored[originalKey] = restoreKeys(value);
          }
          return restored;
        }
        
        return obj;
      };
      result = restoreKeys(result);
    }

    return result;
  }

  /**
   * Minify JSON string
   */
  minify(json: string): string {
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed); // No spaces
    } catch {
      return json;
    }
  }
}
