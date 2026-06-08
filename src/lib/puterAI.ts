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
async function getAuthToken(): Promise<string> {
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

  return "no-token-available";
}

/**
 * Triggers Puter authentication. Call only from click handlers to bypass popup blockers.
 */
export async function triggerPuterSignIn(options?: { attemptTempUser?: boolean }): Promise<string> {
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

  // Check if we already have a custom Puter token
  const customToken = localStorage.getItem("algocheat.puter_token");
  if (customToken && customToken.trim().length > 0) {
    if (puter) puter.authToken = customToken.trim();
    return customToken.trim();
  }

  return new Promise<string>((resolve, reject) => {
    let settled = false;
    let interval: any = null;

    const onSuccess = (token: string) => {
      if (settled) return;
      settled = true;
      if (interval) clearInterval(interval);
      window.removeEventListener("storage", storageHandler);
      if (puter && token && token !== "no-token-available") {
        puter.authToken = token;
      }
      resolve(token);
    };

    const onFailure = (err: any) => {
      console.warn("Puter sign-in attempt warning/error:", err);
    };

    // 1. Storage event listener (fires when other tabs/popups write to localStorage on same origin)
    const storageHandler = (e: StorageEvent) => {
      if (e.key === "puter.auth.token.v2" && e.newValue && e.newValue !== "no-token-available") {
        onSuccess(e.newValue);
      }
    };
    window.addEventListener("storage", storageHandler);

    // 2. Fast polling fallback (every 500ms for 2 minutes)
    let count = 0;
    interval = setInterval(() => {
      const tok = puter?.authToken || localStorage.getItem("puter.auth.token.v2");
      if (tok && tok !== "no-token-available") {
        onSuccess(tok);
      } else if (++count > 240) { // 2 minutes timeout
        if (!settled) {
          settled = true;
          clearInterval(interval);
          window.removeEventListener("storage", storageHandler);
          reject(new Error("Authentication timed out. Please try again."));
        }
      }
    }, 500);

    // 3. Trigger Puter standard sign-in (use option flag if we want guest activation)
    puter.auth.signIn(options?.attemptTempUser ? { attempt_temp_user_creation: true } : {})
      .then((res: any) => {
        const tok = res?.token || puter.authToken || localStorage.getItem("puter.auth.token.v2");
        if (tok && tok !== "no-token-available") {
          onSuccess(tok);
        }
      })
      .catch((err: any) => {
        onFailure(err);
        // If the popup was blocked, reject immediately so the user is prompted to enable popups
        if (err?.error === "popup_blocked") {
          if (!settled) {
            settled = true;
            clearInterval(interval);
            window.removeEventListener("storage", storageHandler);
            reject(new Error("The sign-in popup was blocked by your browser. Please allow popups for this site."));
          }
        }
      });
  });
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

  // 2. Check if user configured a custom Puter Token
  const customPuterToken = typeof window !== "undefined" ? localStorage.getItem("algocheat.puter_token") : null;
  const puter = (window as any).puter;
  if (!puter) {
    throw new Error("Puter.js is not loaded. Please check your connection.");
  }

  if (customPuterToken && customPuterToken.trim().length > 0) {
    puter.authToken = customPuterToken.trim();
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
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

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
async function callWithFallback<T>(action: string, payload: any, endpoint: string): Promise<T> {
  // Check if we have local custom credentials.
  const customOpenAIKey = typeof window !== "undefined" ? localStorage.getItem("algocheat.openai_key") : null;
  const customPuterToken = typeof window !== "undefined" ? localStorage.getItem("algocheat.puter_token") : null;
  const customApiUrl = typeof window !== "undefined" ? localStorage.getItem("algocheat.api_url") : null;

  // Only run client-side direct calls if:
  // 1. We are using a Puter Developer Token, OR
  // 2. We are using a custom OpenAI key starting with "sk-" AND no custom API URL override is specified.
  const canRunClientSide = (customPuterToken && customPuterToken.trim().length > 0) ||
    (customOpenAIKey && customOpenAIKey.trim().startsWith("sk-") && (!customApiUrl || !customApiUrl.trim()));

  if (canRunClientSide) {
    return callClientSidePuterAI(action, payload);
  }

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
