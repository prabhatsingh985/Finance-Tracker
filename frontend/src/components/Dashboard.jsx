// src/components/Dashboard.jsx
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import CategoryChart from "./CategoryChart";

export default function Dashboard({ txns }) {
  // 1. Total expenses
  const total = txns.reduce((sum, t) => sum + t.amount, 0).toFixed(2);

  // 2. Aggregate by category
  const byCategory = txns.reduce((acc, t) => {
    const c = t.category || "Uncategorized";
    acc[c] = (acc[c] || 0) + t.amount;
    return acc;
  }, {});

  // 3. Five most recent
  const recent = txns.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Expenses */}
      <Card className="bg-white shadow rounded-lg">
        <CardHeader className="border-b bg-blue-50">
          <CardTitle className="text-blue-700">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-6">
          <span className="text-4xl font-bold text-gray-800">${total}</span>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-white shadow rounded-lg">
        <CardHeader className="border-b bg-green-50">
          <CardTitle className="text-green-700">By Category</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden h-64">
          <CategoryChart data={txns} />
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-white shadow rounded-lg">
        <CardHeader className="border-b bg-purple-50">
          <CardTitle className="text-purple-700">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="divide-y divide-gray-200">
            {recent.map((t) => (
              <li
                key={t._id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <div className="font-medium text-gray-800">{t.description}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="px-2 py-1">
                    ${t.amount.toFixed(2)}
                  </Badge>
                  <Badge variant="outline" className="px-2 py-1">
                    {t.category}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
