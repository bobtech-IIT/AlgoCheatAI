"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserPlus, Target, Briefcase, Lightbulb, Mic, Zap, Layout, MessageCircle,
  Calendar, TrendingUp, PenTool, Award, Users, Share2, BarChart3, Rocket,
  Star, BookOpen, Heart, CheckCircle, Volume2, PieChart, Target as TargetIcon,
  type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserIntentSectionProps {
  onPlaybookReady?: () => void
}

interface IntentOption {
  id: string
  icon: typeof UserPlus
  title: string
  description: string
}

interface PlaybookPage {
  number: number
  icon: LucideIcon
  title: string
  bullets: string[]
}

interface PlaybookData {
  pages: PlaybookPage[]
}

const intents: IntentOption[] = [
  {
    id: "personal-brand",
    icon: UserPlus,
    title: "Build My Personal Brand",
    description: "Establish authority and get recognized in my industry",
  },
  {
    id: "b2b-leads",
    icon: Target,
    title: "Generate B2B Leads",
    description: "Turn content into a lead generation machine",
  },
  {
    id: "next-role",
    icon: Briefcase,
    title: "Land My Next Role",
    description: "Attract recruiters and showcase my expertise",
  },
  {
    id: "expertise",
    icon: Lightbulb,
    title: "Share My Expertise",
    description: "Contribute to conversations and build thought leadership",
  },
]

const gradientPairs = [
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-blue-500 to-indigo-600",
  "from-cyan-500 to-sky-600",
]

const playbooks: Record<string, PlaybookData> = {
  "personal-brand": {
    pages: [
      { number: 1, icon: Mic, title: "Define Your Niche Voice", bullets: ["Find your 3 core topics", "Write your origin story", "Create your content pillar framework"] },
      { number: 2, icon: Zap, title: "Hook Engineering", bullets: ["5 hook templates for personal brand", "The curiosity gap formula", "How to pattern-interrupt"] },
      { number: 3, icon: Layout, title: "Content Architecture", bullets: ["The 3-2-1 framework", "Dwell-time formatting", "Mobile-first writing"] },
      { number: 4, icon: MessageCircle, title: "Engagement Loop", bullets: ["Comment seeding strategy", "The 60-min sprint", "Building your community"] },
      { number: 5, icon: Calendar, title: "Consistency System", bullets: ["30-day content calendar", "Batch creation workflow", "Repurposing engine"] },
      { number: 6, icon: TrendingUp, title: "Growth Metrics", bullets: ["Track what matters", "Depth Score optimization", "Network effects"] },
    ],
  },
  "b2b-leads": {
    pages: [
      { number: 1, icon: PenTool, title: "Lead Magnet Content", bullets: ["Problem-aware hooks", "Authority-building posts", "Case study frameworks"] },
      { number: 2, icon: TargetIcon, title: "Conversion Architecture", bullets: ["Soft CTA sequences", "DM funnel scripts", "Pipeline acceleration"] },
      { number: 3, icon: Award, title: "Trust Building", bullets: ["Behind-the-scenes content", "Social proof stacking", "Client results showcase"] },
      { number: 4, icon: TrendingUp, title: "Outbound Integration", bullets: ["Comment targeting", "Warm outreach templates", "Multi-channel alignment"] },
      { number: 5, icon: BarChart3, title: "Analytics & Optimization", bullets: ["Lead source tracking", "Conversion rate optimization", "A/B testing"] },
      { number: 6, icon: Rocket, title: "Scaling System", bullets: ["Content batching", "VA delegation", "Automated follow-ups"] },
    ],
  },
  "next-role": {
    pages: [
      { number: 1, icon: Mic, title: "Profile Optimization", bullets: ["Headline engineering", "About section storytelling", "Experience rewriter"] },
      { number: 2, icon: Lightbulb, title: "Authority Content", bullets: ["Thought leadership posts", "Industry insight sharing", "Problem-solving content"] },
      { number: 3, icon: Users, title: "Network Building", bullets: ["Recruiter targeting", "Company research", "Alumni engagement"] },
      { number: 4, icon: Briefcase, title: "Application Strategy", bullets: ["Cover letter posts", "Portfolio showcasing", "Interview prep content"] },
      { number: 5, icon: CheckCircle, title: "Social Proof", bullets: ["Recommendation requests", "Project highlights", "Skill demonstrations"] },
      { number: 6, icon: Star, title: "Follow-up System", bullets: ["Post-interview content", "Relationship maintenance", "Offer negotiation"] },
    ],
  },
  "expertise": {
    pages: [
      { number: 1, icon: Volume2, title: "Thought Leadership", bullets: ["Original research posts", "Framework creation", "Industry predictions"] },
      { number: 2, icon: BookOpen, title: "Educational Content", bullets: ["How-to threads", "Tool comparisons", "Resource curation"] },
      { number: 3, icon: Heart, title: "Community Building", bullets: ["Discussion starters", "Collaboration posts", "Expert roundtables"] },
      { number: 4, icon: PieChart, title: "Content Systems", bullets: ["Idea capture", "Writing workflow", "Publishing schedule"] },
      { number: 5, icon: BarChart3, title: "Authority Metrics", bullets: ["Engagement analysis", "Reach optimization", "Influence tracking"] },
      { number: 6, icon: Star, title: "Legacy Building", bullets: ["Newsletter creation", "Speaking opportunities", "Mentorship content"] },
    ],
  },
}

