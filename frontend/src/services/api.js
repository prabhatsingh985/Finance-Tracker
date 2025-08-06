// services/api.js
const BASE = 'https://finance-tracker-jsae.onrender.com/api';

export async function fetchTxns() {
  const res = await fetch(`${BASE}/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function fetchTxnById(id) {
  const res = await fetch(`${BASE}/transactions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch transaction');
  return res.json();
}

export async function addTxn(data) {
  const res = await fetch(`${BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to add transaction');
  return res.json();
}

export async function updateTxn(id, data) {
  const res = await fetch(`${BASE}/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const text = await res.text();                // read raw body
  console.log('PUT /transactions/' + id, res.status, text);

  if (!res.ok) {
    // include status & server message in the error
    throw new Error(`Status ${res.status} – ${text}`);
  }

  return JSON.parse(text);
}


export async function deleteTxn(id) {
  const res = await fetch(`${BASE}/transactions/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete transaction');
}


// at the bottom of services/api.js
export async function fetchBudgets() {
  const res = await fetch(`${BASE}/budgets`);
  if (!res.ok) throw new Error('Failed to fetch budgets');
  return res.json();
}

export async function upsertBudget(data) {
  const res = await fetch(`${BASE}/budgets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Save failed: ${res.status} ${errText}`);
  }

  // read raw text first
  const text = await res.text();
  if (!text) {
    // no body → return the data you sent (or an empty object)
    return data;
  }

  return JSON.parse(text);
}


export async function deleteBudget(id) {
  const res = await fetch(`${BASE}/budgets/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Delete failed: ${res.status} ${errText}`);
  }
  // no JSON to parse on 204, so just return
  return { success: true }; // or just return nothing
}

