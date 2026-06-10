import { Card } from "@/components/ui/card";
import { Activity, Sparkles, Infinity as InfinityIcon, Anchor } from "lucide-react";

const features = [
  { icon: Activity, title: "2026 Algorithm Audit" },
  { icon: Sparkles, title: "10/10 Generator" },
  { icon: InfinityIcon, title: "Zero AI cost" },
  { icon: Anchor, title: "Hook engineering" },
];

export function FeatureBento() {
  return (
    <section id="features" className="py-12 bg-card/20 border-y border-border/40">
      <div className="container space-y-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Capabilities</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Everything a content team gives you. <span className="text-gradient-mint">Built for one operator.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto px-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                className="p-4 bg-gradient-to-br from-card to-card/40 border-border/60 hover:border-primary/40 hover:shadow-mint transition-all text-center flex flex-col items-center gap-2"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/15 grid place-items-center text-primary shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display text-sm font-semibold leading-tight">{f.title}</h3>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
