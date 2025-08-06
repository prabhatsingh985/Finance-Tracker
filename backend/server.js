// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const rawUri = process.env.MONGODB_URI;
if (!rawUri) {
  console.error('❌  MONGODB_URI is not defined in .env');
  process.exit(1);
}

console.log('→ Connecting to MongoDB using:', rawUri);

const client = new MongoClient(rawUri);

async function startServer() {
  try {
    await client.connect();
    console.log('✅  Connected to MongoDB');

    const app = express();
    app.use(cors());
    app.use(express.json());

    // ✅ Use the router directly — no db passing
    const transactionsRouter = require('./routes/transactions');
    app.use('/api/budgets', require('./routes/budgets'));
    // app.get('*', (req, res) => res.sendFile(...));
    app.use('/api/transactions', transactionsRouter);

    const port = process.env.PORT || 4000;
    app.listen(port, () =>
      console.log(`🚀  Server running on http://localhost:${port}`)
    );

  } catch (err) {
    console.error('❌  Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

startServer();
