
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Megaphone, Heart, Sparkles } from "lucide-react";

const brandingStrategies = [
  {
    icon: Palette,
    title: "Visual Identity 2.0",
    trend: "Hot",
    description: "Minimalist, data-driven visual branding that builds trust",
    tactics: [
      "Use consistent color psychology across all touchpoints",
      "Implement micro-animations for better user engagement",
      "Create branded data visualizations and infographics",
      "Develop platform-specific visual guidelines"
    ],
    impact: "73% increase in brand recognition"
  },
  {
    icon: Megaphone,
    title: "Thought Leadership Authority",
    trend: "Rising",
    description: "Position executives as industry experts through strategic content",
    tactics: [
      "Launch executive podcast series with industry leaders",
      "Publish original research and industry reports",
      "Guest speaking at major industry conferences",
      "Regular contributions to industry publications"
    ],
    impact: "156% increase in qualified lead quality"
  },
  {
    icon: Heart,
    title: "Community-Centric Branding",
    trend: "Emerging",
    description: "Build brand loyalty through authentic community engagement",
    tactics: [
      "Create user-generated content campaigns",
      "Host virtual and in-person community events",
      "Develop customer success story programs",
      "Launch brand ambassador initiatives"
    ],
    impact: "89% improvement in customer retention"
  },
  {
    icon: Sparkles,
    title: "AI-Enhanced Personalization",
    trend: "Future",
    description: "Use AI to deliver personalized brand experiences at scale",
    tactics: [
      "Dynamic website personalization based on visitor behavior",
      "AI-powered email content optimization",
      "Personalized product recommendations",
      "Predictive customer journey mapping"
    ],
    impact: "234% increase in conversion rates"
  }
];

export const BrandingStrategies = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {brandingStrategies.map((strategy, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <strategy.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{strategy.title}</h3>
            <Badge 
              variant={
                strategy.trend === 'Hot' ? 'destructive' :
                strategy.trend === 'Rising' ? 'default' :
                strategy.trend === 'Emerging' ? 'secondary' : 'outline'
              }
              className="ml-auto"
            >
              {strategy.trend}
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-4">{strategy.description}</p>
          
          <div className="space-y-2 mb-4">
            {strategy.tactics.map((tactic, tacticIndex) => (
              <div key={tacticIndex} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>{tactic}</span>
              </div>
            ))}
          </div>
          
          <div className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
            📈 {strategy.impact}
          </div>
        </Card>
      ))}
    </div>
  );
};
