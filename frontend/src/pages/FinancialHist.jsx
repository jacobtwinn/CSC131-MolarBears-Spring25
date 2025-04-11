import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/CSS/FinancialHist.css";

const FinancialPage = () => {
  console.log("Rendering FinancialPage"); // Debugging log
  const [financialData, setFinancialData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  console.log("Before useEffect"); // Debugging log

  useEffect(() => {
    console.log("Inside useEffect"); // Debugging log

    const fetchFinancialData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/FinancialHistory", {
          params: { page: currentPage },
        });
        setFinancialData(
          Array.isArray(response.data.transactions)
            ? response.data.transactions
            : [],
        );
        setTotalBalance(response.data.totalBalance || 0);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load financial data. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching financial data:", err);
      }
    };

    fetchFinancialData();
  }, [currentPage]);

  console.log("After useEffect"); // Debugging log

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDownload = (invoiceId) => {
    console.log(`Downloading invoice ${invoiceId}`);
  };

  const handlePayNow = () => {
    console.log("Processing payment");
  };

  // Conditional rendering logic after all Hooks
  if (isLoading) {
    return <div className="loading">Loading financial history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const pendingAmount = financialData
    .filter((item) => item.status.toLowerCase() === "pending")
    .reduce((total, item) => total + item.amount, 0)
    .toFixed(2);

  return (
    <div className="financial-history-container">
      <h1 className="financial-title">Financial History</h1>
      <div className="financial-table-container">
        <table className="financial-table">
          <thead>
            <tr>
              <th className="date-column">
                DATE <span className="sort-icon">↕</span>
              </th>
              <th className="service-column">SERVICE</th>
              <th className="amount-column">AMOUNT DUE</th>
              <th className="status-column">STATUS</th>
              <th className="download-column">DOWNLOAD INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((item) => (
              <tr key={item._id}>
                <td>{item.date}</td>
                <td>{item.service}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>
                  <label
                    className={`status-indicator ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </label>
                </td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => handleDownload(item._id)}
                  >
                    [Download]
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <button
          className="pagination-btn previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button className="pagination-btn next" onClick={handleNext}>
          Next →
        </button>
      </div>
      <div className="summary-container">
        <div className="balance-card">
          <div className="balance-title">TOTAL BALANCE DUE:</div>
          <div className="balance-amount">${pendingAmount}</div>
        </div>
        <button className="pay-now-btn" onClick={handlePayNow}>
          PAY NOW
        </button>
      </div>
    </div>
  );
};

export default FinancialPage;
