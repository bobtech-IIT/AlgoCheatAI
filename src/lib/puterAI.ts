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
/**
 * Robustly retrieves the Puter guest session token or logged-in token.
 * Does not trigger interactive popups in background tasks.
 */
async function getAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    throw new Error("Client-only execution context");
  }

  // 1. Check if user configured a custom Puter auth token
  const customPuterToken = localStorage.getItem("algocheat.puter_token");
  if (customPuterToken && customPuterToken.trim().length > 0) {
    return customPuterToken.trim();
  }

  // 2. Wait briefly for Puter.js CDN script to load and initialize (up to 1.5 seconds)
  let puter = (window as any).puter;
  for (let attempt = 0; attempt < 15 && !puter; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    puter = (window as any).puter;
  }

  if (!puter) {
    throw new Error("Puter.js failed to load. Please check your internet connection.");
  }

  // 3. Check if we already have a token
  if (puter.authToken) {
    return puter.authToken;
  }
  const stored = localStorage.getItem("puter.auth.token.v2");
  if (stored) {
    return stored;
  }

  return null;
}

/**
 * Triggers Puter authentication. Simplified to bypass popups and run 100% login-free.
 */
export async function triggerPuterSignIn(options?: { attemptTempUser?: boolean }): Promise<string> {
  const token = await getAuthToken();
  return token || "";
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
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch("/api/embed", {
    method: "POST",
    headers,
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

  // 1. Check if user configured a custom OpenAI API Key
  const customOpenAIKey = typeof window !== "undefined" ? localStorage.getItem("algocheat.openai_key") : null;
  if (customOpenAIKey && customOpenAIKey.trim().startsWith("sk-")) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${customOpenAIKey.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices[0].message.content;
        return parseJSON(text);
      }
      const errText = await response.text();
      throw new Error(`OpenAI Key error ${response.status}: ${errText}`);
    } catch (err) {
      console.warn("Failed calling custom OpenAI API Key, falling back to Puter:", err);
    }
  }

  // 2. Direct REST fetch bypasses Puter SDK "Low Balance" automatic popups.
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch("https://api.puter.com/puterai/openai/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    }),
  });

  if (response.status === 402) {
    throw new Error("insufficient_funds");
  }

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Puter AI Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = extractText(data);
  return parseJSON(text);
}

/**
 * Shared HTTP POST client helper for hitting Vercel serverless functions (when OpenAI key is present)
 */
async function callAPI<T>(endpoint: string, payload: any): Promise<T> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const customKey = localStorage.getItem("algocheat.openai_key");
  const customUrl = localStorage.getItem("algocheat.api_url");
  const customModel = localStorage.getItem("algocheat.api_model");

  if (customKey && customKey.trim()) {
    headers["x-custom-api-key"] = customKey.trim();
  }
  if (customUrl && customUrl.trim()) {
    headers["x-custom-api-url"] = customUrl.trim();
  }
  if (customModel && customModel.trim()) {
    headers["x-custom-api-model"] = customModel.trim();
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
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
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, rejectReason: string): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(rejectReason)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

async function callWithFallback<T>(action: string, payload: any, endpoint: string): Promise<T> {
  // Check if we have local custom credentials.
  const customOpenAIKey = typeof window !== "undefined" ? localStorage.getItem("algocheat.openai_key") : null;
  const customPuterToken = typeof window !== "undefined" ? localStorage.getItem("algocheat.puter_token") : null;
  const customApiUrl = typeof window !== "undefined" ? localStorage.getItem("algocheat.api_url") : null;

  // Custom key/token routes directly to client-side Puter or OpenAI without session limits
  const hasCustomAuth = (customPuterToken && customPuterToken.trim().length > 0) ||
    (customOpenAIKey && customOpenAIKey.trim().startsWith("sk-"));

  if (hasCustomAuth) {
    return callClientSidePuterAI(action, payload);
  }

  const isCustomAPIKeyActive = !!(customOpenAIKey && customOpenAIKey.trim());
  const checkSessionLimit = () => {
    if (!isCustomAPIKeyActive) {
      const currentUsageRaw = sessionStorage.getItem("algocheat.backend_api_usage");
      const currentUsage = currentUsageRaw ? parseInt(currentUsageRaw, 10) : 0;
      if (currentUsage >= 5) {
        throw new Error("Strict backup API limit reached (5 requests/session). Please configure your own API key in the settings (Gear icon) to continue.");
      }
    }
  };

  const incrementSessionLimit = () => {
    if (!isCustomAPIKeyActive) {
      const currentUsageRaw = sessionStorage.getItem("algocheat.backend_api_usage");
      const currentUsage = currentUsageRaw ? parseInt(currentUsageRaw, 10) : 0;
      sessionStorage.setItem("algocheat.backend_api_usage", (currentUsage + 1).toString());
    }
  };

  // Plan A: Try client-side Puter AI (Direct fetch, keyless/guest) with 8-second timeout
  try {
    const result = await withTimeout(
      callClientSidePuterAI(action, payload),
      8000,
      "timeout"
    );
    return result;
  } catch (err: any) {
    console.warn(`Puter AI client call failed (${err.message}). Checking Plan B backup fallback...`);

    const config = await checkBackendConfig();
    const hasBackupKey = config.hasOpenAIKey || isCustomAPIKeyActive;

    if (hasBackupKey) {
      // Enforce sessionStorage limits to protect developer key costs
      checkSessionLimit();

      // Trigger custom UI event so ContentLab shows the warning toast
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("puter-fallback-active", {
            detail: { message: "Puter AI busy or limits reached. Routing request to backup API..." }
          })
        );
      }

      // Wait 1.5 seconds so user has time to see the toast notification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const apiResult = await callAPI<T>(endpoint, payload);
      incrementSessionLimit();
      return apiResult;
    } else {
      if (err.message === "timeout") {
        throw new Error("Puter AI timed out. Please configure your own API key in the settings (Gear icon) to continue.");
      }
      throw err;
    }
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
