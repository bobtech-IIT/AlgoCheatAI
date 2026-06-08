import { ContentType } from "./auditRubrics";

export interface AuditScore {
  key: string;
  name: string;
  score: number;
  issue: string;
  fix: string;
}

export interface AuditResult {
  overall: number;
  verdict: string;
  scores: AuditScore[];
  voiceFingerprint?: string[] | string;
  rewritten: string;
}

export interface GenerateResult {
  content: string;
  notes: string;
}

export interface TierScanResult {
  tier: "general" | "algocheat" | "unknown" | "invalid";
  detectedName?: string;
  reasoning?: string;
}

/**
 * Robustly retrieves the Puter guest session token or logged-in token.
 * Does not trigger interactive popups in background tasks.
 */
async function getAuthToken(): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Client-only execution context");
  }

  // 1. Wait briefly for Puter.js CDN script to load and initialize (up to 1.5 seconds)
  let puter = (window as any).puter;
  for (let attempt = 0; attempt < 15 && !puter; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    puter = (window as any).puter;
  }

  if (!puter) {
    throw new Error("Puter.js failed to load. Please check your internet connection.");
  }

  // 2. Check if we already have a token
  if (puter.authToken) {
    return puter.authToken;
  }
  const stored = localStorage.getItem("puter.auth.token.v2");
  if (stored) {
    return stored;
  }

  return "no-token-available";
}

/**
 * Triggers Puter authentication. Call only from click handlers to bypass popup blockers.
 */
export async function triggerPuterSignIn(): Promise<string> {
  if (typeof window === "undefined") return "no-token-available";
  
  let puter = (window as any).puter;
  if (!puter) {
    for (let attempt = 0; attempt < 10 && !puter; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      puter = (window as any).puter;
    }
  }

  if (!puter) {
    throw new Error("Puter.js failed to load. Please check your network.");
  }

  await puter.auth.signIn({ attempt_temp_user_creation: true });
  return puter.authToken || localStorage.getItem("puter.auth.token.v2") || "no-token-available";
}

/**
 * Checks if a Puter session/token is locally available.
 */
export function hasPuterToken(): boolean {
  if (typeof window === "undefined") return false;
  const puter = (window as any).puter;
  return !!(puter?.authToken || localStorage.getItem("puter.auth.token.v2"));
}


/**
 * Client-side helper to fetch embeddings from the backend Vercel proxy.
 */
export async function fetchEmbeddings(texts: string[]): Promise<number[][]> {
  const token = await getAuthToken();
  const response = await fetch("/api/embed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ texts }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to generate embeddings: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.embeddings;
}

/**
 * Shared HTTP POST client helper for hitting Vercel serverless functions
 */
async function callAPI<T>(endpoint: string, payload: any): Promise<T> {
  const token = await getAuthToken();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    let errMsg = `HTTP Error ${response.status}`;
    try {
      const parsed = JSON.parse(errText);
      errMsg = parsed.message || parsed.error || errMsg;
    } catch {
      // ignore
    }
    throw new Error(errMsg);
  }

  return response.json() as Promise<T>;
}

export function auditContent(args: {
  type: ContentType;
  content: string;
  imageDescription?: string;
}) {
  return callAPI<AuditResult>("/api/audit", args);
}

export function generateContent(args: { type: ContentType; topic: string }) {
  return callAPI<GenerateResult>("/api/generate", args);
}

export function scanTopicTier(topic: string): Promise<TierScanResult> {
  return callAPI<TierScanResult>("/api/scan", { topic });
}

export function generateForAlgoCheat(args: { type: ContentType; topic: string }) {
  return callAPI<GenerateResult>("/api/generate-algocheat", args);
}

export function getContextQuestions(args: {
  type: ContentType;
  topic: string;
  detectedName: string;
}) {
  return callAPI<{ questions: string[] }>("/api/questions", args);
}

export function generateWithUserContext(args: {
  type: ContentType;
  topic: string;
  detectedName: string;
  questions: string[];
  answers: string[];
}) {
  return callAPI<GenerateResult>("/api/generate-user-context", args);
}

export function validateUserAnswers(args: {
  topic: string;
  detectedName: string;
  questions: string[];
  answers: string[];
}) {
  return callAPI<{ valid: boolean; reason?: string }>("/api/validate", args);
}
