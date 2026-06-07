import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', organic: 245, social: 89, email: 156 },
  { month: 'Mar', organic: 289, social: 134, email: 178 },
  { month: 'May', organic: 356, social: 187, email: 203 },
  { month: 'Jul', organic: 423, social: 245, email: 234 },
  { month: 'Sep', organic: 512, social: 298, email: 267 },
  { month: 'Nov', organic: 634, social: 367, email: 289 },
  { month: 'Jan+', organic: 789, social: 456, email: 312 },
];

export const GrowthMetricsChart = () => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={35} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="organic" stroke="hsl(var(--primary))" strokeWidth={3} name="Organic" dot={false} />
          <Line type="monotone" dataKey="social" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Social" dot={false} />
          <Line type="monotone" dataKey="email" stroke="hsl(262, 83%, 58%)" strokeWidth={2} name="Email" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
