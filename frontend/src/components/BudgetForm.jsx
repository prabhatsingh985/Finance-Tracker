// src/components/BudgetForm.jsx
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const CATEGORIES = [
  'Food','Transport','Utilities','Entertainment','Other'
];

export default function BudgetForm({ onSave }) {
  const [form, setForm] = useState({
    category: '',
    month: '',       // format YYYY-MM
    amount: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  console.log("BudgetForm submit:", form);

  const { category, month, amount } = form;
  if (!category || !month || !amount) {
    setError('All fields required');
    return;
  }

  setError('');
  try {
    await onSave({ category, month, amount: parseFloat(amount) });
    console.log("BudgetForm: onSave resolved");
    setForm({ category: '', month: '', amount: '' });
  } catch (err) {
    console.error("BudgetForm: onSave error", err);
    setError(`Save failed: ${err.message}`);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="" disabled>Select category</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <Input
          name="month"
          type="month"
          value={form.month}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div>
        <Input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Budget amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <Button
   type="submit"
   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
 >
   Save Budget
 </Button>
    </form>
  );
}
