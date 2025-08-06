// src/components/TransactionForm.jsx
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert } from './ui/alert';

const CATEGORIES = [
  { value: '', label: 'Select category' },
  { value: 'Food', label: 'Food' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' },
];

export default function TransactionForm({ onAdd }) {
  const [data, setData] = useState({
    amount: '',
    date: '',
    description: '',
    category: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { amount, date, description, category } = data;
    if (!amount || !date || !description || !category) {
      setError('All fields are required');
      return;
    }
    try {
      setError('');
      await onAdd({ 
        ...data, 
        amount: parseFloat(amount) 
      });
      setData({ amount: '', date: '', description: '', category: '' });
    } catch (err) {
      setError(`Failed to add transaction: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert variant="destructive">{error}</Alert>}

      <div>
        <p className="mb-1 font-medium">Amount</p>
        <Input
          name="amount"
          type="number"
          step="0.01"
          value={data.amount}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Date</p>
        <Input
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Description</p>
        <Input
          name="description"
          type="text"
          value={data.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Category</p>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          {CATEGORIES.map(c => (
            <option key={c.value} value={c.value} disabled={!c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* <Button type="submit">Add Transaction</Button> */}
      <Button
   type="submit"
   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition"
 >
   Add Transaction
 </Button>
    </form>
  );
}
