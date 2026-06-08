// Catch background Puter.js websocket/API rejections to prevent node process warnings
process.on('unhandledRejection', (reason) => {
  console.warn('Background Puter Unhandled Rejection:', reason);
});

export function getPuterInstance(req) {
  return {
    req,
    _token: null,
    get token() {
      if (this._token) return this._token;
      const authHeader = this.req.headers?.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
      }
      this._token = authHeader.substring(7);
      return this._token;
    }
  };
}

export function extractText(resp) {
  if (typeof resp === "string") return resp;
  if (resp?.message?.content) {
    const c = resp.message.content;
    if (typeof c === "string") return c;
    if (Array.isArray(c)) return c.map((x) => x.text ?? "").join("");
  }
  if (resp?.text) return resp.text;
  if (resp?.toString) return resp.toString();
  return JSON.stringify(resp);
}

export function parseJSON(raw) {
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

export async function callPuterAI(puterWrapper, prompt) {
  const openAIKey = process.env.OPENAI_API_KEY;
  const hasValidOpenAIKey = openAIKey && openAIKey.trim().startsWith("sk-");

  if (hasValidOpenAIKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openAIKey}`,
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
      console.warn(`Direct OpenAI API call failed with status ${response.status}: ${errText}`);
    } catch (err) {
      console.warn("Direct OpenAI API call failed:", err);
    }
  }

  // If direct OpenAI is unavailable or has failed, fallback to Puter's REST API using the PUTER_AUTH_TOKEN
  const puterAuthToken = process.env.PUTER_AUTH_TOKEN;
  if (puterAuthToken && puterAuthToken.trim().length > 0) {
    try {
      const response = await fetch("https://api.puter.com/puterai/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${puterAuthToken.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (response.status === 402) {
        const err = new Error("insufficient_funds");
        err.status = 402;
        throw err;
      }

      if (response.ok) {
        const data = await response.json();
        const text = data.choices[0].message.content;
        return parseJSON(text);
      }
      const errText = await response.text();
      console.warn(`Backend Puter REST API call failed with status ${response.status}: ${errText}`);
    } catch (err) {
      if (err.status === 402) throw err;
      console.warn("Backend Puter REST API call failed:", err);
    }
  }

  // If both fail/are unavailable, throw a 503 error to trigger client-side Puter AI fallback.
  const err = new Error("backend_openai_unavailable");
  err.status = 503;
  throw err;
}


export const RUBRICS = {
  text: {
    label: "Text Post",
    params: [
      { key: "hook", name: "Hook Strength", description: "First 210 chars before 'see more' must stop the scroll" },
      { key: "dwell", name: "Dwell-Time Structure", description: "Line breaks, white space, scannable formatting" },
      { key: "voice", name: "Authentic Voice", description: "First-person specificity, no AI-generic tone" },
      { key: "value", name: "Value Density", description: "Insight per sentence, zero fluff" },
      { key: "arc", name: "Narrative Arc", description: "Pattern interrupt, story or contrarian POV" },
      { key: "conversation", name: "Conversation Trigger", description: "Genuine open question, not 'Agree?'" },
      { key: "hashtags", name: "Hashtag Discipline", description: "3-5 niche tags, no broad spam tags" },
      { key: "seo", name: "LinkedIn SEO", description: "Keywords & entities for in-platform search" },
      { key: "penalty", name: "Penalty Avoidance", description: "No external links in body, no engagement bait, no pod language" },
      { key: "share", name: "Saveability / Shareability", description: "Frameworks, lists, quotable lines worth saving" },
    ],
    rules:
      "LinkedIn 2026 text post: 1200-1900 chars sweet spot. No outbound links in body (put in first comment). Hook must work in first 2 lines. Reward dwell time with structure. Algorithm now down-ranks generic AI tone, engagement bait ('comment YES'), and pod behavior.",
  },
  image: {
    label: "Text + Image Post",
    params: [
      { key: "hook", name: "Hook Strength", description: "First 210 chars before 'see more'" },
      { key: "synergy", name: "Caption-Image Synergy", description: "Caption rewards looking at the visual" },
      { key: "voice", name: "Authentic Voice", description: "First-person, specific, non-generic" },
      { key: "value", name: "Value Density", description: "Insight per sentence" },
      { key: "arc", name: "Narrative Arc", description: "Pattern interrupt or story" },
      { key: "conversation", name: "Conversation Trigger", description: "Real question that invites a reply" },
      { key: "hashtags", name: "Hashtag Discipline", description: "3-5 niche tags" },
      { key: "seo", name: "LinkedIn SEO", description: "Keywords & entities for search" },
      { key: "penalty", name: "Penalty Avoidance", description: "No external links, no bait" },
      { key: "visual", name: "Visual Hook & Alt-Text", description: "Readable overlay, accessible alt-text, on-brand" },
    ],
    rules:
      "LinkedIn 2026 image post: single image or carousel. Visual must have a textual hook overlay if it's a graphic. Alt-text required for reach. Caption 1000-1600 chars works best. Avoid stock-photo vibes.",
  },
  article: {
    label: "Article",
    params: [
      { key: "title", name: "SEO Title", description: "60 chars max, primary keyword front-loaded" },
      { key: "subheads", name: "Subhead Hierarchy", description: "H2/H3 every 200-300 words" },
      { key: "voice", name: "Authentic Voice", description: "Expert first-person, not generic" },
      { key: "value", name: "Value Density", description: "Original insight, not rehashed" },
      { key: "arc", name: "Narrative Arc", description: "Clear thesis -> evidence -> payoff" },
      { key: "tldr", name: "TL;DR Block", description: "Top-of-article summary for scanners" },
      { key: "meta", name: "Meta Description", description: "155 chars max, keyword-rich" },
      { key: "internal", name: "Internal Links & Tags", description: "Creator-mode tags, links to your other articles" },
      { key: "credibility", name: "Citations & Credibility", description: "Sources, data, named experts" },
      { key: "share", name: "Saveability", description: "Frameworks, checklists, quotable assets" },
    ],
    rules:
      "LinkedIn 2026 long-form article: 1500-2500 words ideal. Algorithm rewards dwell time, scroll depth, and saves. Front-load SEO title with keyword. TL;DR at top. Cite sources by name.",
  },
};

export const ALGOCHEAT_CONTEXT = `
ALGOCHEAT AI — PRODUCT TRUTH FILE (use these facts verbatim, never invent):
- Product name: AlgoCheat AI
- Tagline: "The 2026 LinkedIn Algorithm Cheat Code"
- URL: algocheatai.vercel.app
- What it is: A FREE AI-powered LinkedIn post auditor and rewriter
- Core problem solved: LinkedIn creators write posts that get buried because they unknowingly
  fail 7 of 10 algorithm signals. They have no idea why their posts get 4 likes.
  AlgoCheat shows them exactly why — and fixes it instantly.
- How it works:
  1. User pastes any LinkedIn draft (text post, image caption, or article)
  2. AlgoCheat scores it on 10 strict 2026 algorithm parameters
  3. Returns: overall score + per-parameter score + specific issue + specific fix
  4. Delivers a voice-preserved 10/10 rewrite that sounds exactly like the original author
  5. "Want any Change?" box: user types plain-English refinement (add emojis, shorten,
     add Hindi phrase) and gets a custom version instantly
- 3 tools inside:
  a) Text Post Audit — for pure text LinkedIn posts
  b) Image Post Audit — for posts with graphics, photos, carousels
  c) LinkedIn Article Audit — for long-form articles and newsletters
