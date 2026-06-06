import { Card } from "@/components/ui/card";
import { Activity, Sparkles, Infinity as InfinityIcon, Anchor, Clock, MessageSquare } from "lucide-react";
import algo from "@/assets/feature-algorithm.jpg";
import hooks from "@/assets/feature-hooks.jpg";
import roi from "@/assets/feature-roi.jpg";

const features = [
  {
    icon: Activity,
    title: "2026 Algorithm Audit",
    body: "10 strict parameters: hook strength, dwell-time architecture, value density, comment-bait risk, format match, and 5 more.",
    image: algo,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Sparkles,
    title: "10/10 Generator",
    body: "Give it a topic. Get a pre-audited post that scores 100/100 before it even ships.",
  },
  {
    icon: InfinityIcon,
    title: "Zero AI cost",
    body: "Powered by Puter.js — visitors use their own free quota. You pay $0 to run this.",
  },
  {
    icon: Anchor,
    title: "Hook engineering",
    body: "Line-by-line scoring of your first 3 lines — the only thing the 2026 algo really reads.",
    image: hooks,
  },
  {
    icon: Clock,
    title: "Dwell-time coach",
    body: "Pacing, paragraph length, and curiosity gaps engineered to hold attention past 4 seconds.",
  },
  {
    icon: MessageSquare,
    title: "Format-aware rubrics",
    body: "Different scoring for text posts, image carousels, and long-form articles. No one-size-fits-all.",
    image: roi,
  },
];

export function FeatureBento() {
  return (
    <section id="features" className="py-20 md:py-28 bg-card/20 border-y border-border/40">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything a content team gives you. <br />
            <span className="text-gradient-mint">Built for one operator.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-4 max-w-6xl mx-auto">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                className={`relative overflow-hidden p-6 bg-gradient-to-br from-card to-card/40 border-border/60 hover:border-primary/40 transition-all group ${
                  f.span ?? "md:col-span-2"
                }`}
              >
                {f.image && (
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-cover bg-center"
                    style={{ backgroundImage: `url(${f.image})` }}
                  />
                )}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 grid place-items-center text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
