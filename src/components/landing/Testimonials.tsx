import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import a1 from "@/assets/avatar-1.jpg";
import a2 from "@/assets/avatar-2.jpg";
import a3 from "@/assets/avatar-3.jpg";
import a4 from "@/assets/avatar-4.jpg";
import a5 from "@/assets/avatar-5.jpg";
import a6 from "@/assets/avatar-6.jpg";

const items = [
  { quote: "Went from 200 impressions a post to 38K in 6 weeks. Closed $28K MRR from inbound alone. I cancelled my LinkedIn Ads account.", name: "Maya Ostrowski", role: "Founder, Lattice Analytics", avatar: a1 },
  { quote: "The audit caught hooks I would have shipped. My reply rate on DMs doubled because the post was already pre-qualifying buyers.", name: "Daniel Reuter", role: "Solo SaaS, DocketLane", avatar: a2 },
  { quote: "I sell $40K consulting engagements. Two posts a week from this tool generated 11 SQLs last month. CAC is effectively $0.", name: "Amara Okeke", role: "GTM Consultant", avatar: a3 },
  { quote: "Built my $7K MRR side project entirely from LinkedIn posts I generated here. As a student that pricing is unreal.", name: "Kenji Tanaka", role: "Indie Hacker", avatar: a4 },
  { quote: "Stopped paying a ghostwriter $5K/mo. The 10/10 generator sounds more like me than my actual ghostwriter did.", name: "Sofía Marín", role: "Fractional CMO", avatar: a5 },
  { quote: "I've been on LinkedIn since 2009. This is the first tool that actually understands what the new algo wants.", name: "Geoff Halsey", role: "B2B SaaS Founder", avatar: a6 },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-card/20 border-y border-border/40">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Wall of love</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            8,200 solo operators. <span className="text-gradient-mint">Zero ad spend.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {items.map((t) => (
            <Card key={t.name} className="p-6 bg-card/60 border-border/60 hover:border-primary/30 transition-colors flex flex-col">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 mb-5 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <img src={t.avatar} alt={t.name} width={48} height={48} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
