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
  const req = puterWrapper?.req;
  const customKey = req?.headers?.["x-custom-api-key"];
  const customUrl = req?.headers?.["x-custom-api-url"];
  const customModel = req?.headers?.["x-custom-api-model"];

  let activeKey = process.env.CEREBRAS_API_KEY;
  let activeUrl = "https://api.cerebras.ai/v1/chat/completions";
  let activeModel = "gpt-oss-120b";

  if (!activeKey && !customKey?.trim()) {
    console.warn("CEREBRAS_API_KEY environment variable is not defined on the backend!");
  }

  if (customKey?.trim()) {
    activeKey = customKey.trim();
    if (customUrl?.trim()) {
      activeUrl = customUrl.trim();
    } else if (activeKey.startsWith("sk-")) {
      activeUrl = "https://api.openai.com/v1/chat/completions";
    }
    
    if (customModel?.trim()) {
      activeModel = customModel.trim();
    } else if (activeKey.startsWith("sk-")) {
      activeModel = "gpt-4o-mini";
    }
  }

  async function tryProviders() {
    try {
      const ALLOWED_API_HOSTS = ["api.openai.com", "api.cerebras.ai", "api.puter.com"];
      const parsedUrl = new URL(activeUrl);
      if (!ALLOWED_API_HOSTS.includes(parsedUrl.hostname)) {
        throw new Error("Disallowed API URL");
      }

      const response = await fetch(activeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeKey}`,
        },
        body: JSON.stringify({
          model: activeModel,
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
      console.warn(`Direct API call to ${activeUrl} failed with status ${response.status}: ${errText}`);
    } catch (err) {
      console.warn(`Direct API call to ${activeUrl} failed:`, err);
    }

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

    return null;
  }

  let result = await tryProviders();
  if (result !== null) return result;

  await new Promise(resolve => setTimeout(resolve, 1000));
  result = await tryProviders();
  if (result !== null) return result;

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
vector databases, embeddings, APIs, databases, software development, cloud hosting, PWA),
general religion/philosophy/scriptures (e.g. Bhagavad Gita, Stoicism, Vedas, Bible), history, or literature.

TIER 2 - ALGOCHEAT: The topic explicitly mentions AlgoCheat AI, "my LinkedIn tool",
"this audit tool", or clearly refers to the AlgoCheat AI product described above.

TIER 3 - UNKNOWN: The topic mentions a specific, custom proprietary product, startup, company, app,
personal brand, individual person, or service that is NOT AlgoCheat AI and is NOT
a widely known public entity or general technology concept. You have zero accurate data about it, but the user's intent is to write a launch post or brainstorm about it.
Examples: "Sumoo AI", "my startup XYZ", "my coaching brand", "our new SaaS product",
"the app I am launching". Do NOT classify general terms like "RAG", "Vector Database", "API", or "database" here.

TIER 4 - INVALID: The topic request is absolute gibberish, random keyboard mashing, or uninterpretable spam.
Examples: "asldsadaldlj", "asdfasdf", "qwerty", "asdf", "g", "foo".

CRITICAL CLASSIFICATION RULE:
- Do NOT classify a request as INVALID just because it contains typos, asks an unusual or illogical question, or mixes unrelated concepts (e.g., asking what ancient scriptures say about a modern/western name or term). If the request forms a coherent sentence, question, or contains readable words, classify it as TIER 1 - GENERAL or TIER 3 - UNKNOWN, never INVALID. Only use INVALID for true keyboard mashing or single nonsense words.

Return ONLY valid JSON:
{
  "tier": "general" | "algocheat" | "unknown" | "invalid",
  "detectedName": "<the unknown product/brand name, only if tier=unknown, else null>",
  "suggestedCorrection": "<suggested spelling/semantic correction for any typo or ambiguous term, e.g. 'Lokas' instead of 'Lukas' in the context of Bhagavad Gita. Set to null if there is no typo or ambiguity>",
  "correctedTopic": "<the full corrected topic string with the typo/ambiguity resolved, or null if none>",
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
Above all, write like a REAL PERSON. Not a marketer. Not a tool. Not a guru.
- Use sentence fragments sometimes. Start with 'Honestly...', 'Look...', 'Here's the thing...'
- Vary sentence length. Mix a 3-word sentence with a 20-word sentence.
- Use contractions: 'I'm', 'don't', 'you'll', 'can't', 'it's'
- Add a personal opinion or feeling: 'I was frustrated by...', 'What surprised me was...'
- Avoid perfectly parallel structures. Don't list 4 things with the same emoji prefix.
- The CTA should sound like a conversation: 'What do you think?', 'Curious if you've seen this too...'
- Don't say 'audit, rewrite, ship' or '10/10' or 'perfect score' - it sounds like a sales page.
- One small typo or informal phrasing is better than sterile perfection.
- Write like you're talking to ONE person, not an audience.

Format for readability, not perfection. Short paragraphs. White space. But don't make it look templated.

CRITICAL FORMATTING NOTES (Strict):
- Do NOT use markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). LinkedIn does not render Markdown, so including literal asterisks makes the text look broken and amateurish. Keep all text plain.
- **No Meta-Analysis/Scorecard in Content (ABSOLUTE BAN)**: The "content" field must contain ONLY the actual post text ready to paste on LinkedIn. You are STRICTLY FORBIDDEN from including any meta-commentary, scorecard analysis, self-evaluation, compliance reviews, summaries, or justifications of why the post scores perfectly inside the "content" field. Place all such explanations strictly in the "notes" field.
- **Topic Input Handling**: If the user's "topic" input already contains a draft headline, hook, or title, do NOT copy it verbatim at the top. Use it as context to write a fresh hook and avoid duplicating metrics/phrases.

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
Above all, write like a REAL PERSON. Not a marketer. Not a tool. Not a guru.
- Use sentence fragments sometimes. Start with 'Honestly...', 'Look...', 'Here's the thing...'
- Vary sentence length. Mix a 3-word sentence with a 20-word sentence.
- Use contractions: 'I'm', 'don't', 'you'll', 'can't', 'it's'
- Add a personal opinion or feeling: 'I was frustrated by...', 'What surprised me was...'
- Avoid perfectly parallel structures. Don't list 4 things with the same emoji prefix.
- The CTA should sound like a conversation: 'What do you think?', 'Curious if you've seen this too...'
- Don't say 'audit, rewrite, ship' or '10/10' or 'perfect score' - it sounds like a sales page.
- One small typo or informal phrasing is better than sterile perfection.
- Write like you're talking to ONE person, not an audience.

Format for readability, not perfection. Short paragraphs. White space. But don't make it look templated.

CRITICAL FORMATTING NOTES (Strict):
- Do NOT use markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). LinkedIn does not render Markdown, so including literal asterisks makes the text look broken and amateurish. Keep all text plain.
- **No Meta-Analysis/Scorecard in Content (ABSOLUTE BAN)**: The "content" field must contain ONLY the actual post text ready to paste on LinkedIn. You are STRICTLY FORBIDDEN from including any meta-commentary, scorecard analysis, self-evaluation, compliance reviews, summaries, or justifications of why the post scores perfectly inside the "content" field. Place all such explanations strictly in the "notes" field.
- **Topic Input Handling**: If the user's "topic" input already contains a draft headline, hook, or title, do NOT copy it verbatim at the top. Use it as context to write a fresh hook and avoid duplicating metrics/phrases.

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
Above all, write like a REAL PERSON. Not a marketer. Not a tool. Not a guru.
- Use sentence fragments sometimes. Start with 'Honestly...', 'Look...', 'Here's the thing...'
- Vary sentence length. Mix a 3-word sentence with a 20-word sentence.
- Use contractions: 'I'm', 'don't', 'you'll', 'can't', 'it's'
- Add a personal opinion or feeling: 'I was frustrated by...', 'What surprised me was...'
- Avoid perfectly parallel structures. Don't list 4 things with the same emoji prefix.
- The CTA should sound like a conversation: 'What do you think?', 'Curious if you've seen this too...'
- Don't say 'audit, rewrite, ship' or '10/10' or 'perfect score' - it sounds like a sales page.
- One small typo or informal phrasing is better than sterile perfection.
- Write like you're talking to ONE person, not an audience.

Format for readability, not perfection. Short paragraphs. White space. But don't make it look templated.

CRITICAL FORMATTING NOTES (Strict):
- Do NOT use markdown bold or italic formatting (like double asterisks '**' or single asterisks '*'). LinkedIn does not render Markdown, so including literal asterisks makes the text look broken and amateurish. Keep all text plain.
- **No Meta-Analysis/Scorecard in Content (ABSOLUTE BAN)**: The "content" field must contain ONLY the actual post text ready to paste on LinkedIn. You are STRICTLY FORBIDDEN from including any meta-commentary, scorecard analysis, self-evaluation, compliance reviews, summaries, or justifications of why the post scores perfectly inside the "content" field. Place all such explanations strictly in the "notes" field.
- **Topic Input Handling**: If the user's "topic" input already contains a draft headline, hook, or title, do NOT copy it verbatim at the top. Use it as context to write a fresh hook and avoid duplicating metrics/phrases.

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

export function buildAuditPrompt(type, content, imageDescription, performance) {
  const visual = type === "image" && imageDescription ? `\n\nIMAGE DESCRIPTION:\n${imageDescription}` : "";
  const performanceContext = performance ? `\n\nACTUAL PERFORMANCE DATA:\n- Impressions: ${performance.impressions ?? "unknown"}\n- Reactions: ${performance.reactions ?? "unknown"}\n- Comments: ${performance.comments ?? "unknown"}\n- Reposts: ${performance.reposts ?? "unknown"}` : "";
  const sessionSeed = Math.floor(1000 + Math.random() * 9000);

  return `You are a senior LinkedIn content strategist — the kind who has been reading feeds since before the algorithm cared about dwell time. You audit posts like a diagnostician, not a cheerleader. No flattery, no padding. Every score must be defensible against real performance data. You never conflate writing quality with post performance.

#SESSION_SEED: ${sessionSeed}

USER CONTENT TO AUDIT:
"""
${content}
"""${visual}${performanceContext}

Alright, let's walk through this one piece at a time.

### PASS 1 — RAW SCORING

First, what format are we looking at?
Classify into exactly one: TEXT_ONLY, IMAGE_SINGLE, IMAGE_MULTI, CAROUSEL_DOC, VIDEO, POLL, or TEXT_LINK_PREVIEW.

Each format has its own weight distribution. Here's how they break down:

**TEXT_ONLY** — Hook Strength is the heavyweight here, roughly 3x the pull of the lightest parameters. Dwell-Time and Value Density are right behind it, each carrying nearly as much influence as Hook. Authentic Voice and Narrative Arc sit in the middle — they matter but can't rescue a weak opener. Conversation Trigger is a solid mid-tier factor. Hashtag Discipline and LinkedIn SEO are lighter but can still tip a borderline score. Penalty Avoidance and Saveability are the lightest — a few points either way.

**IMAGE_SINGLE / IMAGE_MULTI** — Conversation Trigger becomes the lead factor, roughly double Hook's weight in this format. Authentic Voice and Shareability both jump up significantly. Value Density and Hashtag Discipline sit mid-tier. Penalty Avoidance is close behind. Narrative Arc and LinkedIn SEO are lighter. Hook and Dwell shrink compared to text posts.

**CAROUSEL_DOC** — Dwell-Time and Value Density lead here — slide architecture drives everything, each carrying roughly 3x the weight of the lightest factors. Hook and Arc follow close behind. Voice and Conversation Trigger sit mid-tier. Hashtags, SEO, Penalty Avoidance, and Shareability fill out the lighter end.

**VIDEO** — Hook, Dwell, and Voice are the big three, collectively carrying nearly half the total weight. Value Density and Narrative Arc trail closely behind. Conversation Trigger sits mid-tier. Hashtags, SEO, Penalty Avoidance, and Shareability round out the lighter side.

**TEXT_LINK_PREVIEW** — Hook carries heavy weight here — roughly 2.5x the lightest factors. Voice, Conversation Trigger, and Penalty Avoidance are all close behind, each carrying significant influence — the link preview changes the dynamics. Value Density, Dwell-Time, and Narrative Arc sit mid-tier. Hashtag Discipline and LinkedIn SEO are lighter. Shareability is the lightest.

Now score each of the 10 parameters from 1 to 10 using the strict rubrics below. Be honest, be specific:

1. **Hook Strength**:
   - For TEXT_ONLY: Score the first line. 9-10 (Specific, surprising, or counterintuitive claim; creates immediate tension or curiosity); 7-8 (Clear position/declarative statement; earns read); 5-6 (Functional opener, informative but not compelling); 3-4 (Rhetorical question, "Have you noticed...", "What if I told you...", "Hot take:"); 1-2 (Filler: "I wanted to share...", "Today I'm excited to...", "Thoughts on:").
   - For IMAGE-LED formats: Score visual + first line combined. 9-10 (Visual arresting AND first line adds context/tension); 7-8 (Visual strong, first line functional); 5-6 (Average visual); 3-4 (Weak/stock visual); 1-2 (No visual or text stops scroll).
   - CRITICAL: If format is image-led but visual is UNKNOWN, withhold hook score (assign 1) and flag as PENDING.

2. **Dwell-Time Structure**:
   - 9-10 (Deliberate rhythm, alternating short/punchy lines, progressive information release); 7-8 (Clear readable structure, no wall-of-text); 5-6 (Readable but flat); 3-4 (Dense blocks, no line breaks); 1-2 (Unreadable).
   - For CAROUSEL_DOC: Score slide architecture (cover -> body -> CTA), not caption rhythm.

3. **Authentic Voice**:
   - 9-10 (Unmistakably personal, specific details/opinions/experiences, clear editorial stance); 7-8 (Has POV, consistent voice); 5-6 ("I found this interesting" but passive); 3-4 (No personal voice, press release style); 1-2 (AI-generated/ghostwritten clichés).
   - Watch for: "As someone who has seen firsthand..." with no proof = max 4. "I found X interesting" with no opinion = max 5.

4. **Value Density**:
   - 9-10 (Original insight backed by specific evidence/named mechanism/reframe, highly quotable); 7-8 (One sharp useful idea); 5-6 (Correct but generic); 3-4 (All observation, no insight); 1-2 (Vague buzzwords).
   - TEST: Can you extract one sentence and share it as a standalone insight? If yes, score 7+. If not, score below 6.

5. **Narrative Arc**:
   - 9-10 (Full arc: setup tension -> middle evidence -> resolution/reframe/question); 7-8 (Logical progression from A to B); 5-6 (Thin/repetitive middle); 3-4 (Observation stacked on observation, no arc); 1-2 (No structure, rambling).

6. **Conversation Trigger**:
   - 9-10 (Specific, arguable, slightly provocative question referencing a named category/entity); 7-8 (Clear question inviting experiences); 5-6 (Too broad: "What do you think?"); 3-4 (Implied invitation, hints at agreement); 1-2 (No trigger).
   - CRITICAL RULE: Absent CTA/Conversation Trigger = HARD CAP OF 2/10 for this parameter.

7. **Hashtag Discipline**:
   - 9-10 (3-5 hashtags; mix of 1 high-volume topic, 1-2 mid-volume niche, optional 1 brand tag); 7-8 (3-5 tags, minor misfire); 5-6 (Too generic/too niche); 3-4 (Too many (6+) or too few (0-1)); 1-2 (Random stuffing).
   - COMPETITOR TAGGING: If competitor brand tagged without contrast framing, apply -1.5 penalty to the final Hashtag/Penalty score.

8. **LinkedIn SEO**:
   - 9-10 (2-3 primary keywords in first 2 lines and reinforced in hashtags); 7-8 (Keywords present in body but not opening); 5-6 (Keywords buried); 3-4 (Keywords only in hashtags); 1-2 (No strategy).

9. **Penalty Avoidance**:
   - Start from 10 and deduct. Check each: External link in post body: -2; More than 5 hashtags: -1; Excessive random tagging (3+ people): -2; Competitor tagging without context: -1.5; Engagement bait ("Like if agree", "Tag someone"): -2; Copied/reposted content without attribution: -2; Overly promotional language ("Buy now", "Sign up"): -1.5; All-caps usage (beyond one word): -0.5. Minimum score is 1.

10. **Saveability / Shareability**:
    - 9-10 (Named framework, original data point, quote sharp enough to screenshot); 7-8 (Memorable line/insight); 5-6 (Mildly interesting); 3-4 (No quotable/framework/data); 1-2 (Nothing reusable).

### PASS 2 — CROSS-PARAMETER INTERACTION

Now step back and look at how the raw scores interact. Strong posts have elements that amplify each other:

- **Hook + Dwell synergy**: If both Hook and Dwell are above 7, give each a +0.5 bump. A great hook that's easy to read keeps people engaged longer than either alone.
- **Voice + Value synergy**: Both above 7? Add +0.5 each. Authentic expertise delivering real value is the algorithmic sweet spot.
- **Penalties drag on Hook**: If any significant penalty was applied (external link, engagement bait, over-tagging), reduce Hook by 1. Trust violations undercut the hook's promise.
- **Conversation + Hashtags alignment**: Both above 7? Add +0.3 each. A sharp question amplified by smart tags drives discovery.
- **Arc + Conversation teamwork**: Both above 6? Add +0.4 each. A well-structured narrative landing on a provocative question generates comment depth.

### PASS 3 — META-CALIBRATION

Zoom out and adjust for format and context:

- **Content length factor**: Posts hitting the 1200-1900 char sweet spot get +0.3. Under 500 chars or over 2500? That's -0.5.
- **Format multiplier**: Text posts ×1.0, image posts ×1.05, articles ×0.95.
- **Confidence check**: Rate your own certainty from 0.0 to 1.0. If you had to guess on the visual or performance data, be conservative (0.4-0.6). If the content is clear and unambiguous, go higher (0.7-1.0).

### FINAL SCORE

Calculate: sum of each parameter's raw score times its approximate weight, divide by the sum of weights, add synergy bonuses from Pass 2, add calibration adjustment from Pass 3 (content length effect multiplied by format multiplier), multiply by 10, clamp between 0 and 100, round to the nearest integer.

### PERFORMANCE CALIBRATION (IF PERFORMANCE DATA PROVIDED)
If actual performance data is provided:
1. Calculate engagement rate: (Reactions + Comments + Reposts) / Impressions × 100
2. Map to benchmarks: <1% (Below Average), 1%-2% (Average), 2%-5% (Above Average), 5%+ (High Performing).
3. If audit score < 6.0 but performance is Above Average or High Performing: Flag FORMAT/CONTEXT OVERRIDE, adjust scores upward, and explain why.
4. If audit score > 7.0 but performance is Below Average: Flag DISTRIBUTION PROBLEM (low reach account, timing, shadowban) but do not lower content score.

### REWRITE
Deliver a rewrite in the 'rewritten' field — make it sound like a real person wrote it. Implement all fixes defined for parameters scoring < 10. Preserve the author's voice, rhythm, and natural quirks. No markdown asterisks.

### REPORT
Return ONLY valid JSON (no markdown wrapping) in this exact shape. Do NOT include weightedScore in the scores array.

{
  "overall": <0-100 integer>,
  "confidence": <0.0-1.0>,
  "detectedFormat": "<TEXT_ONLY | IMAGE_SINGLE | IMAGE_MULTI | CAROUSEL_DOC | VIDEO | POLL | TEXT_LINK_PREVIEW>",
  "verdict": "<one sentence verdict>",
  "scores": [
    { "key": "hook", "name": "Hook Strength", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "dwell", "name": "Dwell-Time Structure", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "voice", "name": "Authentic Voice", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "value", "name": "Value Density", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "arc", "name": "Narrative Arc", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "conversation", "name": "Conversation Trigger", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "hashtags", "name": "Hashtag Discipline", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "seo", "name": "LinkedIn SEO", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "penalty", "name": "Penalty Avoidance", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" },
    { "key": "share", "name": "Saveability / Shareability", "score": <raw 1-10>, "weight": <approximate weight>, "issue": "<what is wrong>", "fix": "<specific fix>" }
  ],
  "voiceFingerprint": [
    "Tone: <description>",
    "Rhythm: <description>",
    "Punctuation: <description>",
    "Vocabulary: <description>",
    "Structure: <description>"
  ],
  "rewritten": "<voice-preserved, algorithm-optimized rewrite, preserving line breaks with \\n>",
  "penaltiesApplied": [
    { "item": "<penalty item name>", "deduction": <points deducted> }
  ],
  "calibration": {
    "engagementRate": <calculated float value or null>,
    "performanceTier": "<below average | average | above average | high performing | unknown>",
    "overrideApplied": <true | false>,
    "overrideReasoning": "<description>"
  }
}`;
}
