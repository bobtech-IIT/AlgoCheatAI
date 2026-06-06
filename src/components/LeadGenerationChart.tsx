
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { strategy: 'LinkedIn Thought Leadership', leads: 892, conversion: 23.4, cost: 45 },
  { strategy: 'Account-Based Marketing', leads: 567, conversion: 31.2, cost: 89 },
  { strategy: 'Content Marketing', leads: 1245, conversion: 18.7, cost: 32 },
  { strategy: 'Webinar Series', leads: 678, conversion: 28.9, cost: 67 },
  { strategy: 'Email Nurturing', leads: 456, conversion: 35.6, cost: 23 },
  { strategy: 'Community Building', leads: 234, conversion: 42.1, cost: 15 },
];

export const LeadGenerationChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="strategy" 
            className="text-xs"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
            formatter={(value, name) => {
              if (name === 'leads') return [`${value} leads`, 'Total Leads'];
              if (name === 'conversion') return [`${value}%`, 'Conversion Rate'];
              if (name === 'cost') return [`$${value}`, 'Cost per Lead'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="leads" fill="hsl(var(--primary))" name="Total Leads" />
          <Bar dataKey="conversion" fill="hsl(142, 76%, 36%)" name="Conversion Rate %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
