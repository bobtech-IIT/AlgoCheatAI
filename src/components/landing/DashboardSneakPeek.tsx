import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LinkedInAlgorithmChart } from "../LinkedInAlgorithmChart";
import { LeadGenerationChart } from "../LeadGenerationChart";
import { GrowthMetricsChart } from "../GrowthMetricsChart";
import { BrandingStrategies } from "../BrandingStrategies";
import { GrowthHacksList } from "../GrowthHacksList";
import { EngagementStatsCard } from "../EngagementStatsCard";
import { Sparkles, Activity, BarChart3, LineChart, Shield, Target } from "lucide-react";

export function DashboardSneakPeek() {
  return (
    <section id="features" className="py-20 md:py-28 bg-mesh border-y border-border/40 scroll-mt-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-primary" />
            AlgoCheat Pro Cockpit
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Unfair algorithm advantage. <br />
            <span className="text-gradient-mint">In one unified cockpit.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A sneak peek of the upcoming Phase 2 SaaS Dashboard. Track real-time algorithm mutations, 
            reverse-engineer competitors, and monitor your organic revenue pipeline.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-6 md:p-8 bg-card/45 border-border/60 glass shadow-elevated rounded-2xl">
          <Tabs defaultValue="algo" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full bg-muted/30 border border-border/40 p-1 rounded-xl mb-8 h-auto gap-1">
              <TabsTrigger value="algo" className="py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 justify-center">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <span>Algo Weight</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 justify-center">
                <Activity className="w-4 h-4 text-primary shrink-0" />
                <span>Growth Line</span>
              </TabsTrigger>
              <TabsTrigger value="pipeline" className="py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 justify-center">
                <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                <span>Lead Funnels</span>
              </TabsTrigger>
              <TabsTrigger value="branding" className="py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 justify-center">
                <Target className="w-4 h-4 text-primary shrink-0" />
                <span>Authority map</span>
              </TabsTrigger>
              <TabsTrigger value="hacks" className="py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 justify-center col-span-2 md:col-span-1">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span>Cheat Sheets</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="algo" className="focus-visible:outline-none space-y-6">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 space-y-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Metric: Scroll stops & Alt text</Badge>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    LinkedIn 2026 Radar calibration
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    LinkedIn's 2026 core engine ranks posts based heavily on **Dwell Time** (time spent reading before scrolling) and the **Show More** click actions.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our scanner balances these 6 critical vectors in real-time client-side, ensuring your posts get full algorithm distribution with zero AI penalties.
                  </p>
                </div>
                <div className="md:col-span-3 p-4 bg-muted/10 border border-border/40 rounded-xl">
                  <LinkedInAlgorithmChart />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="focus-visible:outline-none space-y-6">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Metric: Impression surges</Badge>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Organic vs. Paid Growth
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      With paid click costs soaring to $45/click, organic thought leadership is the single most valuable acquisition channel in 2026.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <EngagementStatsCard title="Avg Dwell Time" value="1.8m" description="+42% vs industry avg" trend="up" />
                    <EngagementStatsCard title="Organic CAC" value="$0" description="No paid credits used" trend="up" />
                  </div>
                </div>
                <div className="md:col-span-3 p-4 bg-muted/10 border border-border/40 rounded-xl">
                  <GrowthMetricsChart />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="focus-visible:outline-none space-y-6">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 space-y-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Metric: Lead conversion</Badge>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Content-to-Pipeline Funnels
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Views are a vanity metric. True pipeline happens when a reader clicks your profile and enters your funnel.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Monitor which specific hooks, frameworks, and stories are generating highly qualified leads so you can focus on writing high-ROI content.
                  </p>
                </div>
                <div className="md:col-span-3 p-4 bg-muted/10 border border-border/40 rounded-xl">
                  <LeadGenerationChart />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="focus-visible:outline-none">
              <div className="space-y-4 mb-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Metric: Authority builders</Badge>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Branded Authority Roadmaps
                </h3>
                <p className="text-sm text-muted-foreground">
                  Follow structured thought-leadership frameworks designed to scale authority, increase loyalty, and boost click conversion rates.
                </p>
              </div>
              <BrandingStrategies />
            </TabsContent>

            <TabsContent value="hacks" className="focus-visible:outline-none">
              <div className="space-y-4 mb-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Metric: Algorithm overrides</Badge>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Algorithm Cheatsheet Steps
                </h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step technical blueprints to hijack organic reach and bypass LinkedIn feed limits.
                </p>
              </div>
              <GrowthHacksList />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
