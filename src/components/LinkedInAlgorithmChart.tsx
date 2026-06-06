
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { factor: 'Authentic Personality', '2025': 65, '2026': 98 },
  { factor: 'Dwell Time stopping', '2025': 70, '2026': 95 },
  { factor: 'Conversation Triggers', '2025': 45, '2026': 90 },
  { factor: 'Keyword SEO Depth', '2025': 75, '2026': 88 },
  { factor: 'Document/Carousel Loads', '2025': 40, '2026': 92 },
  { factor: 'Outbound Links Penalty', '2025': 80, '2026': 97 },
];

export const LinkedInAlgorithmChart = () => {
  return (
    <div className="h-80 w-full max-w-lg mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis dataKey="factor" className="text-[10px] fill-muted-foreground" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="2025 Weight"
            dataKey="2025"
            stroke="hsl(var(--muted-foreground))"
            fill="hsl(var(--muted-foreground))"
            fillOpacity={0.05}
            strokeWidth={1.5}
          />
          <Radar
            name="2026 AlgoCheat Tuning"
            dataKey="2026"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.15}
            strokeWidth={2.5}
          />
          <Legend className="text-xs" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
