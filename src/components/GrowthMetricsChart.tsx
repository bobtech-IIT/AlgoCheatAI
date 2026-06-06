
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan 2024', organic: 245, paid: 180, social: 89, email: 156 },
  { month: 'Mar 2024', organic: 289, paid: 195, social: 134, email: 178 },
  { month: 'May 2024', organic: 356, paid: 210, social: 187, email: 203 },
  { month: 'Jul 2024', organic: 423, paid: 225, social: 245, email: 234 },
  { month: 'Sep 2024', organic: 512, paid: 240, social: 298, email: 267 },
  { month: 'Nov 2024', organic: 634, paid: 255, social: 367, email: 289 },
  { month: 'Jan 2025', organic: 789, paid: 270, social: 456, email: 312 },
];

export const GrowthMetricsChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="organic" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            name="Organic Marketing"
          />
          <Line 
            type="monotone" 
            dataKey="social" 
            stroke="hsl(142, 76%, 36%)" 
            strokeWidth={2}
            name="Social Media"
          />
          <Line 
            type="monotone" 
            dataKey="email" 
            stroke="hsl(262, 83%, 58%)" 
            strokeWidth={2}
            name="Email Marketing"
          />
          <Line 
            type="monotone" 
            dataKey="paid" 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth={2}
            name="Paid Advertising"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
