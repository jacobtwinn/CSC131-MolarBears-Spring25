const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  service: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Paid', 'Pending'], 
    required: true 
  },
  invoiceUrl: { type: String }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);