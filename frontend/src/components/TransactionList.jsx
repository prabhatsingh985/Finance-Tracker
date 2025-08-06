// src/components/TransactionList.jsx
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function TransactionList({ items, onDelete, onUpdate }) {
  return (
    <ul className="space-y-4">
      {items.map(txn => (
        <li key={txn._id}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Date */}
              <Badge variant="secondary" className="px-2 py-1">
                {new Date(txn.date).toLocaleDateString()}
              </Badge>

              {/* Amount */}
              <div className="text-lg font-semibold">
                ${txn.amount.toFixed(2)}
              </div>

              {/* Description */}
              <div className="flex-1 text-gray-700">
                {txn.description}
              </div>

              {/* Category */}
              <Badge variant="outline" className="px-2 py-1">
                {txn.category}
              </Badge>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              {/* <Button variant="secondary" size="sm" onClick={() => onUpdate(txn._id)}>
                Update
              </Button> */}
               <Button
               variant="secondary"
               size="sm"
               className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1 rounded transition"
               onClick={() => onUpdate(txn._id)}
             >
              Update
             </Button>
              {/* <Button variant="destructive" size="sm" onClick={() => onDelete(txn._id)}>
                Delete
              </Button> */}
               <Button
               variant="destructive"
               size="sm"
               className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded transition"
               onClick={() => onDelete(txn._id)}
             >
               Delete
             </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