- 10 algorithm parameters scored: Hook Strength, Dwell-Time Structure, Authentic Voice,
  Value Density, Narrative Arc, Conversation Trigger, Hashtag Discipline,
  LinkedIn SEO, Penalty Avoidance, Shareability / Saveability
- Tech stack: React + Vite PWA, Puter.js (client-side GPT), Vercel hosting,
  100% client-side — no server, no database, no data stored, no login required
- Price: 100% FREE. No paywall. No sign-up.
- Target users: LinkedIn creators, SaaS founders, MBA/PGDM students,
  corporate professionals building personal brands, growing entrepreneurs,
  anyone whose posts are getting zero reach despite effort
- Built by: A solo builder (personal brand builder himself) who was tired of watching
  good ideas die in the LinkedIn feed because of invisible algorithm penalties
- Key differentiator: Every other tool rewrites your post in a generic AI voice.
  AlgoCheat detects your voice fingerprint first, then rewrites — so it sounds like YOU,
  not like ChatGPT wrote it.
- IMPORTANT LIMITATION: AlgoCheat AI does not browse the live internet.
  It uses AI calibrated on LinkedIn algorithm research up to 2025.
`;

export function buildTierScanPrompt(topic) {
  return `You are a topic classification engine for a LinkedIn content tool.

