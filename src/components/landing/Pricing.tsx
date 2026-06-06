import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Sparkles } from "lucide-react";
import { WaitlistDialog } from "./WaitlistDialog";

const tiers = [
  {
    name: "Free Core (Phase 1)",
    monthly: 0,
    yearly: 0,
    blurb: "Unlimited audits and rewrites in the live Content Lab.",
    cta: "Open Content Lab",
    href: "#content-lab",
    features: [
      "Unlimited client-side drafts audit",
      "Calibrated 2026 algorithm engines",
      "Instant 10/10 AI rewrites",
      "Text, Image & Article rubrics",
      "100% private, client-side AI",
      "Zero registration required"
    ],
  },
  {
    name: "Pro Cockpit (Phase 2)",
    monthly: 9,
    yearly: 86,
    blurb: "Lock in lifetime early-bird pricing for advanced features.",
    cta: "Lock in Founder Price",
    highlight: true,
    features: [
      "Everything in Free Core",
      "Interactive Dashboard Cockpit",
      "Lead Gen Funnel Analytics",
      "AI Brand Voice Cloner (Coming)",
      "Competitor Reverse-Engineers (Coming)",
      "PDF Carousel Slide Builders (Coming)",
      "Peak-Hour Auto-Scheduler (Coming)"
    ],
  }
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Phase 1 is <span className="text-gradient-mint">100% Free</span>. Lifetime.
          </h2>
          <p className="text-muted-foreground text-lg">
            Lock in Pro early-adopter pricing today before subscriptions open.
          </p>

          <div className="inline-flex items-center gap-3 mt-8 p-1.5 rounded-full bg-card/60 border border-border/60">
            <span className={`px-3 text-sm ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={annual} onCheckedChange={setAnnual} />
            <span className={`px-3 text-sm flex items-center gap-2 ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[10px]">Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((t) => {
            const price = annual ? t.yearly : t.monthly;
            const per = annual ? "/yr" : "/mo";
            return (
              <Card
                key={t.name}
                className={`relative p-8 flex flex-col justify-between ${
                  t.highlight
                    ? "bg-gradient-to-br from-primary/15 via-card to-card border-primary/50 shadow-mint scale-[1.02]"
                    : "bg-card/60 border-border/60"
                }`}
              >
                {t.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground border-0">
                    Phase 2 Coming Soon
                  </Badge>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {t.highlight && <Sparkles className="w-5 h-5 text-primary" />}
                    <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{t.blurb}</p>
                  <div className="mb-6">
                    <span className="font-display text-5xl font-bold">${price}</span>
                    <span className="text-muted-foreground ml-1">{per}</span>
                  </div>
                  <ul className="space-y-3 text-sm mb-8">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className={`w-full ${
                    t.highlight
                      ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-mint"
                      : ""
                  }`}
                  variant={t.highlight ? "default" : "outline"}
                  onClick={() => (t.href ? (window.location.hash = t.href) : setOpenPlan("Pro"))}
                >
                  {t.cta}
                </Button>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Early-bird waitlist. We will notify you when Phase 2 analytics and scheduling components are deployed.
        </p>
      </div>

      <WaitlistDialog open={openPlan !== null} onOpenChange={(o) => !o && setOpenPlan(null)} plan={openPlan ?? "Pro"} />
    </section>
  );
}
