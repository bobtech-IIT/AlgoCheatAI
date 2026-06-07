import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { strategy: 'Thought Leadership', leads: 892, conversion: 23 },
  { strategy: 'Account-Based Mkt', leads: 567, conversion: 31 },
  { strategy: 'Content Marketing', leads: 1245, conversion: 19 },
  { strategy: 'Webinar Series', leads: 678, conversion: 29 },
  { strategy: 'Email Nurturing', leads: 456, conversion: 36 },
  { strategy: 'Community Build', leads: 234, conversion: 42 },
];

export const LeadGenerationChart = () => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 70 }} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="strategy"
            tick={{ fontSize: 10 }}
            angle={-40}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis yAxisId="left" tick={{ fontSize: 10 }} width={40} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} width={35} unit="%" domain={[0, 60]} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value, name) => {
              if (name === 'leads') return [`${value}`, 'Total Leads'];
              if (name === 'conversion') return [`${value}%`, 'Conversion Rate'];
              return [value, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
          <Bar yAxisId="left" dataKey="leads" fill="hsl(var(--primary))" name="Total Leads" radius={[3,3,0,0]} />
          <Bar yAxisId="right" dataKey="conversion" fill="hsl(142, 76%, 36%)" name="Conversion Rate %" radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