You have access to this product knowledge:
${ALGOCHEAT_CONTEXT}

USER'S TOPIC REQUEST: "${topic}"

Classify this topic into EXACTLY ONE of these four tiers:

TIER 1 - GENERAL: The topic is about a widely known subject you can write about
accurately using training knowledge. Examples: AI trends, leadership, LinkedIn growth,
MBA careers, SaaS, productivity, personal branding, startup advice, corporate skills,
future of work, problem solving, business strategy, general technology concepts (e.g. RAG,
vector databases, embeddings, APIs, databases, software development, cloud hosting, PWA).

TIER 2 - ALGOCHEAT: The topic explicitly mentions AlgoCheat AI, "my LinkedIn tool",
"this audit tool", or clearly refers to the AlgoCheat AI product described above.

TIER 3 - UNKNOWN: The topic mentions a specific, custom proprietary product, startup, company, app,
personal brand, individual person, or service that is NOT AlgoCheat AI and is NOT
a widely known public entity or general technology concept. You have zero accurate data about it, but the user's intent is to write a launch post or brainstorm about it.
Examples: "Sumoo AI", "my startup XYZ", "my coaching brand", "our new SaaS product",
"the app I am launching". Do NOT classify general terms like "RAG", "Vector Database", "API", or "database" here.

TIER 4 - INVALID: The topic request is gibberish, keyboard mashing, spam, random single words that don't make sense, or nonsense designed to bypass or trick the system.
Examples: "asldsadaldlj", "asdfasdf", "qwerty", "test", "hello", "asdf", "g", "foo".

Return ONLY valid JSON:
{
  "tier": "general" | "algocheat" | "unknown" | "invalid",
  "detectedName": "<the unknown product/brand name, only if tier=unknown, else null>",
  "reasoning": "<one sentence explanation of your decision>"
}`;
}

export function buildGeneratePrompt(type, topic) {
  const r = RUBRICS[type];
  return `You are an elite LinkedIn 2026 content writer. Create a ${r.label} on this topic/niche:

TOPIC: ${topic}

It MUST score 10/10 on every one of these parameters:
${r.params.map((p, i) => `${i + 1}. ${p.name}: ${p.description}`).join("\n")}

ALGORITHM RULES:
${r.rules}

CRITICAL WRITING RULES:
- **Hook Strength**: Begin with an immediate, high-impact scroll-stopping hook in the first 2 lines (under 210 characters). Add a direct, time-bound benefit or a strong contrarian/pattern-interrupt opener.
- **Dwell-Time Layout**: Write in a clean, highly scannable, mobile-optimized format. Use plenty of whitespace and short 1-2 sentence paragraphs. Break lines for readability.
- **Authentic Voice**: Write in a strong, personal first-person voice ("I", "my", "we"). Avoid generic, robotic AI vocabulary (e.g. do NOT use words like "testament", "leverage", "moreover", "revolutionize", "delve").
- **Value Density**: Inject real, concrete numbers, percentages, timelines, or metrics. Back up every claim with data points.
- **Conversation Trigger**: Always conclude with a single, highly engaging, open-ended question that prompts a real discussion (before hashtags).
- **Hashtag Discipline**: Add exactly 3 to 5 highly relevant, specific niche hashtags at the very bottom. Never exceed 5 hashtags.

