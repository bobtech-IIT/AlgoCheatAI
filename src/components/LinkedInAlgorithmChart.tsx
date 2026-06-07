import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { factor: 'Authentic Voice', '2025': 65, '2026': 98 },
  { factor: 'Dwell Time', '2025': 70, '2026': 95 },
  { factor: 'Conversation', '2025': 45, '2026': 90 },
  { factor: 'SEO Depth', '2025': 75, '2026': 88 },
  { factor: 'Carousel Load', '2025': 40, '2026': 92 },
  { factor: 'Links Penalty', '2025': 80, '2026': 97 },
];

export const LinkedInAlgorithmChart = () => {
  return (
    <div className="h-72 w-full max-w-md mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis
            dataKey="factor"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          />
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
            name="2026 AlgoCheat"
            dataKey="2026"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2.5}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
