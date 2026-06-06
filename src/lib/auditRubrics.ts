export type ContentType = "text" | "image" | "article";

export interface RubricParam {
  key: string;
  name: string;
  description: string;
}

export const RUBRICS: Record<ContentType, { label: string; params: RubricParam[]; rules: string }> = {
  text: {
    label: "Text Post",
    params: [
      { key: "hook", name: "Hook Strength", description: "First 210 chars before 'see more' must stop the scroll" },
      { key: "dwell", name: "Dwell-Time Structure", description: "Line breaks, white space, scannable formatting" },
      { key: "voice", name: "Authentic Voice", description: "First-person specificity, no AI-generic tone" },
      { key: "value", name: "Value Density", description: "Insight per sentence, zero fluff" },
      { key: "arc", name: "Narrative Arc", description: "Pattern interrupt, story or contrarian POV" },
      { key: "conversation", name: "Conversation Trigger", description: "Genuine open question, not 'Agree?'" },
      { key: "hashtags", name: "Hashtag Discipline", description: "3–5 niche tags, no broad spam tags" },
      { key: "seo", name: "LinkedIn SEO", description: "Keywords & entities for in-platform search" },
      { key: "penalty", name: "Penalty Avoidance", description: "No external links in body, no engagement bait, no pod language" },
      { key: "share", name: "Saveability / Shareability", description: "Frameworks, lists, quotable lines worth saving" },
    ],
    rules:
      "LinkedIn 2026 text post: 1200–1900 chars sweet spot. No outbound links in body (put in first comment). Hook must work in first 2 lines. Reward dwell time with structure. Algorithm now down-ranks generic AI tone, engagement bait ('comment YES'), and pod behavior.",
  },
  image: {
    label: "Text + Image Post",
    params: [
      { key: "hook", name: "Hook Strength", description: "First 210 chars before 'see more'" },
      { key: "synergy", name: "Caption–Image Synergy", description: "Caption rewards looking at the visual" },
      { key: "voice", name: "Authentic Voice", description: "First-person, specific, non-generic" },
      { key: "value", name: "Value Density", description: "Insight per sentence" },
      { key: "arc", name: "Narrative Arc", description: "Pattern interrupt or story" },
      { key: "conversation", name: "Conversation Trigger", description: "Real question that invites a reply" },
      { key: "hashtags", name: "Hashtag Discipline", description: "3–5 niche tags" },
      { key: "seo", name: "LinkedIn SEO", description: "Keywords & entities for search" },
      { key: "penalty", name: "Penalty Avoidance", description: "No external links, no bait" },
      { key: "visual", name: "Visual Hook & Alt-Text", description: "Readable overlay, accessible alt-text, on-brand" },
    ],
    rules:
      "LinkedIn 2026 image post: single image or carousel. Visual must have a textual hook overlay if it's a graphic. Alt-text required for reach. Caption 1000–1600 chars works best. Avoid stock-photo vibes.",
  },
  article: {
    label: "Article",
    params: [
      { key: "title", name: "SEO Title", description: "≤60 chars, primary keyword front-loaded" },
      { key: "subheads", name: "Subhead Hierarchy", description: "H2/H3 every 200–300 words" },
      { key: "voice", name: "Authentic Voice", description: "Expert first-person, not generic" },
      { key: "value", name: "Value Density", description: "Original insight, not rehashed" },
      { key: "arc", name: "Narrative Arc", description: "Clear thesis → evidence → payoff" },
      { key: "tldr", name: "TL;DR Block", description: "Top-of-article summary for scanners" },
      { key: "meta", name: "Meta Description", description: "≤155 chars, keyword-rich" },
      { key: "internal", name: "Internal Links & Tags", description: "Creator-mode tags, links to your other articles" },
      { key: "credibility", name: "Citations & Credibility", description: "Sources, data, named experts" },
      { key: "share", name: "Saveability", description: "Frameworks, checklists, quotable assets" },
    ],
    rules:
      "LinkedIn 2026 long-form article: 1500–2500 words ideal. Algorithm rewards dwell time, scroll depth, and saves. Front-load SEO title with keyword. TL;DR at top. Cite sources by name.",
  },
};

export function buildAuditPrompt(type: ContentType, content: string, imageDescription?: string) {
  const r = RUBRICS[type];
  const paramList = r.params.map((p, i) => `${i + 1}. ${p.key} — ${p.name}: ${p.description}`).join("\n");
  const visual = type === "image" && imageDescription ? `\n\nIMAGE DESCRIPTION:\n${imageDescription}` : "";
  return `You are a strict LinkedIn 2026 algorithm auditor AND a voice-preservation expert. Score the user's ${r.label} against EXACTLY these 10 parameters:

${paramList}

ALGORITHM RULES (2026):
${r.rules}

USER CONTENT:
"""
${content}
"""${visual}

VOICE FINGERPRINT INSTRUCTION (critical):
Before scoring or rewriting, silently analyze and internalize the author's unique voice fingerprint from the content above. Identify:
1. Tone register: Is it formal, casual, punchy, dry, passionate, authoritative?
2. Sentence rhythm: Short and punchy? Long and flowing? Mixed? Do they use fragments?
3. Punctuation style: Heavy use of ellipsis (...), em-dashes (—), exclamation marks, minimal punctuation?
4. Vocabulary & register: Corporate jargon, plain English, technical, colloquial, mixed?
5. Structural signature: Lists? Rhetorical questions? Numbered frameworks? Story-first? Data-first?

REWRITE RULES (non-negotiable):
- The rewrite must sound like the SAME PERSON wrote it after a careful second edit — not a different writer
- ONLY fix what the audit flags as broken. Preserve everything else
- Never introduce vocabulary, sentence structures, or punctuation the original author did not use
- Never switch tone register (casual must stay casual, punchy must stay punchy)
- Never add bullet lists, em-dashes, "frameworks", or formal language if the original writer didn't use them
- The writer must feel their voice is intact — only the algorithm weaknesses are fixed

Return ONLY valid JSON (no markdown, no prose) in this exact shape:
{
  "overall": <0-100 integer>,
  "verdict": "<one sentence verdict>",
  "scores": [
    { "key": "<param key>", "name": "<param name>", "score": <0-10 integer>, "issue": "<what is wrong>", "fix": "<specific fix>" }
  ],
  "voiceFingerprint": "<5 bullet points — 1. Tone: ... 2. Rhythm: ... 3. Punctuation: ... 4. Vocabulary: ... 5. Structure: ...>",
  "rewritten": "<voice-preserved, algorithm-optimized rewrite that sounds exactly like the same author>"
}`;
}

export function buildGeneratePrompt(type: ContentType, topic: string) {
  const r = RUBRICS[type];
  return `You are an elite LinkedIn 2026 content writer. Create a ${r.label} on this topic/niche:

TOPIC: ${topic}

It MUST score 10/10 on every one of these parameters:
${r.params.map((p, i) => `${i + 1}. ${p.name}: ${p.description}`).join("\n")}

ALGORITHM RULES:
${r.rules}

Return ONLY valid JSON (no markdown) in this exact shape:
{
  "content": "<the full post/article text, ready to paste into LinkedIn>",
  "notes": "<2-3 sentence explanation of why this scores 10/10>"
}`;
}
