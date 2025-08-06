import { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export default function BudgetComparisonChart({ txns, budgets, month }) {
  
     useEffect(() => {
    console.log("[BudgetComparisonChart] budgets:", budgets);
    console.log("[BudgetComparisonChart] month prop:", month);
  }, [budgets, month]);

  // 1. Filter budgets for the given month
  const monthBudgets = budgets.filter(b => b.month === month);

  // 2. Sum actuals by category for that same month
  const actualByCat = txns
    .filter(t => t.date.slice(0, 7) === month)   // assumes date is "YYYY-MM-DD"
    .reduce((acc, t) => {
      const cat = t.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + t.amount;
      return acc;
    }, {});

  // 3. Build chart data array
  const data = monthBudgets.map(b => ({
    category: b.category,
    Budget: Number(b.amount.toFixed(2)),
    Actual: Number((actualByCat[b.category] || 0).toFixed(2))
  }));

  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No budget data for {month}.
      </p>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }} className="mb-8">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={val => `$${val}`} />
          <Legend verticalAlign="top" />
          <Bar dataKey="Budget" barSize={20} />
          <Bar dataKey="Actual" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
