import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function ROICalculator() {
  const [followers, setFollowers] = useState(2500);
  const [posts, setPosts] = useState(4);
  const [dealSize, setDealSize] = useState(1500);

  const { impressions, leads, pipeline, cacSaved, payback } = useMemo(() => {
    // assume 2026 algo: ~14% impression rate per post per follower-network ratio
    const impressions = Math.round(followers * posts * 4 * 0.14 * (1 + posts / 20));
    const ctr = 0.018;
    const leadRate = 0.22;
    const leads = Math.round(impressions * ctr * leadRate);
    const closeRate = 0.08;
    const pipeline = Math.round(leads * dealSize * closeRate * 4);
    const adCpl = 312;
    const cacSaved = leads * adCpl;
    const payback = pipeline > 0 ? Math.max(1, Math.round((9 / pipeline) * 30)) : 30;
    return { impressions, leads, pipeline, cacSaved, payback };
  }, [followers, posts, dealSize]);

  return (
    <section id="roi" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Live ROI</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your <span className="text-gradient-mint">Zero-CAC</span> projection
          </h2>
          <p className="text-muted-foreground text-lg">
            Move the sliders. Watch the pipeline you're leaving on the table.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-br from-card to-surface/40 border-border/60 shadow-elevated">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <SliderRow label="LinkedIn followers" value={followers} suffix="" min={500} max={50000} step={100} onChange={setFollowers} />
              <SliderRow label="Posts per week" value={posts} suffix=" posts" min={1} max={14} step={1} onChange={setPosts} />
              <SliderRow label="Average deal size (USD)" value={dealSize} prefix="$" min={100} max={50000} step={100} onChange={setDealSize} />
            </div>

            <div className="space-y-4">
              <Metric icon={TrendingUp} label="Monthly impressions" value={fmt(impressions)} accent />
              <Metric icon={DollarSign} label="Qualified leads / mo" value={fmt(leads)} />
              <Metric icon={DollarSign} label="Projected pipeline / mo" value={`$${fmt(pipeline)}`} accent />
              <Metric icon={DollarSign} label="vs paid-ads CAC saved" value={`$${fmt(cacSaved)}`} />
              <Metric icon={Calendar} label="Pro plan payback" value={`${payback} days`} />
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary w-full justify-center py-2">
                That's roughly {Math.round(cacSaved / 9)}× the cost of Pro.
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function SliderRow({
  label, value, onChange, min, max, step, prefix = "", suffix = "",
}: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-display text-2xl font-semibold text-foreground">
          {prefix}{fmt(value)}{suffix}
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}

function Metric({
  icon: Icon, label, value, accent,
}: { icon: any; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${accent ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card/40"}`}>
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      <span className={`font-display text-xl font-semibold ${accent ? "text-primary" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
