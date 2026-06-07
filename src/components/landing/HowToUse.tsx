import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ClipboardPaste, BarChart3, Copy } from "lucide-react";
import step1Img from "@/assets/howto-step1.png";
import step2Img from "@/assets/howto-step2.png";
import step3Img from "@/assets/howto-step3.png";

const STEP_IMAGES: Record<string, string> = {
  step1: step1Img,
  step2: step2Img,
  step3: step3Img,
};

const steps = [
  {
    number: "01",
    icon: ClipboardPaste,
    title: "Paste Your Draft",
    description:
      "Drop any LinkedIn draft — a text post you spent hours on, a caption for your carousel, or a long-form article. No formatting needed. Just paste and go.",
    detail: "Works with Text Posts · Image Captions · LinkedIn Articles",
    mockupSlot: "step1",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get Your 10-Point Score",
    description:
      "AlgoCheat runs your draft against 10 strict 2026 algorithm parameters — hook strength, dwell-time structure, voice authenticity, penalty avoidance, hashtag discipline, and more.",
    detail: "Hook · Dwell-Time · Voice · Value · Arc · CTA · Hashtags · SEO · Penalties · Shareability",
    mockupSlot: "step2",
  },
  {
    number: "03",
    icon: Copy,
    title: "Copy Your 10/10 Rewrite",
    description:
      "Get a voice-preserved rewrite that fixes every algorithm weakness — but sounds exactly like you wrote it on a good day. Then refine it in plain English: add emojis, change tone, or localize it.",
    detail: "Voice-preserved · Refinement loop · One-click copy",
    mockupSlot: "step3",
  },
];

export function HowToUse() {
  return (
    <section id="how-to-use" className="py-20 md:py-28 bg-card/20 border-y border-border/40">
      <div className="container">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3">Dead Simple. Dangerously Effective.</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            From invisible post to{" "}
            <span className="text-gradient-mint">viral-ready in 3 steps.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No tutorials. No courses. Paste → Score → Post. The entire workflow takes under 60 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-col">
                {/* Step card */}
                <Card className="p-6 border border-border/60 bg-card/60 hover:border-primary/40 transition-colors mb-4 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-display font-black text-primary/20 leading-none">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                  <p className="text-[11px] text-primary/60 font-medium border-t border-border/40 pt-3">{step.detail}</p>
                </Card>

                {/* Mockup screenshot */}
                <div className="rounded-xl overflow-hidden border border-border/60 shadow-elevated">
                  <img
                    src={STEP_IMAGES[step.mockupSlot]}
                    alt={`AlgoCheat AI - ${step.title} screenshot`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
