// backend/routes/financial.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get financial history with pagination
router.get('/financial-history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // items per page
    const skip = (page - 1) * limit;
    
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    
    // Calculate total pending balance
    const pendingTransactions = await Transaction.find({ status: 'Pending' });
    const totalBalance = pendingTransactions.reduce(
      (sum, transaction) => sum + transaction.amount, 0
    );
    
    res.json({
      transactions,
      totalBalance,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;