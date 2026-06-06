import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import mockup from "@/assets/mockup-contentlab.jpg";

const callouts = [
  "Paste any post → 10-parameter audit in 6 seconds",
  "Auto-rewrite to 10/10 with one click",
  "Switch rubric for text / image / article",
  "Generate fresh content on any topic, audited before delivery",
];

export function ProductShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary mb-4">
              The product
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
              Audit, rewrite, ship — <span className="text-gradient-mint">in one screen</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              No dashboards to learn. No connections to wire. Open the Content Lab below and you're
              already auditing 2026-grade posts.
            </p>
            <ul className="space-y-3 mb-8">
              {callouts.map((c) => (
                <li key={c} className="flex gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{c}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-mint">
              <a href="#content-lab">Open the Content Lab <ArrowRight className="w-4 h-4" /></a>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-x-8 -bottom-6 h-24 bg-primary/30 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-elevated ring-glow">
              <img
                src={mockup}
                alt="LinkedIn content audit dashboard mockup with score gauges and rewrite preview"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
