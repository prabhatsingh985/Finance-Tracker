// src/components/CategoryChart.jsx
import { useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#8884d8','#82ca9d','#ffc658','#ff8042',
  '#8dd1e1','#a4de6c','#d0ed57','#d8854f'
];

export default function CategoryChart({ data }) {
  // 1) Group by category
  const grouped = data.reduce((acc, txn) => {
    const cat = txn.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + txn.amount;
    return acc;
  }, {});

  // 2) To array
  const chartData = Object.entries(grouped).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2))
  }));

  // 3) Debug logs
  useEffect(() => {
    console.log('[CategoryChart] raw data:', data);
    console.log('[CategoryChart] chartData:', chartData);
  }, [data]); 

  // 4) Early returns
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No transactions to display.</p>;
  }
  if (chartData.every(d => d.value === 0)) {
    return <p className="text-center text-gray-500">All transaction amounts are zero.</p>;
  }

  // 5) Fixed-height wrapper
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={val => `$${val}`} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
