"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserPlus, Target, Briefcase, Lightbulb, Mic, Zap, Layout, MessageCircle,
  Calendar, TrendingUp, PenTool, Award, Users, Share2, BarChart3, Rocket,
  Star, BookOpen, Heart, CheckCircle, Volume2, PieChart, Target as TargetIcon,
  type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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

  const handlePrint = useCallback(async () => {
    if (!playbook) return
    const gradientMap: Record<number, [string, string]> = {
      0: ["#7c3aed", "#9333ea"],
      1: ["#059669", "#0d9488"],
      2: ["#d97706", "#ea580c"],
      3: ["#e11d48", "#db2777"],
      4: ["#2563eb", "#4f46e5"],
      5: ["#0891b2", "#0e7490"],
    }
    const buildSlide = (page: PlaybookPage, idx: number): HTMLDivElement => {
      const [c1, c2] = gradientMap[idx] ?? ["#7c3aed", "#9333ea"]
      const el = document.createElement("div")
      el.style.cssText = `position:fixed;top:0;left:0;z-index:9999;width:1080px;height:1440px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 60px;box-sizing:border-box;background:linear-gradient(135deg,${c1},${c2});color:#fff;font-family:system-ui,sans-serif`
      el.innerHTML = `
<div style="text-align:center;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px">
  <div style="width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:800">${page.number}</div>
  <h2 style="font-size:44px;font-weight:700;line-height:1.2;margin:0;text-align:center">${page.title}</h2>
  <ul style="list-style:none;padding:0;margin:16px 0 0;text-align:left;width:100%">
    ${page.bullets.map(b => `<li style="font-size:24px;line-height:1.6;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;gap:12px"><span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.6);flex-shrink:0"></span>${b}</li>`).join("")}
  </ul>
</div>
<div style="position:absolute;bottom:24px;font-size:18px;opacity:0.6">AlgoCheat AI · Playbook ${page.number}/6</div>
`
      return el
    }
    const pdf = new jsPDF({ unit: "px", format: [1080, 1440], orientation: "portrait" })
    const slides = playbook.pages.map((p, i) => buildSlide(p, i))
    slides.forEach((s) => document.body.appendChild(s))
    await new Promise((r) => setTimeout(r, 100))
    for (let i = 0; i < slides.length; i++) {
      const canvas = await html2canvas(slides[i], { scale: 1, useCORS: true, logging: false, backgroundColor: null })
      const img = canvas.toDataURL("image/jpeg", 0.95)
      if (i > 0) pdf.addPage([1080, 1440])
      pdf.addImage(img, "JPEG", 0, 0, 1080, 1440)
      slides[i].remove()
    }
    pdf.save("algocheat-playbook.pdf")
  }, [playbook])

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
          <div id="playbook-section" className="mt-16">
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
                onClick={handlePrint}
                className="h-12 px-8 text-base"
              >
                Download Carousel PDF
              </Button>
            </div>
          </div>
        )}

        {!playbook && !generating && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            Writing eats <span className="text-primary font-semibold">2+ hours</span> of your day. AI productivity tools are trending <span className="text-primary font-semibold">+120%</span> — because your time is your only moat.
          </p>
        )}
      </div>
    </section>
  )
}
