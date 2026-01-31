/**
 * RAG System - Client-side retrieval and context injection
 * Uses TF-IDF for lightweight client-side search without external embeddings
 */

import { ChunkingStrategy } from './ChunkingStrategy';

interface Document {
  id: string;
  content: string;
  metadata?: any;
  tokens: number;
}

interface IndexEntry {
  docId: string;
  score: number;
}

export class RAGSystem {
  private documents: Map<string, Document> = new Map();
  private index: Map<string, IndexEntry[]> = new Map(); // Word -> Documents
  private chunker: ChunkingStrategy;

  constructor() {
    this.chunker = new ChunkingStrategy();
  }

  /**
   * Add document to system
   */
  addDocument(id: string, content: string, metadata?: any) {
    // Chunk content first
    const { chunks } = this.chunker.chunk(content, { maxTokens: 500, overlap: 50 });
    
    chunks.forEach((chunk, i) => {
      const chunkId = `${id}-${i}`;
      const doc: Document = {
        id: chunkId,
        content: chunk,
        metadata,
        tokens: Math.ceil(chunk.length / 4)
      };
      
      this.documents.set(chunkId, doc);
      this.addToIndex(chunkId, chunk);
    });
  }

  /**
   * Add text to inverted index (TF-IDF style)
   */
  private addToIndex(docId: string, text: string) {
    const words = this.tokenize(text);
    const wordCounts = new Map<string, number>();
    
    // Count frequencies
    words.forEach(word => {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    });

    // Update index
    wordCounts.forEach((count, word) => {
      const tf = count / words.length; // Term Frequency
      const entry = { docId, score: tf };
      
      if (!this.index.has(word)) {
        this.index.set(word, []);
      }
      this.index.get(word)?.push(entry);
    });
  }

  /**
   * Retrieve relevant documents
   */
  retrieve(query: string, limit: number = 5): Document[] {
    const queryWords = this.tokenize(query);
    const scores = new Map<string, number>();

    // Calculate scores
    queryWords.forEach(word => {
      const entries = this.index.get(word);
      if (entries) {
        // IDF (Inverse Document Frequency)
        const idf = Math.log(this.documents.size / entries.length);
        
        entries.forEach(entry => {
          const currentScore = scores.get(entry.docId) || 0;
          scores.set(entry.docId, currentScore + (entry.score * idf));
        });
      }
    });

    // Sort by score
    const sortedIds = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id);

    return sortedIds
      .map(id => this.documents.get(id))
      .filter((doc): doc is Document => !!doc);
  }

  /**
   * Simple tokenizer
   */
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2) // Filter stop words/short words
      .filter(w => !['the', 'and', 'for', 'that', 'this'].includes(w));
  }
}
