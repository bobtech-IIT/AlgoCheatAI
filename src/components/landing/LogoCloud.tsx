const items = ["Product Hunt", "Indie Hackers", "TechCrunch", "Hacker News", "MicroConf", "SaaStr", "Y Combinator", "Demand Curve"];

export function LogoCloud() {
  return (
    <section className="py-12 border-y border-border/40 bg-card/20">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Writing is productivity. Stop wasting hours. Featured in
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...items, ...items].map((name, i) => (
              <span
                key={i}
                className="font-display text-lg md:text-xl font-semibold text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
