import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Sparkles, Copy, Check, FileText, Image as ImageIcon, BookOpen, Zap } from "lucide-react";
import { auditContent, generateContent, AuditResult, GenerateResult } from "@/lib/puterAI";
import { ContentType, RUBRICS } from "@/lib/auditRubrics";
import { toast } from "sonner";

function scoreColor(score: number) {
  if (score >= 9) return "bg-green-500";
  if (score >= 7) return "bg-primary";
  if (score >= 5) return "bg-yellow-500";
  return "bg-destructive";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function VoiceFingerprintCard({ fingerprint }: { fingerprint: string }) {
  const lines = fingerprint
    .split(/\n|\d\.\s/)
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

function AuditReport({ result }: { result: AuditResult }) {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Overall Score</div>
          <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {result.overall}<span className="text-2xl text-muted-foreground">/100</span>
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
          <CopyButton text={result.rewritten} />
        </div>
        <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap text-sm">
          {result.rewritten}
        </div>
      </div>
    </Card>
  );
}

function TopicGenerator({ type }: { type: ContentType }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);

  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const r = await generateContent({ type, topic });
      setResult(r);
    } catch (e: any) {
      toast.error(e?.message ?? "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 space-y-4">
      <div>
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" /> Want 10/10 content on a topic?
        </h3>
        <p className="text-sm text-muted-foreground">
          Drop a topic, niche, or angle and get an instantly audited 10/10 {RUBRICS[type].label}.
        </p>
      </div>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. how vertical SaaS founders should hire their first AE"
          onKeyDown={(e) => e.key === "Enter" && run()}
        />
        <Button onClick={run} disabled={loading || !topic.trim()}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate
        </Button>
      </div>
      {result && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-green-500 hover:bg-green-500">Predicted 100/100</Badge>
            <CopyButton text={result.content} />
          </div>
          <div className="bg-background p-4 rounded-md whitespace-pre-wrap text-sm border">
            {result.content}
          </div>
          <p className="text-xs text-muted-foreground italic">{result.notes}</p>
        </div>
      )}
    </Card>
  );
}

function AuditPanel({ type }: { type: ContentType }) {
  const [content, setContent] = useState("");
  const [imageDesc, setImageDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const run = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const r = await auditContent({ type, content, imageDescription: imageDesc });
      setResult(r);
    } catch (e: any) {
      toast.error(e?.message ?? "Audit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <Textarea
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
          <Button onClick={run} disabled={loading || !content.trim()} className="min-h-[44px]">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Run Audit
          </Button>
        </div>
      </Card>

      {result && <AuditReport result={result} />}
      {result && <TopicGenerator type={type} />}
    </div>
  );
}

export function ContentLab() {
  return (
    <section id="content-lab" className="mb-16 scroll-mt-20">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-3">AlgoCheat Proprietary Engine · 100% Private Data Audits</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">AlgoCheat AI Content Lab</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste any LinkedIn draft and get a strict 10-parameter audit based on the 2026 algorithm.
          Then generate 10/10 audited content on any topic — instantly and with full organic reach capability.
        </p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto mb-6 h-auto">
          <TabsTrigger value="text" className="gap-1.5 py-2.5"><FileText className="w-4 h-4" /><span className="hidden sm:inline">Text Post</span></TabsTrigger>
          <TabsTrigger value="image" className="gap-1.5 py-2.5"><ImageIcon className="w-4 h-4" /><span className="hidden sm:inline">Image Post</span></TabsTrigger>
          <TabsTrigger value="article" className="gap-1.5 py-2.5"><BookOpen className="w-4 h-4" /><span className="hidden sm:inline">Article</span></TabsTrigger>
        </TabsList>
        <TabsContent value="text"><AuditPanel type="text" /></TabsContent>
        <TabsContent value="image"><AuditPanel type="image" /></TabsContent>
        <TabsContent value="article"><AuditPanel type="article" /></TabsContent>
      </Tabs>
    </section>
  );
}
