import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Sparkles, Copy, Check, FileText, Image as ImageIcon, BookOpen, Zap, MessageSquarePlus, ShieldCheck, X } from "lucide-react";
import { auditContent, generateContent, scanTopicTier, generateForAlgoCheat, getContextQuestions, generateWithUserContext, validateUserAnswers, triggerPuterSignIn, AuditResult, GenerateResult } from "@/lib/puterAI";
import { ContentType, RUBRICS } from "@/lib/auditRubrics";
import { useToast } from "@/hooks/use-toast";
import { useRAG } from "@/hooks/useRAG";


function sanitize(text: string): string {
  let cleaned = text
    .trim()
    .replace(/^"""/g, "")
    .replace(/"""$/g, "")
    .replace(/^```[a-z]*\n/i, "")
    .replace(/```$/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\*\*/g, "")
    .trim();

  // Strip common trailing AI scorecard/meta-analysis leak paragraphs
  const scorecardPatterns = [
    /\n*(?:The|This|Why this) post (?:hits|scores|is written|satisfies|incorporates|delivers|hooks|achieves)\b.*/is,
    /\n*(?:This) draft (?:satisfies|incorporates|delivers|hooks|achieves)\b.*/is,
    /\n*Why this scores \d+\/\d+\b.*/is,
    /\n*Hook (?:delivers|hits|is|has|strength)\b.*/is,
  ];

  for (const pattern of scorecardPatterns) {
    cleaned = cleaned.replace(pattern, "").trim();
  }

  // Find the last hashtag in the text. Anything after it that is not whitespace or a hashtag is a leak.
  const hashtagRegex = /#[a-z0-9_]+/ig;
  let match;
  let lastHashtagIndex = -1;
  let lastHashtagLength = 0;
  while ((match = hashtagRegex.exec(cleaned)) !== null) {
    lastHashtagIndex = match.index;
    lastHashtagLength = match[0].length;
  }
  
  if (lastHashtagIndex !== -1) {
    const postHashtagText = cleaned.slice(lastHashtagIndex + lastHashtagLength).trim();
    if (postHashtagText.length > 0 && !/#/g.test(postHashtagText)) {
      cleaned = cleaned.slice(0, lastHashtagIndex + lastHashtagLength).trim();
    }
  }

  return cleaned;
}

