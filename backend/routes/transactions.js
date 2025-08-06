// routes/transaction.jsx
const express = require('express');
const { ObjectId } = require('mongodb');
const clientPromise = require('../lib/mongodb');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const db = (await clientPromise).db();
  const all = await db.collection('transactions')
    .find({})
    .sort({ date: -1 })
    .toArray();
  res.json(all);
});

// POST create
router.post('/', async (req, res) => {
  const { amount, date, description, category } = req.body;

  // Validate required fields
  if (
    amount === undefined ||
    !date ||
    !description ||
    !category
  ) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const db = (await clientPromise).db();
  const result = await db.collection('transactions').insertOne({
    amount: parseFloat(amount),
    date,
    description,
    category
  });

  const newTxn = {
    _id: result.insertedId,
    amount: parseFloat(amount),
    date,
    description,
    category
  };

  res.status(201).json(newTxn);
});

// PUT update
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const { amount, date, description, category } = req.body;
  if (
    amount === undefined ||
    !date ||
    !description ||
    !category
  ) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const db = (await clientPromise).db();
  await db.collection('transactions').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        amount: parseFloat(amount),
        date,
        description,
        category
      }
    }
  );

  const updated = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const db = (await clientPromise).db();
  await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
  res.sendStatus(204);
});

module.exports = router;
