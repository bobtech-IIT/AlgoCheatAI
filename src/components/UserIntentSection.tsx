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

    const slidesData = [
      { bg: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", accent: "#a78bfa" },
      { bg: "linear-gradient(135deg,#0d1717,#1a3a3a,#2d5a5a)", accent: "#5eead4" },
      { bg: "linear-gradient(135deg,#1a0e0e,#3d1a1a,#5c2a2a)", accent: "#fbbf24" },
      { bg: "linear-gradient(135deg,#1a0a2e,#2d1b69,#4a2d8a)", accent: "#f472b6" },
      { bg: "linear-gradient(135deg,#0c1929,#1a365d,#2a4f8a)", accent: "#60a5fa" },
      { bg: "linear-gradient(135deg,#0f1a1a,#1a3d3d,#2a5a5a)", accent: "#2dd4bf" },
    ]

    const formatBullets = (bullets: string[], accent: string): string =>
      bullets.map((b, i) => `
        <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:${i < bullets.length - 1 ? "14px" : "0"};padding:0 40px">
          <div style="width:10px;height:10px;border-radius:50%;background:${accent};flex-shrink:0;margin-top:8px"></div>
          <span style="font-size:28px;line-height:1.5;color:rgba(255,255,255,0.9);font-weight:400;letter-spacing:0.3px">${b}</span>
        </div>
      `).join("")

    const buildSlide = (page: PlaybookPage, idx: number): HTMLDivElement => {
      const data = slidesData[idx] ?? slidesData[0]
      const el = document.createElement("div")
      el.style.cssText = "position:fixed;top:0;left:0;z-index:9999;width:1080px;height:1440px;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,sans-serif"
      el.innerHTML = `
        <div style="width:100%;height:100%;background:${data.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:70px 80px;box-sizing:border-box;position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:6px;background:${data.accent};opacity:0.5"></div>
          <div style="position:absolute;top:28px;left:50%;transform:translateX(-50%);font-size:14px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:600">AlgoCheat AI</div>
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;width:100%;max-width:850px">
            <div style="width:130px;height:130px;border-radius:50%;background:${data.accent}22;display:flex;align-items:center;justify-content:center;margin-bottom:36px;position:relative">
              <div style="width:110px;height:110px;border-radius:50%;background:${data.accent}33;display:flex;align-items:center;justify-content:center">
                <div style="width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,${data.accent},rgba(255,255,255,0.3));display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px ${data.accent}44">
                  <span style="font-size:40px;font-weight:800;color:#fff">${page.number}</span>
                </div>
              </div>
            </div>
            <div style="text-align:center;margin-bottom:20px;width:100%">
              ${page.title.split(" ").map((word, wi, arr) =>
                `<span style="display:inline-block;font-size:48px;font-weight:700;color:#fff;letter-spacing:-0.5px;line-height:1.15;${wi < arr.length - 1 ? "margin-right:0.3em" : ""}">${word}</span>`
              ).join("")}
            </div>
            <div style="width:80px;height:2px;background:${data.accent};opacity:0.4;margin-bottom:32px;border-radius:2px"></div>
            <div style="width:100%">${formatBullets(page.bullets, data.accent)}</div>
          </div>
          <div style="position:absolute;bottom:32px;left:50%;transform:translateX(-50%);font-size:15px;letter-spacing:2px;color:rgba(255,255,255,0.3);font-weight:500">${page.number} / 6</div>
          <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${data.accent};opacity:0.3"></div>
        </div>
      `
      return el
    }

    const pdf = new jsPDF({ unit: "px", format: [1080, 1440], orientation: "portrait" })
    const slides = playbook.pages.map((p, i) => buildSlide(p, i))
    slides.forEach((s) => document.body.appendChild(s))
    await new Promise((r) => setTimeout(r, 500))
    for (let i = 0; i < slides.length; i++) {
      const canvas = await html2canvas(slides[i], { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" })
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
