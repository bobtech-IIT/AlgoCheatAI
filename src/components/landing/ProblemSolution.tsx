import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The shift</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Paid ads got expensive.
            <br />
            <span className="text-gradient-mint">Your audience didn't.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            LinkedIn's 2026 algorithm rewards depth, not budget. Solo operators are now out-distributing
            funded teams — if they post the right way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="p-8 bg-card/40 border-destructive/20 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-destructive/10 rounded-full blur-3xl" />
            <TrendingDown className="w-8 h-8 text-destructive mb-4" />
            <h3 className="font-display text-2xl font-semibold mb-4">The 2025 playbook is broken</h3>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "LinkedIn Ads CPL jumped to $312 average for B2B SaaS",
                "Cold outreach reply rates dropped to 1.7%",
                "Generic AI posts get deprioritized within 90 minutes",
                "Hiring a ghostwriter costs $4–8K/mo",
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="text-destructive mt-1">✕</span>{t}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 bg-mint-soft border-primary/30 relative overflow-hidden shadow-mint">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <TrendingUp className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold mb-4">The Zero-CAC engine</h3>
            <ul className="space-y-3 text-foreground/90">
              {[
                "Audit every post on 10 strict 2026 algorithm rules",
                "Generate 10/10 content in any niche, instantly",
                "Free unlimited AI (Puter.js — no credits, no keys)",
                "Solo-friendly: ship 4 posts/week in under 30 min",
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="text-primary mt-1">✓</span>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