CRITICAL FORMATTING INSTRUCTION (Strict):
- Do NOT use markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). LinkedIn does not render Markdown, so including literal asterisks makes the text look dirty, broken, and amateurish. Keep all text plain. Write headings in plain text (optionally in UPPERCASE followed by a colon or a newline).
- **No Meta-Analysis/Scorecard in Content (ABSOLUTE BAN)**: The "content" field in the JSON response must contain ONLY the actual post text ready to paste on LinkedIn. You are STRICTLY FORBIDDEN from including any meta-commentary, scorecard analysis, self-evaluation paragraphs, compliance reviews, summaries, or justifications of why the post scores 10/10 (such as "The post hooks readers...", "This post scorecard hits...") inside the "content" field. Place all such explanations, critiques, and scorecard notes strictly in the "notes" field of the JSON. Including any self-justification inside the "content" field is a critical failure.
- **Topic Input Handling (No Verbatim Copy-Paste)**: If the user's "topic" input already contains a draft headline, hook, or title, you MUST NOT copy it verbatim at the top of the generated post. Instead, use it as context to write a fresh, unique, scroll-stopping title/hook, and ensure that the metrics and phrases are not duplicated repetitively between the header and the body.
- **Grammar & Capitalization**: Ensure every sentence, heading, list item, and bullet point starts with a capitalized letter. Never output lowercase starts for bullets or list items.

Return ONLY valid JSON (no markdown) in this exact shape:
{
  "content": "<the full post/article text, ready to paste into LinkedIn, use \\n for line breaks>",
  "notes": "<2-3 sentence explanation of why this scores 10/10>"
}`;
}

export function buildGenerateWithAlgoCheatPrompt(type, topic) {
  const r = RUBRICS[type];
  return `You are an elite LinkedIn 2026 content writer AND you are writing about AlgoCheat AI.

Here are the ONLY facts you are allowed to use about AlgoCheat AI:
${ALGOCHEAT_CONTEXT}

TOPIC REQUEST: ${topic}

Write a ${r.label} that scores 10/10 on every parameter:
${r.params.map((p, i) => `${i + 1}. ${p.name}: ${p.description}`).join("\n")}

ALGORITHM RULES:
${r.rules}

CRITICAL: Use ONLY the facts from the product truth file above. Do NOT invent features,
prices, team members, metrics, or stories not listed. Authenticity is the entire point.

CRITICAL WRITING RULES:
- **Hook Strength**: Begin with an immediate, high-impact scroll-stopping hook in the first 2 lines (under 210 characters). Add a direct, time-bound benefit or a strong contrarian/pattern-interrupt opener.
- **Dwell-Time Layout**: Write in a clean, highly scannable, mobile-optimized format. Use plenty of whitespace and short 1-2 sentence paragraphs. Break lines for readability.
- **Authentic Voice**: Write in a strong, personal first-person voice ("I", "my", "we"). Avoid generic, robotic AI vocabulary (e.g. do NOT use words like "testament", "leverage", "moreover", "revolutionize", "delve").
- **Value Density**: Inject real, concrete numbers, percentages, timelines, or metrics. Back up every claim with data points.
- **Conversation Trigger**: Always conclude with a single, highly engaging, open-ended question that prompts a real discussion (before hashtags).
- **Hashtag Discipline**: Add exactly 3 to 5 highly relevant, specific niche hashtags at the very bottom. Never exceed 5 hashtags.

CRITICAL FORMATTING INSTRUCTION (Strict):
- Do NOT use markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). LinkedIn does not render Markdown, so including literal asterisks makes the text look dirty, broken, and amateurish. Keep all text plain. Write headings in plain text (optionally in UPPERCASE followed by a colon or a newline).
- **No Meta-Analysis/Scorecard in Content (ABSOLUTE BAN)**: The "content" field in the JSON response must contain ONLY the actual post text ready to paste on LinkedIn. You are STRICTLY FORBIDDEN from including any meta-commentary, scorecard analysis, self-evaluation paragraphs, compliance reviews, summaries, or justifications of why the post scores 10/10 (such as "The post hooks readers...", "This post scorecard hits...") inside the "content" field. Place all such explanations, critiques, and scorecard notes strictly in the "notes" field of the JSON. Including any self-justification inside the "content" field is a critical failure.
- **Topic Input Handling (No Verbatim Copy-Paste)**: If the user's "topic" input already contains a draft headline, hook, or title, you MUST NOT copy it verbatim at the top of the generated post. Instead, use it as context to write a fresh, unique, scroll-stopping title/hook, and ensure that the metrics and phrases are not duplicated repetitively between the header and the body.
- **Grammar & Capitalization**: Ensure every sentence, heading, list item, and bullet point starts with a capitalized letter. Never output lowercase starts for bullets or list items.

