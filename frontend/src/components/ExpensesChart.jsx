import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
export default function ExpensesChart({ data }) {
  const monthTotals = {};
  data.forEach(tx => {
    const m = new Date(tx.date).toLocaleString('default',{month:'short'});
    monthTotals[m] = (monthTotals[m]||0) + tx.amount;
  });
  const chartData = Object.entries(monthTotals).map(([month,total])=>({month,total}));

  return (
    <div style={{ width:'100%', height:300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}