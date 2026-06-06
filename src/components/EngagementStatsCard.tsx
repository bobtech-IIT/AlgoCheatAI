
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface EngagementStatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down";
}

export const EngagementStatsCard = ({ title, value, description, trend }: EngagementStatsCardProps) => {
  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center mb-3">
        {trend === "up" ? (
          <TrendingUp className="w-6 h-6 text-green-500" />
        ) : (
          <TrendingDown className="w-6 h-6 text-green-500" />
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="text-3xl font-bold text-primary mb-1">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};