function scoreColor(score: number) {
  if (score >= 9) return "bg-green-500";
  if (score >= 7) return "bg-primary";
  if (score >= 5) return "bg-yellow-500";
  return "bg-destructive";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast({
          description: "Copied to clipboard",
        });
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function VoiceFingerprintCard({ fingerprint }: { fingerprint: string[] | string }) {
  const lines = Array.isArray(fingerprint)
    ? fingerprint
    : fingerprint
        .split(/\n|\d\.\s|·\s*|- \s*/)
        .map(s => s.trim())
        .filter(Boolean);
  return (
    <Card className="p-5 border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-sm">🎙️</div>
        <div>
          <h4 className="font-semibold text-sm">Your Writing Fingerprint</h4>
          <p className="text-xs text-muted-foreground">Detected voice — preserved in your rewrite</p>
        </div>
      </div>
      <ul className="space-y-1.5">
        {lines.map((line, i) => (
          <li key={i} className="text-xs text-muted-foreground flex gap-2">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">·</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RefinementBox({ baseText }: { baseText: string }) {
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [refined, setRefined] = useState("");
  const { toast } = useToast();

  const refine = async () => {
    if (!instruction.trim()) return;
    setLoading(true);
    try {
      const prompt = `You are an expert LinkedIn editor.
Here is the original LinkedIn post:
[START OF ORIGINAL POST]
${baseText}
[END OF ORIGINAL POST]

The user wants to refine/modify this post with the following instruction:
"${instruction}"

CRITICAL INSTRUCTIONS:
1. You MUST rewrite the post to fully incorporate the user's requested instruction. Do not return the original text unchanged.
2. Incorporate the instruction naturally, preserving the author's overall voice but making the requested changes (e.g. adding a hook, adding a negative hook, shortening, adding emojis, adding Hindi phrases, etc.).
3. You MUST NEVER stack a new opening line, introduction, or hook on top of an existing one (avoid double-hooking). If the refinement introduces a new starting sentence, question, or hook (either due to user request or tone adjustment), you MUST completely replace the original opening lines of the post rather than stacking them.
4. You MUST preserve all hashtags (or ensure exactly 3-5 niche hashtags are present at the very bottom) from the original post, unless the user explicitly asks to remove them. Do NOT drop or delete hashtags.
5. You MUST NOT include phantom links, placeholder links, or commands to "click the link", "tap the link", or "check the link" unless a link is explicitly present in the original post or requested by the user.
6. Do NOT wrap your output in triple quotes ("""), double quotes, single quotes, or backticks.
7. Do NOT output any markdown fences (like \`\`\`), labels, notes, or commentary.
8. Return ONLY the plain text of the final revised post, starting directly with the first line of the post.`;

      const resp = await (window as any).puter.ai.chat(prompt, { model: "gpt-4o-mini" });
      const text = typeof resp === "string" ? resp : resp?.message?.content ?? resp?.text ?? JSON.stringify(resp);
      setRefined(sanitize(text));
    } catch (e: any) {
      if (e?.message?.includes("insufficient_funds") || e?.status === 402 || e?.message?.includes("402")) {
        if ((window as any).showPuterAuthDialog) {
          (window as any).showPuterAuthDialog("exhausted", refine);
        }
      } else {
        toast({
          variant: "destructive",
          description: e?.message ?? "Refinement failed",
        });
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-4 border border-primary/20 rounded-xl p-4 bg-gradient-to-br from-primary/5 to-secondary/5 space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquarePlus className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">Want any change?</span>
        <span className="text-xs text-muted-foreground">Type in plain English — add emojis, change tone, shorten, add Hindi, anything.</span>
      </div>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <Input
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
          placeholder='e.g. "add 2 emojis", "make it 30% shorter", "add a Hindi line at the end"'
          onKeyDown={e => e.key === "Enter" && refine()}
          className="text-sm"
        />
        <Button onClick={refine} disabled={loading || !instruction.trim()} className="min-h-[44px] shrink-0">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Refine
        </Button>
      </div>
      {refined && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">✨ Your refined version</span>
            <CopyButton text={refined} />
          </div>
          <div className="bg-background/80 border border-border p-4 rounded-lg text-sm whitespace-pre-wrap font-mono leading-relaxed">
            {refined}
          </div>
        </div>
      )}
    </div>
  );
}

function AuditReport({ result }: { result: AuditResult }) {
  let displayOverall = result.overall;
  if (displayOverall <= 10) displayOverall = displayOverall * 10;
  const cleanRewritten = sanitize(result.rewritten);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Overall Score</div>
          <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {displayOverall}<span className="text-2xl text-muted-foreground">/100</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-2 max-w-md">{result.verdict}</Badge>
      </div>

      <div className="space-y-3">
        {result.scores.map((s) => (
          <div key={s.key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{s.name}</span>
              <span className="font-mono">{s.score}/10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${scoreColor(s.score)} transition-all`}
                style={{ width: `${s.score * 10}%` }}
              />
            </div>
            {s.score < 10 && (
              <div className="text-xs text-muted-foreground pl-1 pt-1">
                <span className="text-destructive font-medium">Issue:</span> {s.issue}{" "}
                <span className="text-primary font-medium">Fix:</span> {s.fix}
              </div>
            )}
          </div>
        ))}
      </div>

      {result.voiceFingerprint && (
        <VoiceFingerprintCard fingerprint={result.voiceFingerprint} />
      )}

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Rewritten 10/10 version
          </h4>
          <CopyButton text={cleanRewritten} />
        </div>
        <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap text-sm font-mono leading-relaxed">
          {cleanRewritten}
        </div>
        <RefinementBox baseText={cleanRewritten} />
      </div>
    </Card>
  );
}

type GenState = "idle" | "loading" | "questions" | "answering" | "blocked" | "result" | "clarification";

interface TopicGeneratorProps {
  type: ContentType;
  onUseGeneratedContent?: (text: string) => void;
}

function TopicGenerator({ type, onUseGeneratedContent }: TopicGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [augmentedTopic, setAugmentedTopic] = useState("");
  const [state, setState] = useState<GenState>("idle");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [detectedName, setDetectedName] = useState("");
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [correctedTopic, setCorrectedTopic] = useState<string | null>(null);
  const { toast } = useToast();
  const { searchContext, isReady } = useRAG();

  const reset = () => {
    setState("idle");
    setQuestions([]);
    setAnswers(["", "", "", ""]);
    setDetectedName("");
    setResult(null);
    setStatusMsg("");
    setBlockReason("");
    setAugmentedTopic("");
    setSuggestion(null);
    setCorrectedTopic(null);
  };

  const getAugTopic = async (t: string) => {
    let aug = t;
    if (isReady) {
      try {
        const matches = await searchContext(t, 2, 0.15);
        if (matches.length > 0) {
          const contextText = matches
            .map(m => `[Reference from ${m.docName}]: ${m.text}`)
            .join("\n\n");
          aug = `${t}\n\nKNOWLEDGE BASE CONTEXT (incorporate relevant details/facts below into the post):\n${contextText}`;
        }
      } catch (err) {
        console.warn("RAG retrieval failed, proceeding with original topic:", err);
      }
    }
    return aug;
  };

  const executeGeneration = async (tier: string, augTopic: string, name?: string) => {
    if (tier === "general") {
      setStatusMsg("Writing your post...");
      const r = await generateContent({ type, topic: augTopic });
      setResult(r);
      setState("result");
    } else if (tier === "algocheat") {
      setStatusMsg("Writing with product facts...");
      const r = await generateForAlgoCheat({ type, topic: augTopic });
      setResult(r);
      setState("result");
    } else {
      const detName = name || "your product";
      setDetectedName(detName);
      setStatusMsg("Fetching questions...");
      const qResult = await getContextQuestions({ type, topic: augTopic, detectedName: detName });
      setQuestions(qResult.questions);
      setAnswers(new Array(qResult.questions.length).fill(""));
      setState("questions");
    }
  };

  const handleError = (e: any, retryFn: () => void) => {
    if (e?.message?.includes("insufficient_funds") || e?.status === 402 || e?.message?.includes("402")) {
      if ((window as any).showPuterAuthDialog) {
        (window as any).showPuterAuthDialog("exhausted", retryFn);
      }
      setState("idle");
    } else {
      toast({
        variant: "destructive",
        description: e?.message ?? "Operation failed",
      });
      setState("idle");
    }
  };

  const acceptSuggestion = () => {
    if (correctedTopic) {
      setTopic(correctedTopic);
      run(correctedTopic);
    }
  };

  const declineSuggestion = async () => {
    setState("loading");
    setStatusMsg("Analysing your topic...");
    try {
      const tierResult = await scanTopicTier(topic);
      const aug = await getAugTopic(topic);
      setAugmentedTopic(aug);
      await executeGeneration(tierResult.tier, aug, tierResult.detectedName);
    } catch (e: any) {
      handleError(e, declineSuggestion);
    }
  };

  // Phase A: classify topic tier and check suggestions
  const run = async (forceTopic?: string) => {
    const targetTopic = forceTopic || topic;
    if (!targetTopic.trim()) return;
    setState("loading");
    setStatusMsg("Analysing your topic...");
    try {
      const tierResult = await scanTopicTier(targetTopic);
      const tier = tierResult.tier;

      if (tier === "invalid") {
        setBlockReason("This topic request appears to be invalid or low-effort gibberish. Please enter a valid topic or brand name.");
        setState("blocked");
        return;
      }

      // Check for suggestions/corrections
      if (tierResult.suggestedCorrection && !forceTopic) {
        setSuggestion(tierResult.suggestedCorrection);
        setCorrectedTopic(tierResult.correctedTopic || null);
        setState("clarification");
        return;
      }

      const aug = await getAugTopic(targetTopic);
      setAugmentedTopic(aug);
      await executeGeneration(tier, aug, tierResult.detectedName);
    } catch (e: any) {
      handleError(e, () => run(forceTopic));
    }
  };

  // Phase B: generate using user answers
  const runWithAnswers = async () => {
    const hasAnyAnswer = answers.some(a => a.trim().length > 0);
    if (!hasAnyAnswer) {
      setBlockReason("Please answer at least one question so I can write an authentic post.");
      setState("blocked");
      return;
    }
    setState("loading");
    setStatusMsg("Validating your responses...");
    try {
      // 1. Coherence & intent check
      const validation = await validateUserAnswers({
        topic,
        detectedName,
        questions,
        answers,
      });

      if (!validation.valid) {
        setBlockReason(validation.reason || "The details provided are not coherent enough to write a post. Please try adding more detail.");
        setState("blocked");
        return;
      }

      // 2. If valid, run generation
      setStatusMsg("Writing your post with your story...");
      const r = await generateWithUserContext({
        type,
        topic: augmentedTopic || topic,
        detectedName,
        questions,
        answers,
      });
      setResult(r);
      setState("result");
    } catch (e: any) {
      handleError(e, runWithAnswers);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 space-y-4">
      <div>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" /> Do you have a topic in mind? Or what do you want to write today?
        </h3>
        <p className="text-sm text-muted-foreground">
          Drop a topic, niche, or angle and get an instant {RUBRICS[type].label.toLowerCase()} that you can push to the audit tool.
        </p>
      </div>

      {/* STATE: idle or loading */}
      {(state === "idle" || state === "loading") && (
        <>
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. why founders need LinkedIn in 2026, or: launch post for [your product]"
              onKeyDown={(e) => e.key === "Enter" && state === "idle" && run()}
              disabled={state === "loading"}
            />
            <Button onClick={() => run()} disabled={state === "loading" || !topic.trim()}>
              {state === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate
            </Button>
          </div>
          {state === "loading" && (
            <p className="text-xs text-primary animate-pulse">{statusMsg}</p>
          )}
        </>
      )}

      {/* STATE: clarification */}
      {state === "clarification" && suggestion && (
        <div className="space-y-4 p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🔍</span>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm">Did you mean to ask about:</h4>
              <p className="text-base font-bold text-primary italic">"{suggestion}"</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                I detected a potential typographical error or ambiguous term in your request. Would you like to use the clarified topic?
              </p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={acceptSuggestion}
              className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint text-xs animate-pulse"
            >
              Yes, Use Corrected Topic
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={declineSuggestion}
              className="text-xs border-border/80 hover:bg-muted"
            >
              No, Keep Original
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="text-xs text-muted-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* STATE: questions — unknown product detected */}
      {(state === "questions" || state === "blocked") && (
        <div className="space-y-5">
          {questions.length > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <span className="text-xl mt-0.5">🎙️</span>
              <div>
                <p className="font-semibold text-sm">
                  Tell me about <span className="text-primary">{detectedName}</span> — I'd rather ask than guess.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  I don't have data on this product. Answer below and I'll write something that's actually true and powerful.
                </p>
              </div>
            </div>
          )}

          {state === "blocked" && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              <p className="font-semibold mb-1">⛔ Validation Check Failed</p>
              <p className="mb-2">{blockReason}</p>
              {questions.length > 0 && (
                <p className="text-xs opacity-80">
                  Since <strong>{detectedName}</strong> is a custom product or startup idea, I need real details to write an authentic, high-value LinkedIn post. I refuse to hallucinate or invent features. Please write at least 1-2 descriptive sentences above.
                </p>
              )}
            </div>
          )}

          {questions.length > 0 && (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground/80">{q}</label>
                  <textarea
                    className="w-full min-h-[72px] text-sm p-3 rounded-lg border border-border bg-background/80 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your answer..."
                    value={answers[i] ?? ""}
                    onChange={e => {
                      const updated = [...answers];
                      updated[i] = e.target.value;
                      setAnswers(updated);
                      if (state === "blocked") setState("questions");
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            {questions.length > 0 && (
              <Button
                onClick={runWithAnswers}
                className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint"
              >
                <Sparkles className="w-4 h-4" />
                Generate My Post
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={reset}>
              ← Start over
            </Button>
          </div>
        </div>
      )}

      {/* STATE: loading after answers submitted */}
      {state === "loading" && statusMsg && (
        <p className="text-xs text-primary animate-pulse">{statusMsg}</p>
      )}

      {/* STATE: result */}
      {state === "result" && result && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-green-500 hover:bg-green-500">Predicted 100/100</Badge>
            <CopyButton text={sanitize(result.content)} />
          </div>
          <div className="bg-background p-4 rounded-md whitespace-pre-wrap text-sm font-mono leading-relaxed border">
            {sanitize(result.content)}
          </div>
          <div className="flex gap-3 items-center flex-wrap pt-2 border-t">
            <Button variant="outline" size="sm" onClick={reset}>← Write another</Button>
            {onUseGeneratedContent && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUseGeneratedContent(sanitize(result.content))}
                className="bg-primary/20 text-foreground hover:bg-primary/30"
              >
                ⚡ Load into Audit Tool
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

const TOOL_CARDS = [
  {
    icon: FileText,
    title: "Text Post Audit",
    emoji: "📝",
    what: "Pure text drafts — hooks, structure, voice & engagement",
    when: "When your post has no image or video",
    scores: "Hook · Dwell-Time · Voice · Value · Arc · CTA · Hashtags · SEO · Penalties · Shareability",
    type: "text" as ContentType,
  },
  {
    icon: ImageIcon,
    title: "Image Post Audit",
    emoji: "🖼️",
    what: "Caption + visual synergy for carousels & single images",
    when: "When your post has a graphic, photo or carousel",
    scores: "Hook · Caption–Image Synergy · Voice · Value · Arc · CTA · Hashtags · SEO · Penalties · Visual Hook",
    type: "image" as ContentType,
  },
  {
    icon: BookOpen,
    title: "Article Audit",
    emoji: "📖",
    what: "Long-form LinkedIn articles optimized for SEO & authority",
    when: "When publishing a LinkedIn Newsletter or Article",
    scores: "SEO Title · Subheads · Voice · Value · Arc · TL;DR · Meta · Internal Links · Citations · Saveability",
    type: "article" as ContentType,
  },
];

function AuditPanel({ type }: { type: ContentType }) {
  const [content, setContent] = useState("");
  const [imageDesc, setImageDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const { toast } = useToast();

  const run = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const r = await auditContent({ type, content, imageDescription: imageDesc });
      setResult(r);
    } catch (e: any) {
      if (e?.message?.includes("insufficient_funds") || e?.status === 402 || e?.message?.includes("402")) {
        if ((window as any).showPuterAuthDialog) {
          (window as any).showPuterAuthDialog("exhausted", run);
        }
      } else {
        toast({
          variant: "destructive",
          description: e?.message ?? "Audit failed",
        });
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <Textarea
          id={`content-lab-textarea-${type}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Paste your ${RUBRICS[type].label.toLowerCase()} here...`}
          className="min-h-[140px] md:min-h-[200px] font-mono text-sm"
        />
        {type === "image" && (
          <Input
            value={imageDesc}
            onChange={(e) => setImageDesc(e.target.value)}
            placeholder="Describe your image / carousel (overlay text, style, subject)"
          />
        )}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-muted-foreground">
            Scored on 10 strict 2026 LinkedIn algorithm parameters · Calibrated on Organic Dwell Time
          </p>
          <div className="flex items-center gap-2">
            {content && (
              <Button
                variant="outline"
                onClick={() => setContent("")}
                disabled={loading}
                className="min-h-[44px]"
              >
                Clear
              </Button>
            )}
            <Button onClick={run} disabled={loading || !content.trim()} className="min-h-[44px]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Run Audit
            </Button>
          </div>
        </div>
      </Card>

      {result && <AuditReport result={result} />}
      <TopicGenerator
        type={type}
        onUseGeneratedContent={(text) => {
          setContent(text);
          toast({
            description: "Loaded post into the Audit Box above!",
          });
          document.getElementById(`content-lab-textarea-${type}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />
    </div>
  );
}

function KnowledgeBasePanel() {
  const { indexDocument, indexedDocs, docCount, indexing, deleteDocument, clearDatabase } = useRAG();
  const [docName, setDocName] = useState("");
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    if (!docName.trim() || !text.trim()) {
      toast({
        variant: "destructive",
        description: "Please provide both a document name and content text.",
      });
      return;
    }
    try {
      const docId = `doc-${Date.now()}`;
      await indexDocument(docId, docName.trim(), text.trim());
      toast({
        description: `Successfully saved "${docName}" to your knowledge base!`,
      });
      setDocName("");
      setText("");
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message || "Failed to save document.",
      });
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary animate-pulse" /> Train Me
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload your product specifications, past high-performing posts, or brand guidelines. The AI will automatically reference this intelligence to calibrate and align your content with your brand voice and factual assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Left Side: Upload / Paste */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Add Stored Assets</h4>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Asset Name / Source</label>
            <Input
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. My Startup spec sheet, or Brand Guidelines"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Asset Content</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the raw text of your specifications, guidelines or posts here..."
              className="min-h-[180px] font-mono text-sm"
            />
          </div>
          <Button onClick={handleSave} disabled={indexing || !docName.trim() || !text.trim()} className="w-full">
            {indexing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Uploading & Calibrating AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Upload to Knowledge Base
              </>
            )}
          </Button>
        </div>

        {/* Right Side: Stats and List */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">Stored Assets ({docCount})</h4>
            {indexedDocs.length > 0 && (
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 text-xs h-7 px-2" onClick={clearDatabase}>
                Wipe Stored Assets
              </Button>
            )}
          </div>

          {indexedDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-background/50 text-center">
              <span className="text-2xl mb-2">📁</span>
              <p className="text-xs font-medium text-muted-foreground">No custom knowledge assets uploaded yet</p>
              <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mt-1">
                Upload specs or style guides on the left to train your AI with custom brand data!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {indexedDocs.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center p-3 rounded-lg border bg-background/60 text-xs">
                  <div className="truncate max-w-[80%] pr-2">
                    <p className="font-medium truncate">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">Stored Reference: {doc.id}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteDocument(doc.id)}>
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function ContentLab() {
  const [dialogMode, setDialogMode] = useState<"welcome" | "exhausted" | null>(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState<{ run: () => void } | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (window as any).showPuterAuthDialog = (mode: "welcome" | "exhausted", callback: () => void) => {
      setDialogMode(mode);
      setOnSuccessCallback({ run: callback });
    };
    return () => {
      delete (window as any).showPuterAuthDialog;
    };
  }, []);

  const handlePuterLogin = async () => {
    setAuthLoading(true);
    try {
      await triggerPuterSignIn();
      toast({
        description: dialogMode === "welcome"
          ? "Free guest credits activated successfully!"
          : "Signed in successfully! Your Puter credits are refreshed.",
      });
      setDialogMode(null);
      if (onSuccessCallback) {
        onSuccessCallback.run();
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message || "Failed to authenticate. Please try again.",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <section id="content-lab" className="mb-16 scroll-mt-20 relative">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-3">AlgoCheat Proprietary Engine · 100% Private Data Audits</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">AlgoCheat AI Content Lab</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Three specialized audit tools — each calibrated to the exact 2026 LinkedIn algorithm rules for that content type.
          Pick yours, paste your draft, get a 10-parameter score + a voice-preserved rewrite.
        </p>
      </div>

      {/* 3-Tool Explainer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TOOL_CARDS.map((tool) => (
          <Card key={tool.type} className="p-5 border border-border/60 hover:border-primary/40 transition-colors bg-card/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-lg">{tool.emoji}</div>
              <h3 className="font-semibold text-sm">{tool.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{tool.what}</p>
            <p className="text-xs text-primary/70 mb-3"><span className="font-medium">Use when:</span> {tool.when}</p>
            <p className="text-[10px] text-muted-foreground/60 leading-relaxed border-t border-border/40 pt-2">{tool.scores}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-6 h-auto">
          <TabsTrigger value="text" className="gap-1.5 py-2.5"><FileText className="w-4 h-4" /><span className="hidden sm:inline">Text Post</span></TabsTrigger>
          <TabsTrigger value="image" className="gap-1.5 py-2.5"><ImageIcon className="w-4 h-4" /><span className="hidden sm:inline">Image Post</span></TabsTrigger>
          <TabsTrigger value="article" className="gap-1.5 py-2.5"><BookOpen className="w-4 h-4" /><span className="hidden sm:inline">Article</span></TabsTrigger>
          <TabsTrigger value="kb" className="gap-1.5 py-2.5"><Zap className="w-4 h-4 text-primary" /><span className="hidden sm:inline">Upload</span></TabsTrigger>
        </TabsList>
        <TabsContent value="text"><AuditPanel type="text" /></TabsContent>
        <TabsContent value="image"><AuditPanel type="image" /></TabsContent>
        <TabsContent value="article"><AuditPanel type="article" /></TabsContent>
        <TabsContent value="kb"><KnowledgeBasePanel /></TabsContent>
      </Tabs>

      {/* Puter Auth Modal Overlay (100% Popup-Proof) */}
      {dialogMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <Card className="relative w-full max-w-md border border-primary/20 bg-card/95 shadow-2xl p-6 space-y-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-8 w-8 hover:bg-muted"
              onClick={() => setDialogMode(null)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-xl">
                {dialogMode === "welcome" ? "⚡" : "🔑"}
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                {dialogMode === "welcome" ? "Activate Free AI Credits" : "Credits limit reached"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dialogMode === "welcome"
                  ? "AlgoCheat AI is powered by Puter's privacy-first keyless AI engine. To run organic audits and generate posts, initialize your free guest credits session below."
                  : "Your temporary guest credits are exhausted. Puter provides unlimited free credits if you log in or register a free Puter account. Click below to refresh them instantly."}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                onClick={handlePuterLogin}
                disabled={authLoading}
                className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-95 shadow-lg shadow-primary/20"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Connecting to Puter...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    {dialogMode === "welcome" ? "Activate Free Guest AI" : "Sign In / Sign Up (Free)"}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setDialogMode(null)}
                disabled={authLoading}
              >
                Cancel
              </Button>
            </div>

            <p className="text-[10px] text-center text-muted-foreground/60 leading-normal">
              By continuing, you activate Puter's client-side privacy sandbox. No email, credit card, or setup required.
            </p>
          </Card>
        </div>
      )}
    </section>
  );
}