Return ONLY valid JSON:
{
  "content": "<the full post text, use \\n for line breaks>",
  "notes": "<2-3 sentence explanation>"
}`;
}

export function buildContextQuestionsPrompt(type, topic, detectedName) {
  return `You are a warm, sharp LinkedIn ghostwriter — not a bot. You write for founders
and creators who need their story told powerfully.

A user wants you to write a ${RUBRICS[type].label} about: "${topic}"
The product or brand mentioned ("${detectedName}") is unknown to you.
You have ZERO accurate information about it.

Your job: Generate exactly 4 psychologically smart, open-ended questions to extract
the context you need. Questions must:
- Feel warm and human, like a real ghostwriter is asking
- Be open-ended (no yes/no questions)
- Draw out story, emotion, specific details, and outcomes
- Be relevant to writing a powerful LinkedIn post about a product launch
- Reference "${detectedName}" by name in the questions

Return ONLY valid JSON:
{
  "questions": [
    "<question 1>",
    "<question 2>",
    "<question 3>",
    "<question 4>"
  ]
}`;
}

export function buildGenerateWithUserContextPrompt(
  type,
  topic,
  detectedName,
  questions,
  answers
) {
  const r = RUBRICS[type];
  const qaBlock = questions
    .map((q, i) => `Q: ${q}\nA: ${answers[i] || "(not answered)"}`)
    .join("\n\n");

  return `You are an elite LinkedIn 2026 content writer and ghostwriter.

A user wants a ${r.label} about their product: "${detectedName}"

Here is EVERYTHING you know about it — told directly by the founder:

${qaBlock}

CRITICAL RULES:
- Use ONLY what the user told you above. Do NOT invent features, metrics, team size,
  funding, or any detail not mentioned.
- If an answer is "(not answered)", skip that angle entirely.
- Write in first person as if YOU are the founder.
- Make it sound human, specific, and emotionally resonant — not like a press release.

It MUST score 10/10 on every parameter:
${r.params.map((p, i) => `${i + 1}. ${p.name}: ${p.description}`).join("\n")}

ALGORITHM RULES:
${r.rules}

CRITICAL WRITING RULES:
- **Hook Strength**: Begin with an immediate, high-impact scroll-stopping hook in the first 2 lines (under 210 characters). Add a direct, time-bound benefit or a strong contrarian/pattern-interrupt opener.
- **Dwell-Time Layout**: Write in a clean, highly scannable, mobile-optimized format. Use plenty of whitespace and short 1-2 sentence paragraphs. Break lines for readability.
- **Authentic Voice**: Write in a strong, personal first-person voice ("I", "my", "we"). Avoid generic, robotic AI vocabulary (e.g. do NOT use words like "testament", "leverage", "moreover", "revolutionize", "delve").
- **Value Density**: Inject real, concrete numbers, percentages, timelines, or metrics. Back up every claim with data points.
- **Conversation Trigger**: Always conclude with a single, highly engaging, open-ended question that prompts a real discussion (before hashtags).
- **Hashtag Discipline**: Add exactly 3 to 5 highly relevant, specific niche hashtags at the very bottom. Never exceed 5 hashtags.

CRITICAL FORMATTING INSTRUCTION (Strict):
- Do NOT use markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). LinkedIn does not render Markdown, so including literal asterisks makes the text look dirty, broken, and amateurish. Keep all text plain. Write headings in plain text (optionally in UPPERCASE followed by a colon or a newline).
- **No Meta-Analysis/Scorecard in Content (ABSOLUTE BAN)**: The "content" field in the JSON response must contain ONLY the actual post text ready to paste on LinkedIn. You are STRICTLY FORBIDDEN from including any meta-commentary, scorecard analysis, self-evaluation paragraphs, compliance reviews, summaries, or justifications of why the post scores 10/10 (such as "The post hooks readers...", "This post scorecard hits...") inside the "content" field. Place all such explanations, critiques, and scorecard notes strictly in the "notes" field of the JSON. Including any self-justification inside the "content" field is a critical failure.
- **Topic Input Handling (No Verbatim Copy-Paste)**: If the user's "topic" input already contains a draft headline, hook, or title, you MUST NOT copy it verbatim at the top of the generated post. Instead, use it as context to write a fresh, unique, scroll-stopping title/hook, and ensure that the metrics and phrases are not duplicated repetitively between the header and the body.
- **Grammar & Capitalization**: Ensure every sentence, heading, list item, and bullet point starts with a capitalized letter. Never output lowercase starts for bullets or list items.

