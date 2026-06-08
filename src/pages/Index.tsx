import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowToUse } from "@/components/landing/HowToUse";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { DashboardSneakPeek } from "@/components/landing/DashboardSneakPeek";
import { ContentLab } from "@/components/ContentLab";
import { APISettingsModal } from "@/components/APISettingsModal";
import { StatsBand } from "@/components/landing/StatsBand";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FounderStory } from "@/components/landing/FounderStory";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { PlaybookSection } from "@/components/landing/PlaybookSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <HowToUse />
        <LogoCloud />
        <ProblemSolution />
        <FeatureBento />
        <ROICalculator />
        <ProductShowcase />
        <DashboardSneakPeek />

        <section className="py-20 md:py-24 bg-card/20 border-y border-border/40">
          <div className="container">
            <ContentLab />
          </div>
        </section>

        <StatsBand />
        <ComparisonTable />
        <Testimonials />
        <Pricing />
        <FounderStory />
        <PlaybookSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <APISettingsModal />
    </div>
  );
};

export default Index;
