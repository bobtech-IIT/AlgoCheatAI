import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Users, Brain } from "lucide-react";

const growthHacks = [
  {
    icon: Target,
    title: "Hyper-Targeted ABM Sequences",
    difficulty: "Advanced",
    impact: "High",
    description: "Create personalized video sequences for top 100 accounts with AI-generated insights",
    metrics: "347% increase in meeting bookings",
    steps: [
      "Identify high-value target accounts using intent data",
      "Create personalized video content for each decision maker",
      "Set up multi-touch sequences across LinkedIn and email",
      "Use AI to optimize timing and messaging"
    ]
  },
  {
    icon: Zap,
    title: "Algorithm Dwell-Time Hijacking",
    difficulty: "Intermediate",
    impact: "Very High",
    description: "Exploit LinkedIn's 2026 algorithm preferences for maximum organic reach",
    metrics: "412% increase in organic impressions",
    steps: [
      "Post during optimal engagement windows (7-9 AM, 12-2 PM)",
      "Use the '3-2-1 rule': 3 insights, 2 questions, 1 call-to-action",
      "Engage authentically within first 15 minutes of posting",
      "Leverage employee networks for initial engagement boost"
    ]
  },
  {
    icon: Users,
    title: "Community-Led Authority",
    difficulty: "Beginner",
    impact: "Medium",
    description: "Build micro-communities around specific industry problems",
    metrics: "89% lead qualification rate",
    steps: [
      "Identify niche industry problems your SaaS solves",
      "Create LinkedIn groups or Slack communities",
      "Share exclusive insights and tools",
      "Convert community members through value-first approach"
    ]
  },
  {
    icon: Brain,
    title: "AI-Powered Persona Alignment",
    difficulty: "Advanced",
    impact: "High",
    description: "Use AI to create hyper-personalized content for each prospect",
    metrics: "234% improvement in content engagement",
    steps: [
      "Collect prospect data from multiple touchpoints",
      "Use AI tools to analyze preferences and pain points",
      "Generate personalized content variations at scale",
      "A/B test different personalization levels"
    ]
  }
];

export const GrowthHacksList = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-4">Proven Algorithm Cheat Sheets (2026)</h3>
      
      {growthHacks.map((hack, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-all border-border/60 bg-card/40">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <hack.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h4 className="text-lg font-semibold">{hack.title}</h4>
                <Badge variant={hack.difficulty === 'Advanced' ? 'destructive' : hack.difficulty === 'Intermediate' ? 'default' : 'secondary'}>
                  {hack.difficulty}
                </Badge>
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                  {hack.impact} Impact
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{hack.description}</p>
              <div className="text-xs font-semibold text-primary">
                📊 Result: {hack.metrics}
              </div>
            </div>
          </div>
          
          <div className="bg-muted/10 rounded-lg p-4 border border-border/40">
            <h5 className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Implementation Steps:</h5>
            <ol className="space-y-1.5">
              {hack.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start gap-2.5 text-xs text-foreground/90">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                    {stepIndex + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Card>
      ))}
    </div>
  );
};
