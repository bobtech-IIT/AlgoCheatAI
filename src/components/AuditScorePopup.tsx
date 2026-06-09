import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreItem {
  key: string;
  name: string;
  score: number;
  issue: string;
  fix: string;
}

interface AuditScorePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGetPlaybook: () => void;
  score: number;
  verdict: string;
  rewritten: string;
  scores: ScoreItem[];
  voiceFingerprint?: string[] | string;
}

const RADIUS = 78;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getScoreColor(s: number): string {
  if (s <= 20) return "#dc2626";
  if (s <= 40) return "#ea580c";
  if (s <= 60) return "#ca8a04";
  if (s <= 80) return "#16a34a";
  return "#2563eb";
}

function getScoreTier(s: number): string {
  if (s <= 20) return "Signal Lost";
  if (s <= 40) return "Fading";
  if (s <= 60) return "On Track";
  if (s <= 80) return "Strong";
  return "Viral Ready";
}

function getTierGlowClass(s: number): string {
  if (s <= 20) return "shadow-[0_0_30px_rgba(220,38,38,0.4)]";
  if (s <= 40) return "shadow-[0_0_30px_rgba(234,88,12,0.4)]";
  if (s <= 60) return "shadow-[0_0_30px_rgba(202,138,4,0.4)]";
  if (s <= 80) return "shadow-[0_0_30px_rgba(22,163,74,0.4)]";
  return "shadow-[0_0_30px_rgba(37,99,235,0.4)]";
}

export function AuditScorePopup({
  isOpen,
  onClose,
  onGetPlaybook,
  score,
  verdict,
  rewritten,
  scores,
  voiceFingerprint,
}: AuditScorePopupProps) {
  const [copied, setCopied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [ringAnimated, setRingAnimated] = useState(false);

  const clampedScore = Math.max(0, Math.min(100, score));
  const scoreColor = getScoreColor(clampedScore);
  const tierLabel = getScoreTier(clampedScore);
  const dashOffset = ringAnimated
    ? CIRCUMFERENCE * (1 - clampedScore / 100)
    : CIRCUMFERENCE;

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setRingAnimated(true));
      });
    } else {
      setRingAnimated(false);
      setCopied(false);
      setShowBreakdown(false);
    }
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(rewritten);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = rewritten;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [rewritten]);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        className={cn(
          "max-w-lg w-[95vw] border border-primary/20 bg-card/90 backdrop-blur-xl",
          "shadow-2xl p-0 rounded-2xl overflow-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]",
          "duration-300"
        )}
      >
        <div className="relative max-h-[85vh] overflow-y-auto">
          <div className="bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent p-6 pb-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Post Audit Score
            </p>

            <div className={cn("relative inline-flex items-center justify-center mb-4 transition-all duration-700", getTierGlowClass(clampedScore))}>
              <svg
                viewBox="0 0 200 200"
                className="w-44 h-44 sm:w-52 sm:h-52 -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="100" cy="100" r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/[0.07]"
                />
                <circle
                  cx="100" cy="100" r={RADIUS}
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  className="drop-shadow-[0_0_8px_var(--ring-glow-color)] transition-[stroke-dashoffset] duration-1000 ease-out"
                  style={{ "--ring-glow-color": scoreColor } as React.CSSProperties}
                />
              </svg>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ rotate: "0deg" }}
              >
                <span
                  className="text-5xl sm:text-6xl font-display font-bold tracking-tight transition-colors duration-500"
                  style={{ color: scoreColor }}
                >
                  {clampedScore}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest mt-0.5"
                  style={{ color: scoreColor }}
                >
                  / 100
                </span>
              </div>
            </div>

            <Badge
              variant="outline"
              className="text-xs font-semibold px-4 py-1 border-current/30"
              style={{
                color: scoreColor,
                borderColor: `${scoreColor}40`,
                backgroundColor: `${scoreColor}15`,
              }}
            >
              {tierLabel}
            </Badge>

            <p className="mt-4 text-sm leading-relaxed text-foreground/80 font-medium max-w-xs mx-auto">
              {verdict}
            </p>
          </div>

          <div className="px-6 pb-6 space-y-4">
            <div className="relative">
              <div
                className={cn(
                  "rounded-xl border bg-black/20 p-4 pr-12 text-sm leading-relaxed",
                  "text-foreground/85 whitespace-pre-wrap break-words",
                  "max-h-48 overflow-y-auto",
                  "border-primary/10"
                )}
              >
                {rewritten}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "absolute top-3 right-3 p-1.5 rounded-lg transition-all",
                  "border border-white/10 bg-black/40 hover:bg-black/60",
                  "text-muted-foreground hover:text-foreground"
                )}
                aria-label={copied ? "Copied" : "Copy rewritten post"}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <Collapsible
              open={showBreakdown}
              onOpenChange={setShowBreakdown}
              className="border border-primary/10 rounded-xl overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-xs font-semibold",
                    "text-muted-foreground hover:text-foreground transition-colors",
                    "bg-white/[0.02] hover:bg-white/[0.04]"
                  )}
                >
                  <span>Show algorithm breakdown</span>
                  {showBreakdown ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-3 pt-1 space-y-2.5">
                {scores.map((item) => (
                  <div key={item.key} className="space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground/70 font-medium truncate mr-2">
                        {item.name}
                      </span>
                      <span
                        className="font-semibold tabular-nums shrink-0"
                        style={{ color: getScoreColor(item.score) }}
                      >
                        {item.score}
                      </span>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${ringAnimated ? Math.max(0, Math.min(100, item.score)) : 0}%`,
                          backgroundColor: getScoreColor(item.score),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {voiceFingerprint && voiceFingerprint.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(voiceFingerprint) ? voiceFingerprint : [voiceFingerprint]).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-primary/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
              Why trust this score? AI trained on 15,000+ viral LinkedIn posts. Calibrated on 2026 algorithm signals: Dwell Time, Depth Score, Save Rate.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full text-xs min-h-[44px] border-white/10 hover:bg-white/5"
              >
                Audit another post
              </Button>
              <Button
                onClick={onGetPlaybook}
                className="w-full text-xs min-h-[44px] font-semibold bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90 shadow-lg shadow-primary/20"
              >
                Get my personalized growth playbook
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
