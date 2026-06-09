import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Target, BarChart3, MessageCircle, Clock, Bookmark, Share2, Zap, Repeat, Hash, ChevronRight, Sparkles } from "lucide-react"

const tips = [
  {
    number: 1,
    title: "3-2-1 Content Architecture",
    hook: "Stack 3 insights, ask 2 questions, close with 1 CTA",
    signal: "Dwell Time (+35%)",
    difficulty: "Beginner" as const,
    steps: [
      "Draft three concise insights under 150 characters each",
      "Add two open-ended questions that invite personal stories",
      "Finish with a single clear CTA — 'Save this' or 'Comment your take'",
    ],
    impact: "Boost dwell time by ~20%, increase saves by 15%",
  },
  {
    number: 2,
    title: "Comment Seeding Strategy",
    hook: "Drop value-bomb comments before you post to hijack engagement",
    signal: "Comment Depth (+25%)",
    difficulty: "Intermediate" as const,
    steps: [
      "Identify 3 niche posts with 100+ comments",
      "Write a 2-sentence comment adding a new angle or data point",
      "When you publish, reply to those seed comments within 5 mins with a follow-up",
    ],
    impact: "Elevate comment depth score by 30%",
  },
  {
    number: 3,
    title: "The 60-Minute Sprint",
    hook: "Win the algorithm in the first hour with a rapid engagement blitz",
    signal: "Virality Window (first 60-90 min)",
    difficulty: "Intermediate" as const,
    steps: [
      "Block 60 mins right after publishing",
      "Min 0-10: Reply to every comment",
      "Min 11-30: Share in 2 LinkedIn Groups",
      "Min 31-60: Post a poll or question thread",
    ],
    impact: "Early reaction rate +40%, overall reach +25%",
  },
  {
    number: 4,
    title: "Save Optimization Blueprint",
    hook: "Design posts that readers can't stop saving",
    signal: "Saves (+20%)",
    difficulty: "Beginner" as const,
    steps: [
      "End with a downloadable cheat-sheet or framework",
      "Add 'Save this for later' after the CTA",
      "Include a 3-5 bullet takeaway section",
    ],
    impact: "Save rate from 2% to 8% (4x lift)",
  },
  {
    number: 5,
    title: "Private Share Triggers",
    hook: "Create content that feels like an insider secret",
    signal: "Private Shares (+15%)",
    difficulty: "Advanced" as const,
    steps: [
      "Add a teaser like 'DM me for the full breakdown'",
      "Use exclusive language: 'Only for founders'",
      "Close with a question that invites DMs",
    ],
    impact: "Boost private shares by 12%, generate 50+ DM convos/month",
  },
  {
    number: 6,
    title: "Depth Score Framework",
    hook: "Structure posts to keep readers scrolling longer",
    signal: "Dwell Time (+35%)",
    difficulty: "Intermediate" as const,
    steps: [
      "Open with a hook that poses a problem",
      "Present a 4-step framework with visual breaks",
      "Insert a reflection question after step 2",
      "Close with a summary restating the solution",
    ],
    impact: "Add ~45 seconds average dwell per post",
  },
  {
    number: 7,
    title: "Anti-AI Voice Detection",
    hook: "Write like a human and dodge LinkedIn's AI-filter penalty",
    signal: "Authentic Voice (cross-parameter)",
    difficulty: "Advanced" as const,
    steps: [
      "Use contractions and occasional fragments",
      "Add personal anecdotes with imperfect grammar",
      "Vary sentence length — mix short and long",
      "Avoid perfectly parallel structures",
    ],
    impact: "Comment depth +18%, dwell +18%",
  },
  {
    number: 8,
    title: "Hashtag Tiers Strategy",
    hook: "Layer volume and niche tags to dominate discovery",
    signal: "SEO + Discovery",
    difficulty: "Intermediate" as const,
    steps: [
      "Use 1 broad tag (1M+ posts)",
      "Add 2 niche tags (100K-1M)",
      "Include 1 micro tag (10K-100K)",
      "Test combinations and track reach",
    ],
    impact: "Organic reach +25-40%",
  },
  {
    number: 9,
    title: "The Slippery Slope",
    hook: "Force the 'see more' click with a teaser that begs continuation",
    signal: "Post Expands / Read Rate",
    difficulty: "Beginner" as const,
    steps: [
      "Write a 2-sentence teaser revealing only part of the story",
      "End teaser with a question",
      "Place the full answer below the fold or in comments",
      "Measure 'see more' click-through rate",
    ],
    impact: "Dwell time 1.5x, comments +30%",
  },
  {
    number: 10,
    title: "Content Repurposing Engine",
    hook: "Turn one post into 4 complementary formats",
    signal: "Cross-format engagement",
    difficulty: "Advanced" as const,
    steps: [
      "Write a core idea as a story",
      "Extract a quote for a graphic card",
      "Break into 3 bullets for a carousel",
      "Convert bullets into a short video script",
    ],
    impact: "Content output 4x with same effort",
  },
]

const difficultyStyles: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  Intermediate: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  Advanced: "bg-red-500/15 text-red-500 border-red-500/30",
}

const signalIcons: Record<string, typeof Lightbulb> = {
  "Dwell Time": Clock,
  "Comment Depth": MessageCircle,
  "Virality": Zap,
  "Saves": Bookmark,
  "Private Shares": Share2,
  "SEO": Hash,
  "Post Expands": ChevronRight,
  "Cross-format": Repeat,
  "Authentic Voice": Sparkles,
}

export function PlaybookSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container max-w-4xl relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium">
            <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
            Algorithm Playbook
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Your <span className="text-gradient-mint">Organic Growth</span> Playbook
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            10 algorithm-backed strategies to grow on LinkedIn without paid ads
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {tips.map((tip) => {
            const IconComponent = signalIcons[Object.keys(signalIcons).find((k) => tip.signal.startsWith(k)) ?? ""] ?? TrendingUp
            return (
              <AccordionItem
                key={tip.number}
                value={`tip-${tip.number}`}
                className="border border-border/50 rounded-xl overflow-hidden bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/20">
                  <div className="flex items-center gap-4 text-left flex-1 min-w-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
                      {tip.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{tip.title}</span>
                        <Badge className={`text-[10px] px-2 py-0.5 border ${difficultyStyles[tip.difficulty]}`} variant="outline">
                          {tip.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{tip.hook}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="pt-2 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/5 rounded-lg px-3 py-2 w-fit">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>Signal: {tip.signal}</span>
                    </div>
                    <div className="space-y-1.5">
                      {tip.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-[10px] font-medium shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <Card className="bg-primary/5 border-primary/10 p-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-foreground">Impact: </span>
                        <span className="text-muted-foreground">{tip.impact}</span>
                      </div>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
