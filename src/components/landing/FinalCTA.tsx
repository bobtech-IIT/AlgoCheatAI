import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card shadow-elevated">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Stop paying for leads <br className="hidden md:block" />
              LinkedIn gives you <span className="text-gradient-mint">for free</span>.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Open the Content Lab. Paste a post. Watch the 2026 algorithm finally make sense.
            </p>
            <Button
              size="lg"
              asChild
              className="h-12 px-8 text-base bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint animate-glow-pulse"
            >
              <a href="#content-lab">
                Try it free — no signup <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
