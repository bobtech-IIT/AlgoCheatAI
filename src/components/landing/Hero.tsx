import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-32 w-[400px] h-[400px] rounded-full bg-primary-glow/10 blur-3xl animate-float" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/5 text-primary backdrop-blur">
            <Sparkles className="w-3 h-3 mr-1.5" />
            Built for the LinkedIn 2026 Algorithm
          </Badge>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4">
            Your Post Got{" "}
            <span className="text-gradient-mint">4 Likes.</span>
            <br />
            Again.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            You spent hours crafting that post. LinkedIn buried it.{" "}
            <span className="text-foreground font-medium">Not because you're not good enough —</span>{" "}
            because the 2026 algorithm silently penalizes generic AI tone, bad hook structure, and invisible reach triggers.
          </p>

          <p className="text-sm sm:text-base text-primary font-semibold mb-10">
            AlgoCheat AI shows you <em>exactly</em> why — and rewrites it so you get seen. Free. In 30 seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Button
              size="lg"
              asChild
              className="h-12 px-6 text-base bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint animate-glow-pulse"
            >
              <a href="#content-lab">
                Audit Your Post Free <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6 text-base border-border/60 bg-card/40 backdrop-blur">
              <a href="#how-to-use">See how it works</a>
            </Button>
          </div>


        </div>

        {/* Hero image */}
        <div className="relative mt-16 md:mt-20 max-w-5xl mx-auto animate-scale-in">
          <div className="absolute inset-x-10 -bottom-10 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-elevated ring-glow">
            <img
              src={heroImage}
              alt="AlgoCheat AI dashboard showing LinkedIn post audit scores and rewrite engine"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
