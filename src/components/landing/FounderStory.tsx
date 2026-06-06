import founder from "@/assets/founder-portrait.jpg";

export function FounderStory() {
  return (
    <section className="py-20 md:py-28 bg-card/20 border-y border-border/40">
      <div className="container">
        <div className="grid md:grid-cols-5 gap-10 items-center max-w-5xl mx-auto">
          <div className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-elevated">
              <img src={founder} alt="Founder of Zero CAC Engine" width={1024} height={1024} loading="lazy" className="w-full h-auto" />
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Why I built this</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
              I burned $42,000 on LinkedIn Ads in 2024. <span className="text-gradient-mint">Then I built this.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a solo founder. In 2024 I paid LinkedIn $42K for a pipeline I could have built with
                4 posts a week — if I'd known what the 2026 algorithm actually rewards.
              </p>
              <p>
                I reverse-engineered every viral post in my niche for 8 weeks. The patterns were
                strict, repeatable, and nothing like what gurus were teaching.
              </p>
              <p>
                AlgoCheat AI is that rubric, codified. It's the tool I wish I'd had on day one —
                priced so every solo operator and founder can afford it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
