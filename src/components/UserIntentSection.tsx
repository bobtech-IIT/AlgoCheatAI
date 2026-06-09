"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Target, Briefcase, Lightbulb } from "lucide-react"
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

export function UserIntentSection({ onPlaybookReady }: UserIntentSectionProps) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(id: string) {
    setSelected(id)
  }

  function handleGenerate() {
    if (!selected) return
    const intent = intents.find((i) => i.id === selected)
    if (!intent) return
    const data = { intent: intent.id, label: intent.title, timestamp: Date.now() }
    localStorage.setItem("user-intent", JSON.stringify(data))
    window.dispatchEvent(new CustomEvent("user-intent-selected", { detail: data }))
    onPlaybookReady?.()
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-4xl mx-auto">
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
            disabled={!selected}
            onClick={handleGenerate}
            className="h-12 px-10 text-base bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Generate My Playbook
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Join <span className="text-primary font-semibold">8,200+</span> creators using AlgoCheat AI to grow on LinkedIn
        </p>
      </div>
    </section>
  )
}
