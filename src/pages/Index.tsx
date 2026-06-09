import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowToUse } from "@/components/landing/HowToUse";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ContentLab } from "@/components/ContentLab";
import { APISettingsModal } from "@/components/APISettingsModal";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { PlaybookSection } from "@/components/landing/PlaybookSection";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { UserIntentSection } from "@/components/UserIntentSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <HowToUse />

        <section className="py-20 md:py-24 bg-card/20 border-y border-border/40">
          <div className="container">
            <ContentLab />
          </div>
        </section>

        <CaseStudiesSection />

        <section id="user-intent-section" className="py-20 md:py-24">
          <div className="container">
            <UserIntentSection />
          </div>
        </section>

        <PlaybookSection />

        <FeatureBento />
        <ProductShowcase />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <APISettingsModal />
    </div>
  );
};

export default Index;
