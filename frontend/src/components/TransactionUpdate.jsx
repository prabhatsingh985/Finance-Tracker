// src/components/TransactionUpdate.jsx
import { useState, useEffect } from 'react';
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

export default function TransactionUpdate({ txn, onSave, onCancel }) {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    description: '',
    category: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (txn) {
      setForm({
        amount: txn.amount.toString(),
        date: txn.date.slice(0, 10),
        description: txn.description,
        category: txn.category || ''
      });
    } else {
      setForm({ amount: '', date: '', description: '', category: '' });
    }
  }, [txn]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { amount, date, description, category } = form;
    if (!amount || !date || !description || !category) {
      setError('All fields are required.');
      return;
    }
    try {
      setError('');
      await onSave(txn._id, {
        amount: parseFloat(amount),
        date,
        description,
        category
      });
      setForm({ amount: '', date: '', description: '', category: '' });
    } catch (err) {
      setError(`Update failed: ${err.message}`);
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
          value={form.amount}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Date</p>
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Description</p>
        <Input
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">Category</p>
        <select
          name="category"
          value={form.category}
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

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