export function UserIntentSection({ onPlaybookReady }: UserIntentSectionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [playbook, setPlaybook] = useState<PlaybookData | null>(null)

  function handleSelect(id: string) {
    setSelected(id)
  }

  async function handleGenerate() {
    if (!selected) return
    const intent = intents.find((i) => i.id === selected)
    if (!intent) return
    const data = { intent: intent.id, label: intent.title, timestamp: Date.now() }
    localStorage.setItem("user-intent", JSON.stringify(data))
    window.dispatchEvent(new CustomEvent("user-intent-selected", { detail: data }))

    setGenerating(true)
    setPlaybook(null)
    await new Promise((r) => setTimeout(r, 1500))
    setPlaybook(playbooks[selected] ?? null)
    setGenerating(false)
    onPlaybookReady?.()
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What brings you to{" "}
            <span className="text-gradient-mint">LinkedIn</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us what you&apos;re here for — and we&apos;ll tailor your growth playbook
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {intents.map((intent) => {
            const Icon = intent.icon
            const isSelected = selected === intent.id
            return (
              <Card
                key={intent.id}
                onClick={() => handleSelect(intent.id)}
                className={cn(
                  "relative p-6 cursor-pointer transition-all border",
                  "bg-card/60 hover:border-primary/50",
                  isSelected
                    ? "border-primary shadow-mint bg-gradient-to-br from-primary/15 via-card to-card"
                    : "border-border/60"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-base">{intent.title}</h3>
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                          isSelected ? "border-primary" : "border-muted-foreground/40"
                        )}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{intent.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            disabled={!selected || generating}
            onClick={handleGenerate}
            className="h-12 px-10 text-base bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating Your Playbook...
              </span>
            ) : (
              "Generate My Playbook"
            )}
          </Button>
        </div>

        {playbook && (
          <div className="mt-16">
            <div className="text-center mb-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Your <span className="text-gradient-mint">6-Page Playbook</span>
              </h3>
              <p className="text-muted-foreground">Tailored strategies to achieve your LinkedIn goals</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {playbook.pages.map((page, i) => {
                const PageIcon = page.icon
                return (
                  <Card key={page.number} className="relative p-6 bg-card/60 border-border/60 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br text-white",
                        gradientPairs[i % gradientPairs.length]
                      )}>
                        <PageIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground/60 bg-muted/50 px-2.5 py-1 rounded-full">
                        Page {page.number}/6
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-base mb-3">{page.title}</h4>
                    <ul className="space-y-1.5">
                      {page.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )
              })}
            </div>
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.print()}
                className="h-12 px-8 text-base"
              >
                Download as PDF
              </Button>
            </div>
          </div>
        )}

        {!playbook && !generating && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            Join <span className="text-primary font-semibold">8,200+</span> creators using AlgoCheat AI to grow on LinkedIn
          </p>
        )}
      </div>
    </section>
  )
}
