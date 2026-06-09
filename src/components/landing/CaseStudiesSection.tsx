import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, TrendingUp, AlertTriangle, Sparkles, HelpCircle } from "lucide-react";

interface CaseStudy {
  id: string;
  category: string;
  originalText: string;
  originalLikes: number;
  originalScore: number;
  revisedText: string;
  revisedLikes: number;
  revisedScore: number;
  tweaks: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    category: "B2B SaaS Launch",
    originalText: "I'm excited to share that we just launched our new AI tool. We've been working on this for 6 months. It has a dashboard, RAG, and an API. Let me know what you think!",
    originalLikes: 3,
    originalScore: 34,
    revisedText: "AI tools fail because founders build features, not workflows.\n\nAfter 6 months of building in public, we shrunk time-to-value from 12 minutes to 14 seconds.\n\nHere are 3 lessons we learned building our RAG engine:\n1. Mock vectors first\n2. Stream responses instantly\n3. Cache aggressive metadata\n\nWhat is your biggest roadblock with RAG?",
    revisedLikes: 184,
    revisedScore: 96,
    tweaks: ["Changed hook to a contrarian benefit statement", "Structured into scannable progressive bullet points", "Added a arguable conversation trigger question"],
  },
  {
    id: "cs-2",
    category: "Tech Thought Leadership",
    originalText: "Leadership is about empathy. We need to leverage our teams to maximize output while maintaining a positive culture. Moreover, we must delve deeper into problems.",
    originalLikes: 2,
    originalScore: 28,
    revisedText: "Stop asking your team for 'updates'. Ask them what they're blocking.\n\nAs a CTO, I realized empathy isn't about nice meetings. It is about removing friction.\n\n3 questions I ask every Monday:\n- What did you delete this week?\n- Where did we overcomplicate?\n- Who needs help with a decision?\n\nHow do you run your standups?",
    revisedLikes: 215,
    revisedScore: 98,
    tweaks: ["Removed AI buzzwords ('leverage', 'moreover', 'delve')", "Injected concrete first-person CTO narrative", "Optimized dwell time with punchy 1-sentence paragraphs"],
  },
  {
    id: "cs-3",
    category: "Founder Storytelling",
    originalText: "I wanted to share my story of failing in my first startup. It was hard and I learned a lot. We had no customers and lost money. Always validate first.",
    originalLikes: 1,
    originalScore: 32,
    revisedText: "I lost $45,000 in 90 days building an app nobody wanted.\n\nWe had clean code, perfect designs, and 0 customers.\n\nThe mistake? We validated opinions, not wallets.\n\nIf someone says 'this is cool', they won't buy it. If they pre-pay to solve a pain, you have a business.\n\nWhat was your most expensive business lesson?",
    revisedLikes: 168,
    revisedScore: 95,
    tweaks: ["Injected specific numbers ($45k, 90 days)", "Replaced passive summary with high-tension micro-story", "Added a direct, targeted conversation trigger at the bottom"],
  },
  {
    id: "cs-4",
    category: "Growth & Product Marketing",
    originalText: "If you want to build a personal brand, you need to post consistently. Check out our free playbook in the link here: https://algocheat.com/playbook.",
    originalLikes: 4,
    originalScore: 40,
    revisedText: "Consistency is the lowest tier of LinkedIn growth.\n\nYou can post every day and still get 4 views if your value density is zero.\n\nTo build a brand that converts:\n- Hook: 1 specific reframe\n- Body: 2 numbers or percentages\n- Footer: 1 debate topic\n\n(Playbook link is pinned in the comments below)",
    revisedLikes: 242,
    revisedScore: 97,
    tweaks: ["Removed external link from the body to avoid algorithm penalty", "Swapped generic advice for a concrete framework", "Opened with a pattern-interrupt hook"],
  }
];

export function CaseStudiesSection() {
  return (
    <section className="py-20 md:py-24 border-t border-border/40 bg-card/10">
      <div className="container space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary backdrop-blur">
            Real-World Performance Validation
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            From 4 Likes to <span className="text-gradient-mint">Viral Organic Reach</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            See the exact before-and-after audit transformations that turned dead drafts into high-dwell engagement engines.
          </p>
        </div>

        {/* Row 1: Original Failing Drafts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pl-4 md:pl-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Row 1: Original Drafts (Dumb AI & Basic Copy)</span>
            <Badge variant="destructive" className="text-[10px] py-0.5 px-2">Low Algorithm Delivery</Badge>
          </div>
          <div className="flex gap-6 overflow-x-auto px-4 md:px-8 pb-4 scrollbar-none snap-x snap-mandatory">
            {CASE_STUDIES.map((cs) => (
              <Card key={cs.id} className="snap-center shrink-0 w-[290px] sm:w-[350px] md:w-[480px] p-5 border border-destructive/20 bg-background/45 backdrop-blur-sm space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <span className="text-[11px] font-bold text-destructive uppercase tracking-wider">{cs.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-destructive" /> {cs.originalLikes} Likes
                    </span>
                    <Badge variant="outline" className="border-destructive/30 bg-destructive/5 text-destructive text-xs font-mono font-bold">
                      Score: {cs.originalScore}/100
                    </Badge>
                  </div>
                </div>
                <div className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-muted-foreground/90 h-[96px] overflow-y-auto">
                  {cs.originalText}
                </div>
                <div className="text-[10px] text-destructive/80 font-medium flex items-center gap-1 bg-destructive/5 border border-destructive/10 p-2.5 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Algorithm Penalty:</strong> Fails scroll-stopping hook rules & lacks structured dwell layout.</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Row 2: Optimized 10/10 Rewrites */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pl-4 md:pl-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Row 2: AlgoCheat 10/10 Rewrites</span>
            <Badge className="bg-green-500 hover:bg-green-500 text-[10px] py-0.5 px-2">High Algorithm Delivery</Badge>
          </div>
          <div className="flex gap-6 overflow-x-auto px-4 md:px-8 pb-4 scrollbar-none snap-x snap-mandatory">
            {CASE_STUDIES.map((cs) => (
              <Card key={cs.id} className="snap-center shrink-0 w-[290px] sm:w-[350px] md:w-[480px] p-5 border border-green-500/20 bg-background/55 backdrop-blur-md space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">{cs.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {cs.revisedLikes} Likes
                    </span>
                    <Badge variant="outline" className="border-green-500/30 bg-green-500/5 text-green-400 text-xs font-mono font-bold">
                      Score: {cs.revisedScore}/100
                    </Badge>
                  </div>
                </div>
                <div className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-foreground h-[96px] overflow-y-auto">
                  {cs.revisedText}
                </div>
                <div className="text-[10px] text-green-400/90 font-medium bg-green-500/5 border border-green-500/10 p-2.5 rounded-lg space-y-1">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse text-green-400" />
                    <strong>Key Audit Optimizations Applied:</strong>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                    {cs.tweaks.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
