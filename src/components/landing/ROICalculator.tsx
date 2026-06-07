import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Briefcase, 
  Award, 
  Sparkles, 
  Users, 
  Layers 
} from "lucide-react";

function fmt(n: number, decimals: number = 0) {
  return n.toLocaleString("en-US", { 
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals 
  });
}

export function ROICalculator() {
  const [activeTab, setActiveTab] = useState<"founder" | "creator">("founder");
  const [followers, setFollowers] = useState(2500);
  const [posts, setPosts] = useState(4);
  const [dealSize, setDealSize] = useState(1500);
  const [gigRate, setGigRate] = useState(300);

  const { 
    impressions, 
    leads, 
    pipeline, 
    cacSaved, 
    inbound, 
    earnings, 
    adSpendValue, 
    payback 
  } = useMemo(() => {
    // 2026 algorithm estimation:
    // ~14% impression rate per post per follower-network ratio
    const impressions = Math.round(followers * posts * 4 * 0.14 * (1 + posts / 20));

    // B2B / Founder path:
    const ctr = 0.018;
    const leadRate = 0.22;
    const leads = Math.round(impressions * ctr * leadRate);
    const closeRate = 0.08;
    const pipeline = Math.round(leads * dealSize * closeRate * 4);
    const adCpl = 312;
    const cacSaved = leads * adCpl;
    const paybackFounder = pipeline > 0 ? Math.max(1, Math.min(90, Math.round((9 / pipeline) * 30))) : 30;

    // Creator / Student path:
    const inbound = impressions * 0.001; // 0.1% inbound career/gig opportunities
    const earnings = inbound * 0.15 * gigRate; // 15% close rate * gigRate
    const adSpendValue = (impressions / 1000) * 20; // equivalent ad-spend value saved ($20 CPM)
    const paybackCreator = earnings > 0 ? Math.max(1, Math.min(90, Math.round((9 / earnings) * 30))) : 30;

    return {
      impressions,
      leads,
      pipeline,
      cacSaved,
      inbound,
      earnings,
      adSpendValue,
      payback: activeTab === "founder" ? paybackFounder : paybackCreator
    };
  }, [activeTab, followers, posts, dealSize, gigRate]);

  return (
    <section id="roi" className="py-20 md:py-28" aria-labelledby="roi-title">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Live ROI</p>
          <h2 id="roi-title" className="font-display text-4xl md:text-5xl font-bold mb-4 transition-all duration-300">
            {activeTab === "founder" ? (
              <>
                Your <span className="text-gradient-mint">Zero-CAC</span> projection
              </>
            ) : (
              <>
                Your <span className="text-gradient-mint">Brand Value</span> projection
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-lg transition-all duration-300">
            {activeTab === "founder"
              ? "Move the sliders. Watch the pipeline you're leaving on the table."
              : "See how building your personal brand turns into tangible distribution and gig earnings."}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div 
            role="tablist" 
            aria-label="Target Persona"
            className="inline-flex p-1 bg-surface border border-border/60 rounded-xl shadow-inner relative z-10"
          >
            <button
              role="tab"
              aria-selected={activeTab === "founder"}
              aria-controls="roi-calculator-content"
              id="tab-founder"
              onClick={() => setActiveTab("founder")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeTab === "founder"
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              Founder / Freelancer
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "creator"}
              aria-controls="roi-calculator-content"
              id="tab-creator"
              onClick={() => setActiveTab("creator")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeTab === "creator"
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Creator / Student
            </button>
          </div>
        </div>

        <Card 
          id="roi-calculator-content"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-br from-card to-surface/40 border-border/60 shadow-elevated"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <SliderRow 
                label="LinkedIn followers" 
                value={followers} 
                suffix="" 
                min={500} 
                max={50000} 
                step={100} 
                onChange={setFollowers} 
              />
              <SliderRow 
                label="Posts per week" 
                value={posts} 
                suffix=" posts" 
                min={1} 
                max={14} 
                step={1} 
                onChange={setPosts} 
              />
              {activeTab === "founder" ? (
                <SliderRow 
                  label="Average deal size (USD)" 
                  value={dealSize} 
                  prefix="$" 
                  min={100} 
                  max={50000} 
                  step={100} 
                  onChange={setDealSize} 
                />
              ) : (
                <SliderRow 
                  label="Sponsor / Gig rate (USD)" 
                  value={gigRate} 
                  prefix="$" 
                  min={50} 
                  max={5000} 
                  step={50} 
                  onChange={setGigRate} 
                />
              )}
            </div>

            <div className="space-y-4">
              {activeTab === "founder" ? (
                <>
                  <Metric 
                    icon={TrendingUp} 
                    label="Monthly impressions" 
                    value={fmt(impressions)} 
                    accent 
                  />
                  <Metric 
                    icon={Users} 
                    label="Qualified leads / mo" 
                    value={fmt(leads)} 
                  />
                  <Metric 
                    icon={DollarSign} 
                    label="Projected pipeline / mo" 
                    value={`$${fmt(pipeline)}`} 
                    accent 
                  />
                  <Metric 
                    icon={Award} 
                    label="vs paid-ads CAC saved" 
                    value={`$${fmt(cacSaved)}`} 
                  />
                  <Metric 
                    icon={Calendar} 
                    label="Pro plan payback" 
                    value={`${payback} days`} 
                  />
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary w-full justify-center py-2 text-xs md:text-sm font-semibold">
                    That's roughly {Math.round(cacSaved / 9)}× the cost of Pro.
                  </Badge>
                </>
              ) : (
                <>
                  <Metric 
                    icon={TrendingUp} 
                    label="Monthly impressions" 
                    value={fmt(impressions)} 
                    accent 
                  />
                  <Metric 
                    icon={Briefcase} 
                    label="Inbound opportunities / mo" 
                    value={fmt(inbound, 1)} 
                  />
                  <Metric 
                    icon={DollarSign} 
                    label="Estimated brand earnings / mo" 
                    value={`$${fmt(earnings)}`} 
                    accent 
                  />
                  <Metric 
                    icon={Award} 
                    label="Equivalent ad-spend saved" 
                    value={`$${fmt(adSpendValue)}`} 
                  />
                  <Metric 
                    icon={Calendar} 
                    label="Pro plan payback" 
                    value={`${payback} days`} 
                  />
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary w-full justify-center py-2 text-xs md:text-sm font-semibold">
                    That's roughly {Math.round((earnings + adSpendValue) / 9)}× the cost of Pro in organic value.
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Dynamic educational value details */}
          <div className="mt-12 pt-8 border-t border-border/60 transition-all duration-300">
            {activeTab === "founder" ? (
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  The Zero-CAC Pipeline Advantage
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/40">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">No Ad Budget Required</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Ditch the $300+ Cost Per Lead of cold ads. Building a personal brand generates inbound interest for $0 acquisition cost.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/40">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">Higher Trust, Faster Closes</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Prospects who consume your content already trust your expertise. Your sales cycles are shorter and close rates are higher.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/40">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">Compounding Authority</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Every post is a permanent asset. Over time, your authority compounds, making you the default choice in your niche.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  How Building in Public Generates Tangible Career Value
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/40">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">Recruiter Magnetism</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Recruiters don't search resumes anymore; they search active profiles. Your organic reach acts as a passive, 24/7 job application.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/40">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">Free Distribution Power</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A $20 CPM means LinkedIn gives you thousands of dollars of free distribution. That's massive brand value that you own completely.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface/50 border border-border/40">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">Sponsor & Gig Potential</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Even with a small, highly engaged following, you can secure brand sponsorships, paid newsletters, and consulting gigs.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
