// src/App.jsx
import { useState, useEffect } from 'react';
import BudgetForm from './components/BudgetForm';
import BudgetList from './components/BudgetList';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TransactionUpdate from './components/TransactionUpdate';
import ExpensesChart from './components/ExpensesChart';
import CategoryChart from './components/CategoryChart';
import Dashboard from './components/Dashboard';
import BudgetComparisonChart from './components/BudgetComparisonChart';
import {
  fetchTxns,
  addTxn,
  updateTxn,
  deleteTxn,
  fetchBudgets,
  upsertBudget,
  deleteBudget
} from './services/api';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0,7));
  const [txns, setTxns] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [editingTxn, setEditingTxn] = useState(null);

  useEffect(() => {
    fetchTxns().then(setTxns).catch(console.error);
    fetchBudgets().then(setBudgets).catch(console.error);
  }, []);

  // Transaction handlers...
  const handleAdd    = async data => {
    const newItem = await addTxn(data);
    setTxns(prev => [newItem, ...prev]);
  };
  const handleDelete = async id => {
    await deleteTxn(id);
    setTxns(prev => prev.filter(t => t._id !== id));
  };
  const handleUpdate = id => {
    const txn = txns.find(t => t._id === id);
    if (txn) setEditingTxn(txn);
  };
  const handleSave   = async (id, updatedData) => {
    const updated = await updateTxn(id, updatedData);
    setTxns(prev => prev.map(t => (t._id === id ? updated : t)));
    setEditingTxn(null);
  };
  const handleCancel = () => setEditingTxn(null);

  // Budget handlers...
  const handleSaveBudget = async data => {
    const saved = await upsertBudget(data);
    setBudgets(bs => {
      const idx = bs.findIndex(b => b._id === saved._id);
      if (idx > -1) {
        bs[idx] = saved;
        return [...bs];
      }
      return [saved, ...bs];
    });
  };
  const handleDeleteBudget = async id => {
    await deleteBudget(id);
    setBudgets(bs => bs.filter(b => b._id !== id));
  };

  // If dashboard mode, render only Dashboard + Back button
  if (showDashboard) {
    return (
      <div className="container mx-auto p-4">
        <button
          className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setShowDashboard(false)}
        >
          ← Back
        </button>
        <Dashboard txns={txns} />
      </div>
    );
  }

  // Otherwise render the full app
  return (
    <div className="container mx-auto p-4">
   {/* HEADER BAR */}
   <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl font-bold">Finance Tracker</h1>
     <button
       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
       onClick={() => setShowDashboard(true)}
     >
       Show Dashboard
     </button>
   </div>
           

     {/* Transactions */}
      <TransactionForm onAdd={handleAdd} />
      <h2 className="text-xl mt-8 mb-2">Transactions</h2>
      <TransactionList
        items={txns}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {/* Edit Transaction Modal */}
      {editingTxn && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
     <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-60">
            <h3 className="text-lg font-semibold mb-4">Update Transaction</h3>
            <TransactionUpdate
              txn={editingTxn}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {/* Charts */}
      <h2 className="text-xl mt-8 mb-2">Monthly Expenses</h2>
      <ExpensesChart data={txns} />

      <h2 className="text-xl mt-8 mb-2">Expenses by Category</h2>
      <CategoryChart data={txns} />


      {/* Budget vs Actual */}
      <div className="mt-8 mb-4 flex items-center space-x-2">
        <label htmlFor="compare-month" className="font-medium">
          Compare Month:
        </label>
        <input
          id="compare-month"
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <h2 className="text-xl mb-2">Budget vs Actual ({selectedMonth})</h2>
      <BudgetComparisonChart
        txns={txns}
        budgets={budgets}
        month={selectedMonth}
      />

      {/* Monthly Budgets */}
      <h2 className="text-xl mt-8 mb-2">Monthly Budgets</h2>
      <BudgetForm onSave={handleSaveBudget} />
      <BudgetList budgets={budgets} onDelete={handleDeleteBudget} />

      
    </div>
  );
}

export default App;
