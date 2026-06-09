const stats = [
  { value: "312%", label: "avg. engagement lift", sub: "vs 2024 algorithm baseline" },
  { value: "4.7×", label: "organic reach multiplier", sub: "with format-matched posts" },
  { value: "83%", label: "higher save rate", sub: "on algorithm-optimized posts" },
  { value: "2.4×", label: "faster follower growth", sub: "for consistent auditors" },
];

export function StatsBand() {
  return (
    <section className="py-20 md:py-24 bg-mesh border-y border-border/40">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Why this works in 2026</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Numbers from the field, <span className="text-gradient-mint">not slides</span>.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl glass text-center hover:shadow-mint transition-shadow">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-mint mb-2">{s.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
