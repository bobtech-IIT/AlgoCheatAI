import { buildAuditPrompt, buildGeneratePrompt, ContentType } from "./auditRubrics";

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (
          prompt: string,
          options?: { model?: string; stream?: boolean }
        ) => Promise<any>;
      };
    };
  }
}

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
  voiceFingerprint?: string;
  rewritten: string;
}

export interface GenerateResult {
  content: string;
  notes: string;
}

const MODEL = "gpt-5-nano";

function ensurePuter() {
  if (typeof window === "undefined" || !window.puter?.ai?.chat) {
    throw new Error(
      "Puter.js is still loading. Refresh the page in a second and try again."
    );
  }
}

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

function parseJSON<T>(raw: string): T {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const slice = start >= 0 && end >= 0 ? cleaned.slice(start, end + 1) : cleaned;
  return JSON.parse(slice) as T;
}

async function callPuter<T>(prompt: string): Promise<T> {
  ensurePuter();
  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const resp = await window.puter!.ai.chat(prompt, { model: MODEL });
      const text = extractText(resp);
      return parseJSON<T>(text);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("AI request failed");
}

export function auditContent(args: {
  type: ContentType;
  content: string;
  imageDescription?: string;
}) {
  const prompt = buildAuditPrompt(args.type, args.content, args.imageDescription);
  return callPuter<AuditResult>(prompt);
}

export function generateContent(args: { type: ContentType; topic: string }) {
  const prompt = buildGeneratePrompt(args.type, args.topic);
  return callPuter<GenerateResult>(prompt);
}
