import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { GrowthMetricsChart } from "@/components/GrowthMetricsChart";
import { LeadGenerationChart } from "@/components/LeadGenerationChart";
import { LinkedInAlgorithmChart } from "@/components/LinkedInAlgorithmChart";
import { GrowthHacksList } from "@/components/GrowthHacksList";
import { BrandingStrategies } from "@/components/BrandingStrategies";

export function PlaybookSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-20 md:py-24">
      <div className="container max-w-6xl">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Deep dive</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            The full <span className="text-gradient-mint">2026 LinkedIn Playbook</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Charts, frameworks, and the lead-gen channel data behind the engine. Free to read.
          </p>
          <Button variant="outline" onClick={() => setOpen((v) => !v)} className="mt-6 border-border/60">
            {open ? "Hide playbook" : "Open the playbook"}
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {open && (
          <div className="space-y-8 animate-fade-in">
            <Card className="p-6 md:p-8 bg-card/40 border-border/60">
              <h3 className="font-display text-2xl font-semibold mb-6">B2B SaaS growth metrics — 2026</h3>
              <GrowthMetricsChart />
            </Card>
            <Card className="p-6 md:p-8 bg-card/40 border-border/60">
              <h3 className="font-display text-2xl font-semibold mb-6">Algorithm ranking factors</h3>
              <LinkedInAlgorithmChart />
            </Card>
            <Card className="p-6 md:p-8 bg-card/40 border-border/60">
              <h3 className="font-display text-2xl font-semibold mb-6">Lead-gen channel effectiveness</h3>
              <LeadGenerationChart />
            </Card>
            <GrowthHacksList />
            <BrandingStrategies />
          </div>
        )}
      </div>
    </section>
  );
}
