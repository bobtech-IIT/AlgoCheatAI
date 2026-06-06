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

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            The 2026 LinkedIn <br />
            <span className="text-gradient-mint">Algorithm Cheat Code</span>.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop getting shadowbanned by generic AI slop. Audit any draft on 10 strict algorithm parameters, 
            bypass organic reach penalties, and write 10/10 content that turns views into high-paying clients.
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
              <a href="#features">See cheat sheet</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
              <span className="ml-1 font-medium text-foreground">4.95/5</span>
            </div>
            <span className="hidden sm:inline opacity-40">·</span>
            <span>24,800+ posts audited this week</span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span>100% Free Client-Side AI</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-16 md:mt-20 max-w-5xl mx-auto animate-scale-in">
          <div className="absolute inset-x-10 -bottom-10 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-elevated ring-glow">
            <img
              src={heroImage}
              alt="LinkedIn Zero CAC Engine analytics dashboard showing growth metrics and content scores"
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
