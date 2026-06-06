import { useState } from "react";
import { Zap, ShieldAlert } from "lucide-react";

export function Footer() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <footer className="border-t border-border/40 bg-card/20 py-12">
      <div className="container space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground">
              <Zap className="w-3.5 h-3.5" />
            </span>
            AlgoCheat AI
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="#content-lab" className="hover:text-foreground transition-colors">Content Lab</a>
            <button 
              onClick={() => setShowLegal(!showLegal)}
              className="text-xs flex items-center gap-1 hover:text-primary transition-colors text-muted-foreground underline underline-offset-4"
            >
              <ShieldAlert className="w-3 h-3 text-primary" />
              Legal & Fair Usage
            </button>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AlgoCheat AI · Reclaim Your Organic Reach.</p>
        </div>

        {showLegal && (
          <div className="p-5 rounded-xl bg-card/60 border border-border/50 text-[10px] text-muted-foreground/80 space-y-2.5 leading-relaxed animate-fade-in">
            <p className="font-semibold text-foreground text-xs">Legal Disclaimer, Billing Terms & Fair Usage Policy</p>
            <p>
              <strong>Data Processing & Technology Disclosure:</strong> AlgoCheat AI operates as a serverless static application. All content analysis, scoring, and text generation routines run 100% client-side in the user's browser session, utilizing encrypted edge proxies—specifically leveraging the Puter.js in-browser AI runtime network. Zero drafts, texts, or private user logs are transmitted to or stored on our servers, ensuring complete GDPR data compliance by default.
            </p>
            <p>
              <strong>Commercial Licensing & Subscriptions:</strong> Billed subscriptions (Pro Tier plans) grant users a commercial license to access our proprietary 2026 algorithm auditing parameters, high-dwell-time layout generators, advanced dashboard metric visualizations (Recharts Cockpit), hook variant builders, and competitor analysis templates. Subscriptions cover these proprietary scoring matrices and our front-end cockpit interface, not the third-party browser execution networks.
            </p>
            <p>
              <strong>Fair Usage Agreement:</strong> Free Core (Phase 1) features are provided for individual use. Pro Tier (Phase 2) is limited to the licensed account holder. Any automated scripts, API scraping, bulk programmatic queries, or attempts to reverse-engineer AlgoCheat's proprietary 10-parameter scoring weights are strictly prohibited and will result in immediate API proxy blocklist and subscription termination without refund.
            </p>
            <p>
              <strong>Trademark Disclaimer:</strong> LinkedIn™ is a registered trademark of LinkedIn Corporation and Microsoft. AlgoCheat AI is an independent software tool and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with LinkedIn Corporation, Microsoft, or any of their subsidiaries.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
