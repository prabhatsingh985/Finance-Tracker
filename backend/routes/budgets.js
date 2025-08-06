// routes/budgets.js
const express = require('express');
const { ObjectId } = require('mongodb');
const clientPromise = require('../lib/mongodb');
const router = express.Router();

// GET all budgets
router.get('/', async (req, res) => {
  const db = (await clientPromise).db();
  const all = await db
    .collection('budgets')
    .find({})
    .sort({ month: -1 })
    .toArray();

  // Convert ObjectId → string
  const withStringIds = all.map(doc => ({
    ...doc,
    _id: doc._id.toString()
  }));
  res.json(withStringIds);
});


// POST create or upsert a budget
// routes/budgets.js
router.post('/', async (req, res) => {
  const { category, month, amount } = req.body;
  if (!category || !month || amount == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const db = (await clientPromise).db();
  const { value } = await db.collection('budgets').findOneAndUpdate(
    { category, month },
    { $set: { amount: parseFloat(amount) } },
    { upsert: true, returnDocument: 'after' }
  );
  // explicitly send a 201 + JSON
  res.status(201).json(value);
});


// DELETE a budget
// DELETE a budget
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  const db = (await clientPromise).db();
  const result = await db.collection('budgets').deleteOne({ _id: new ObjectId(id) });
  console.log("Server: deleteOne result", result);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'No budget found' });
  }
  res.sendStatus(204);
});


module.exports = router;