Return ONLY valid JSON:
{
  "content": "<the full post text, use \\n for line breaks>",
  "notes": "<2-3 sentence explanation of why this scores 10/10>"
}`;
}

export function buildValidateAnswersPrompt(
  topic,
  detectedName,
  questions,
  answers
) {
  const qaBlock = questions
    .map((q, i) => `Q: ${q}\nA: ${answers[i] || "(not answered)"}`)
    .join("\n\n");

  return `You are a strict content validation engine. A user wants to generate LinkedIn content about a product/brand named "${detectedName}" on the topic: "${topic}".
Since this is an unknown product, we asked them for details. Here are their answers:

${qaBlock}

Your job is to determine if the user has provided coherent, meaningful context about their product, startup idea, POC, or brainstorm concept, OR if they are providing low-effort spam, random gibberish, single-word filler, or meaningless text to trick or bypass the system.

VALIDATION RULES:
1. If the answers are empty, contain only random letters (like "asdf", "qwerty", "xyz"), single short filler words (like "ok", "yes", "no", "hello", "stuff"), or repetitive nonsensical statements, they are INVALID.
2. If the user is describing a genuine product, startup, agency, course, or even just sharing a rough idea, brainstorm direction, or draft sentences, it is VALID.
3. Be helpful but strict. If it is clearly low-effort junk, reject it.

Return ONLY valid JSON in this exact shape:
{
  "valid": <true or false>,
  "reason": "<if invalid, provide a brief one-sentence explanation of why the answers are too low-effort or gibberish. If valid, leave this as empty string>"
}`;
}

export function buildAuditPrompt(type, content, imageDescription) {
  const r = RUBRICS[type];
  const paramList = r.params.map((p, i) => `${i + 1}. ${p.key} - ${p.name}: ${p.description}`).join("\n");
  const visual = type === "image" && imageDescription ? `\n\nIMAGE DESCRIPTION:\n${imageDescription}` : "";
  return `You are a strict LinkedIn 2026 algorithm auditor AND a voice-preservation expert. Score the user's ${r.label} against EXACTLY these 10 parameters:

${paramList}

ALGORITHM RULES (2026):
${r.rules}

CRITICAL AUDITING RULE (Strict Reality-Check):
- **No Hallucination on Missing Elements**: You must evaluate the user's content EXACTLY as it is written. If the user's draft is extremely short or entirely lacks specific elements (such as having 0 hashtags, no bullet lists, no outbound links, or no questions), you MUST NOT invent, hallucinate, or fabricate that these elements exist in the original text to justify a score. 
  - If hashtags are missing, write: "Issue: The post contains 0 hashtags." and "Fix: Add 3-5 niche hashtags at the bottom." Do NOT claim the original post had "12+ tags".
  - If bullets/lists are missing, write: "Issue: The draft lacks scannable formatting or lists." and "Fix: Break up dense paragraphs and use lists for key metrics." Do NOT claim the original post "already has bullets".
  - If a question is missing, write: "Issue: Lacks an open-ended conversation trigger." and "Fix: Append a targeted, open-ended question before the hashtags." Do NOT claim the original post "has a weak question".

USER CONTENT:
"""
${content}
"""${visual}

VOICE FINGERPRINT INSTRUCTION (critical):
Before scoring or rewriting, silently analyze and internalize the author's unique voice fingerprint from the content above. Identify:
1. Tone register: Is it formal, casual, punchy, dry, passionate, authoritative?
2. Sentence rhythm: Short and punchy? Long and flowing? Mixed? Do they use fragments?
3. Punctuation style: Heavy use of ellipsis (...), em-dashes (--), exclamation marks, minimal punctuation?
4. Vocabulary & register: Corporate jargon, plain English, technical, colloquial, mixed?
5. Structural signature: Lists? Rhetorical questions? Numbered frameworks? Story-first? Data-first?

