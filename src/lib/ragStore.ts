/**
 * Core Type Definitions for the Client-Side RAG Engine
 */
export interface Chunk {
  id: string;        // Formatted as "${docId}-c${sequence}"
  docId: string;     // Unique identifier of the uploaded source document
  docName: string;   // Original source title
  text: string;      // Snippet text content
  startIndex: number;// Source text starting character index
  endIndex: number;  // Source text ending character index
}

export interface VectorRecord {
  id: string;        // Matches Chunk.id
  docId: string;     // Document ID
  docName: string;
  text: string;      // Snippet text content
  embedding: number[]; // Float array of embedding coordinates
  timestamp: number;
}

/**
 * Boundary-Aware Text Chunker
 */
export class TextChunker {
  /**
   * Splits a document into chunks, prioritizing paragraph or sentence boundaries.
   */
  static chunkDocument(
    docId: string, 
    docName: string, 
    text: string, 
    chunkSize = 800, 
    chunkOverlap = 150
  ): Chunk[] {
    const chunks: Chunk[] = [];
    let start = 0;
    let seq = 0;

    if (!text || text.trim().length === 0) return [];

    while (start < text.length) {
      let end = start + chunkSize;
      
      if (end < text.length) {
        // Try paragraph split first
        const paragraphEnd = text.lastIndexOf("\n\n", end);
        if (paragraphEnd > start + chunkSize * 0.4) {
          end = paragraphEnd + 2; 
        } else {
          // Fallback to sentence boundary split
          const sentenceEnd = text.lastIndexOf(". ", end);
          if (sentenceEnd > start + chunkSize * 0.4) {
            end = sentenceEnd + 2; 
          }
        }
      } else {
        end = text.length;
      }

      const chunkText = text.slice(start, end).trim();
      if (chunkText.length > 0) {
        chunks.push({
          id: `${docId}-c${seq++}`,
          docId,
          docName,
          text: chunkText,
          startIndex: start,
          endIndex: end,
        });
      }

      start = end - chunkOverlap;
      if (start >= text.length || end >= text.length) break;
    }
    return chunks;
  }
}

/**
 * Optimized Cosine Similarity Mathematics
 */
export class VectorMath {
  static dotProduct(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error(`Dimension mismatch: vector A (${a.length}) != vector B (${b.length})`);
    }
    let dot = 0;
    const len = a.length;
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
    }
    return dot;
  }

  static magnitude(a: number[]): number {
    let sum = 0;
    const len = a.length;
    for (let i = 0; i < len; i++) {
      sum += a[i] * a[i];
    }
    return Math.sqrt(sum);
  }

  static cosineSimilarity(a: number[], b: number[]): number {
    const magA = this.magnitude(a);
    const magB = this.magnitude(b);
    if (magA === 0 || magB === 0) return 0;
    return this.dotProduct(a, b) / (magA * magB);
  }
}

/**
 * IndexedDB Store for Vector Chunks
 */
export class IndexedDBVectorStore {
  private dbName = "algocheat-rag-db";
  private storeName = "vectors";
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  init(): Promise<void> {
    if (this.db) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id" });
          store.createIndex("docId", "docId", { unique: false });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => {
        reject(request.error || new Error("Failed to open IndexedDB"));
      };
    });
  }

  async saveVectorRecords(records: VectorRecord[]): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error("Database not initialized"));
      const tx = this.db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);

      for (const record of records) {
        store.put(record);
      }
    });
  }

  async getAllRecords(): Promise<VectorRecord[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error("Database not initialized"));
      const tx = this.db.transaction(this.storeName, "readonly");
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteDocument(docId: string): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error("Database not initialized"));
      const tx = this.db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const index = store.index("docId");
      const request = index.openCursor(IDBKeyRange.only(docId));

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearStore(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error("Database not initialized"));
      const tx = this.db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
