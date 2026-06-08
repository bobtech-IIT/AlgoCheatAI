import { ContentType } from "./auditRubrics";
import {
  buildTierScanPrompt,
  buildGeneratePrompt,
  buildGenerateWithAlgoCheatPrompt,
  buildContextQuestionsPrompt,
  buildGenerateWithUserContextPrompt,
  buildValidateAnswersPrompt,
  buildAuditPrompt
} from "./clientPrompts";

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
  suggestedCorrection?: string;
  correctedTopic?: string;
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
 * Caches and retrieves the backend configuration (hasOpenAIKey).
 */
let configPromise: Promise<{ hasOpenAIKey: boolean }> | null = null;

async function checkBackendConfig(): Promise<{ hasOpenAIKey: boolean }> {
  if (typeof window === "undefined") return { hasOpenAIKey: false };
  if (!configPromise) {
    configPromise = fetch("/api/config")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .catch(() => ({ hasOpenAIKey: false }));
  }
  return configPromise;
}

// Client-side JSON parser helper
function parseJSON(raw: string): any {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const slice = start >= 0 && end >= 0 ? cleaned.slice(start, end + 1) : cleaned;
  return JSON.parse(slice);
}

// Client-side text extractor helper
function extractText(resp: any): string {
  if (typeof resp === "string") return resp;
  if (resp?.message?.content) {
    const c = resp.message.content;
    if (typeof c === "string") return c;
    if (Array.isArray(c)) return c.map((x: any) => x.text ?? "").join("");
  }
  if (resp?.text) return resp.text;
  if (resp?.toString) return resp.toString();
  return JSON.stringify(resp);
}

/**
 * Local evaluation runner using window.puter.ai.chat in user session.
 */
async function callClientSidePuterAI(action: string, payload: any): Promise<any> {
  let prompt = "";
  
  if (action === "audit") {
    prompt = buildAuditPrompt(payload.type, payload.content, payload.imageDescription);
  } else if (action === "generate") {
    prompt = buildGeneratePrompt(payload.type, payload.topic);
  } else if (action === "scan") {
    prompt = buildTierScanPrompt(payload.topic);
  } else if (action === "generate-algocheat") {
    prompt = buildGenerateWithAlgoCheatPrompt(payload.type, payload.topic);
  } else if (action === "questions") {
    prompt = buildContextQuestionsPrompt(payload.type, payload.topic, payload.detectedName);
  } else if (action === "generate-user-context") {
    prompt = buildGenerateWithUserContextPrompt(payload.type, payload.topic, payload.detectedName, payload.questions, payload.answers);
  } else if (action === "validate") {
    prompt = buildValidateAnswersPrompt(payload.topic, payload.detectedName, payload.questions, payload.answers);
  } else {
    throw new Error(`Unknown client-side Puter AI action: ${action}`);
  }

  const puter = (window as any).puter;
  if (!puter) {
    throw new Error("Puter.js is not loaded. Please check your connection.");
  }

  const resp = await puter.ai.chat(prompt, { model: "gpt-4o-mini" });
  const text = extractText(resp);
  return parseJSON(text);
}

/**
 * Shared HTTP POST client helper for hitting Vercel serverless functions (when OpenAI key is present)
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

/**
 * Executes a call by attempting the Vercel backend proxy first (if config indicates a key is set).
 * If the backend call fails for any reason (e.g. rate limit, expired/invalid key, network issue),
 * it automatically catches the error and falls back to client-side Puter AI execution.
 */
async function callWithFallback<T>(action: string, payload: any, endpoint: string): Promise<T> {
  const config = await checkBackendConfig();
  if (config.hasOpenAIKey) {
    try {
      return await callAPI<T>(endpoint, payload);
    } catch (err) {
      console.warn(`Backend call to ${endpoint} failed, falling back to client-side Puter AI:`, err);
      return callClientSidePuterAI(action, payload);
    }
  } else {
    return callClientSidePuterAI(action, payload);
  }
}

export async function auditContent(args: {
  type: ContentType;
  content: string;
  imageDescription?: string;
}): Promise<AuditResult> {
  return callWithFallback<AuditResult>("audit", args, "/api/audit");
}

export async function generateContent(args: { type: ContentType; topic: string }): Promise<GenerateResult> {
  return callWithFallback<GenerateResult>("generate", args, "/api/generate");
}

export async function scanTopicTier(topic: string): Promise<TierScanResult> {
  return callWithFallback<TierScanResult>("scan", { topic }, "/api/scan");
}

export async function generateForAlgoCheat(args: { type: ContentType; topic: string }): Promise<GenerateResult> {
  return callWithFallback<GenerateResult>("generate-algocheat", args, "/api/generate-algocheat");
}

export async function getContextQuestions(args: {
  type: ContentType;
  topic: string;
  detectedName: string;
}): Promise<{ questions: string[] }> {
  return callWithFallback<{ questions: string[] }>("questions", args, "/api/questions");
}

export async function generateWithUserContext(args: {
  type: ContentType;
  topic: string;
  detectedName: string;
  questions: string[];
  answers: string[];
}): Promise<GenerateResult> {
  return callWithFallback<GenerateResult>("generate-user-context", args, "/api/generate-user-context");
}

export async function validateUserAnswers(args: {
  topic: string;
  detectedName: string;
  questions: string[];
  answers: string[];
}): Promise<{ valid: boolean; reason?: string }> {
  return callWithFallback<{ valid: boolean; reason?: string }>("validate", args, "/api/validate");
}
