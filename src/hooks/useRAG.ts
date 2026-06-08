import { useState, useEffect } from "react";
import { 
  IndexedDBVectorStore, 
  TextChunker, 
  VectorRecord, 
  VectorMath, 
  Chunk 
} from "@/lib/ragStore";
import { fetchEmbeddings } from "@/lib/puterAI";

export function useRAG() {
  const [store] = useState(() => new IndexedDBVectorStore());
  const [isReady, setIsReady] = useState(false);
  const [docCount, setDocCount] = useState(0);
  const [indexing, setIndexing] = useState(false);
  const [indexedDocs, setIndexedDocs] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    store.init().then(() => {
      setIsReady(true);
      refreshStats();
    });
  }, [store]);

  const refreshStats = async () => {
    try {
      const records = await store.getAllRecords();
      const docsMap = new Map<string, string>();
      for (const r of records) {
        docsMap.set(r.docId, r.docName);
      }
      setDocCount(docsMap.size);
      
      const docList: { id: string; name: string }[] = [];
      docsMap.forEach((name, id) => {
        docList.push({ id, name });
      });
      setIndexedDocs(docList);
    } catch (err) {
      console.error("[RAG] Failed to read IndexedDB metrics:", err);
    }
  };

  /**
   * Indexes a document: splits into chunks, fetches embeddings from the API, and saves.
   */
  const indexDocument = async (docId: string, docName: string, text: string) => {
    setIndexing(true);
    try {
      const chunks = TextChunker.chunkDocument(docId, docName, text);
      if (chunks.length === 0) return;

      const textsToEmbed = chunks.map(c => c.text);
      const embeddings = await fetchEmbeddings(textsToEmbed);

      const records: VectorRecord[] = chunks.map((chunk, idx) => ({
        id: chunk.id,
        docId: chunk.docId,
        docName: chunk.docName,
        text: chunk.text,
        embedding: embeddings[idx],
        timestamp: Date.now()
      }));

      await store.saveVectorRecords(records);
      await refreshStats();
    } catch (err) {
      console.error("[RAG] Failed to index document:", err);
      throw err;
    } finally {
      setIndexing(false);
    }
  };

  /**
   * Search vector database for top-k matches with minimum similarity threshold.
   */
  const searchContext = async (
    query: string, 
    k = 3, 
    threshold = 0.2
  ): Promise<Chunk[]> => {
    if (!query.trim()) return [];
    
    try {
      // 1. Fetch query vector
      const embeddings = await fetchEmbeddings([query]);
      const queryVector = embeddings[0];

      // 2. Fetch stored records
      const allRecords = await store.getAllRecords();
      if (allRecords.length === 0) return [];

      // 3. Compute cosine similarities
      const scored = allRecords.map(record => ({
        record,
        sim: VectorMath.cosineSimilarity(queryVector, record.embedding)
      }));

      // 4. Filter, sort, and slice
      const matches = scored
        .filter(x => x.sim >= threshold)
        .sort((a, b) => b.sim - a.sim)
        .slice(0, k);

      return matches.map(m => ({
        id: m.record.id,
        docId: m.record.docId,
        docName: m.record.docName,
        text: m.record.text,
        startIndex: 0,
        endIndex: 0
      }));
    } catch (err) {
      console.error("[RAG] Search context failed:", err);
      return [];
    }
  };

  const deleteDocument = async (docId: string) => {
    await store.deleteDocument(docId);
    await refreshStats();
  };

  const clearDatabase = async () => {
    await store.clearStore();
    await refreshStats();
  };

  return {
    isReady,
    docCount,
    indexing,
    indexedDocs,
    indexDocument,
    searchContext,
    deleteDocument,
    clearDatabase
  };
}
