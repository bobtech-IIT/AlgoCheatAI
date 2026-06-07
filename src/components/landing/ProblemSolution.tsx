import { Card } from "@/components/ui/card";
import { XCircle, CheckCircle2 } from "lucide-react";

const problems = [
  { text: "You write a post. AI sounds robotic. LinkedIn's algo detects it. Reach = 0." },
  { text: "You spend 2 hours. Get 3 likes. 1 of them is your mum." },
  { text: "You copy a viral post style. Still invisible. Algorithm changed again." },
  { text: "You add hashtags everywhere. Zero impressions. Shadowbanned." },
  { text: "Competitors with worse ideas get 50k views. You don't know why." },
];

const solutions = [
  { text: "AlgoCheat scans 10 algorithm parameters — hook strength, dwell-time, penalties, and more." },
  { text: "It detects YOUR voice fingerprint. Rewrites the post. Same you. Better reach." },
  { text: "Calibrated to LinkedIn 2026 updates — what worked in 2024 is now penalized." },
  { text: "No login. No paywall. Runs 100% client-side. Your drafts never leave your browser." },
  { text: "Paste → Audit → Copy. 30 seconds. You look like a LinkedIn pro without becoming one." },
];

export function ProblemSolution() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The Real Problem</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            LinkedIn isn't hiding your posts.<br />
            <span className="text-gradient-mint">Your post is triggering the algorithm.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The 2026 LinkedIn algorithm actively penalizes generic AI content, broken hook structure, external links,
            and engagement bait. Most creators have no idea they're failing on 7 of 10 signals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 border-destructive/20 bg-destructive/5">
            <h3 className="font-semibold text-destructive flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5" /> Without AlgoCheat
            </h3>
            <ul className="space-y-3">
              {problems.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  {p.text}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 border-primary/20 bg-primary/5">
            <h3 className="font-semibold text-primary flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5" /> With AlgoCheat
            </h3>
            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {s.text}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
