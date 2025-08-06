// src/components/BudgetList.jsx
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

export default function BudgetList({ budgets, onDelete }) {
  return (
    <div className="space-y-4">
      {budgets.map(b => (
        <Card key={b._id}>
          <CardContent className="flex justify-between">
            <div>
              <div className="font-semibold">{b.category}</div>
              <div className="text-sm">{b.month}</div>
            </div>
            <div className="text-lg font-bold">${b.amount.toFixed(2)}</div>
          </CardContent>
          <CardFooter className="flex justify-end">
           <Button
  variant="destructive"
  size="sm"
  onClick={() => {
    console.log("BudgetList: delete clicked for", b._id);
    onDelete(b._id);
  }}
>
  Delete
</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