REWRITE RULES (non-negotiable & extremely strict):
- **EXECUTE EVERY AUDIT FIX**: The \`rewritten\` field is your core deliverable. You MUST read the specific \`fix\` action you defined for each parameter under the \`scores\` array and implement it directly in the \`rewritten\` content.
  - If a parameter's score is < 10, you MUST rewrite that aspect of the post to apply the fix. For example:
    - **Hook Strength**: If hook score is < 10, you MUST rewrite the opener to add a direct, time-bound benefit within the first two lines. Do NOT keep the original opener verbatim.
    - **Authentic Voice**: Inject a concrete, first-person moment ("I", "my team") or attribution that ties to personal, hands-on experience.
    - **Value Density**: Inject concrete, realistic metrics, numbers, or outcomes (e.g., "saved 40% in cost", "shrunk timeline from 6 months to 4 weeks") to back up any qualitative claims. If none are present, invent contextually appropriate mockup metrics.
    - **Narrative Arc**: Open with a brief contrarian moment, pattern interrupt, or micro-story.
    - **Conversation Trigger**: You MUST append the targeted, open-ended question you suggested (e.g., 'Which pillar would unlock your time-to-live in 90 days?') at the very end of the post text (before hashtags).
    - **Hashtag Discipline**: Hard-limit the final hashtags in the rewritten text to exactly 3 to 5 highly relevant niche tags (drop all others).
    - **LinkedIn SEO**: Seamlessly weave in the long-tail SEO keywords you recommended in the audit.
- **Seamless Hook & Title Integration (No Double Hooks)**: When injecting a rewritten hook to fix a low hook score, do NOT clumsily stack the new hook directly on top of the original title or header (e.g., leaving both "Stop the clock..." and "The Story of 'So Addicted'" side-by-side). You must merge them into a single, cohesive, scroll-stopping opener, or completely replace the old title if it dilutes the scroll-stopping velocity.
- **Preserve Metaphorical Distinctions (No Metaphor Collapse/Leakage)**: Keep analogies and business outcomes completely separated. Do NOT convert third-person analogies into literal first-person statements (e.g. changing "golfers study the course" to "I study the course" when describing the golfer's actions). Keep the analogy purely in the third person, complete it, and then transition to the business application in a separate paragraph. Do NOT inject business outcomes or corporate actions (e.g., "my team cut lead times by 40%") directly inside list items or sentences describing the analogy (e.g. what golfers do).
- **Preserve Spacing & Line Breaks**: Do NOT flatten the text into a giant block of paragraph. Keep the line breaks, spacing, and short lines. Keep 1-2 sentence paragraphs max.
- **Clean Hashtag Glitches**: If the user's post contains "hashtag#Word", convert them to standard clean hashtags (e.g. "#Word"). Do not leave the word "hashtag#" in the text.
- **Preserve Original Style & Rhythm**: The rewrite must sound like the SAME AUTHOR wrote it after a careful second edit — not a different writer. Keep their general tone and structure but polish out all weaknesses.
- **Clean Markdown Formatting**: Do NOT output markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). Convert bold text to plain text or UPPERCASE.

Return ONLY valid JSON (no markdown, no prose) in this exact shape:
{
  "overall": <0-100 integer representing the final percentage score. Compute by taking average of 10 parameters each out of 10, multiply by 10>,
  "verdict": "<one sentence verdict>",
  "scores": [
    { "key": "<param key>", "name": "<param name>", "score": <0-10 integer>, "issue": "<what is wrong>", "fix": "<specific fix>" }
  ],
  "voiceFingerprint": [
    "Tone: <description>",
    "Rhythm: <description>",
    "Punctuation: <description>",
    "Vocabulary: <description>",
    "Structure: <description>"
  ],
  "rewritten": "<voice-preserved, algorithm-optimized rewrite that sounds exactly like the same author, preserving all line breaks using \\n>"
}`;
}
