import React, { useState, useEffect} from 'react'
import '/src/pageCSS/financialPage.css';

const FinancialPage = () => {
    // Dummy data mimicking the original image
    const [transactions, setTransactions] = useState([
      {
        date: '2025-12-27',
        service: 'Root Canal',
        amount: 900.00,
        status: 'Paid'
      },
      {
        date: '2025-12-27',
        service: 'Teeth Cleaning',
        amount: 80.00,
        status: 'Pending'
      },
      {
        date: '2025-12-27',
        service: 'Checkup',
        amount: 50.00,
        status: 'Paid'
      },
      {
        date: '2025-12-27',
        service: 'Checkup',
        amount: 50.00,
        status: 'Paid'
      },
      {
        date: '2025-12-27',
        service: 'Checkup',
        amount: 50.00,
        status: 'Paid'
      },
      {
        date: '2025-12-27',
        service: 'Teeth Cleaning',
        amount: 80.00,
        status: 'Paid'
      },
      {
        date: '2025-12-27',
        service: 'Cavity Filling',
        amount: 150.00,
        status: 'Paid'
      },
      {
        date: '2025-12-27',
        service: 'Checkup',
        amount: 50.00,
        status: 'Paid'
      }
    ]);
  
    // Calculate total balance due (only pending transactions)
    const totalBalanceDue = transactions
      .filter(transaction => transaction.status === 'Pending')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  
    const handlePayNow = () => {
      // Simulate payment by updating pending transactions to paid
      const updatedTransactions = transactions.map(transaction => 
        transaction.status === 'Pending' 
          ? { ...transaction, status: 'Paid' } 
          : transaction
      );
      
      setTransactions(updatedTransactions);
    };
  
    return (
      <div className="financial-history-container">
        <h2>Financial History</h2>
        <table className="financial-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Amount Due</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.service}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>
                  <span 
                    className={`status-badge ${
                      transaction.status.toLowerCase() === 'paid' ? 'paid' : 'pending'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="download-invoice-btn"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="total-balance-container">
          <div className="total-balance-card">
            <h3>TOTAL BALANCE DUE</h3>
            <p className="total-balance">${totalBalanceDue.toFixed(2)}</p>
          </div>
          <button 
            onClick={handlePayNow} 
            className="pay-now-btn"
            disabled={totalBalanceDue === 0}
          >
            PAY NOW
          </button>
        </div>
      </div>
    );
  };
export default FinancialPage;