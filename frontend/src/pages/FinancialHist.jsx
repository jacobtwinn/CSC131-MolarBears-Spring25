// FinancialHist.jsx
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
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBalanceDue, setTotalBalanceDue] = useState(0);

  const [sortCriteria, setSortCriteria] = useState({
    field: 'date',
    order: 'desc'
  });

  const handleSort = (field, order) => {
    setSortCriteria({ field, order });
    const sortedData = [...financialData].sort((a, b) => {
      if (field === 'date') {
        const [monthA, dayA, yearA] = a.date.split('/');
        const [monthB, dayB, yearB] = b.date.split('/');
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (field === 'amount') {
        return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (field === 'service') {
        return order === 'asc' 
          ? a.service.localeCompare(b.service) 
          : b.service.localeCompare(a.service);
      }
      return 0;
    });
    setFinancialData(sortedData);
  };

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5001/api/FinancialHistory', {
          params: { page: currentPage },
        });
        
        console.log('API Response:', response.data); // Debug the response
        
        if (response.data && response.data.transactions) {
          const formattedData = response.data.transactions.map(item => ({
            ...item,
            date: new Date(item.date).toLocaleDateString(),
            amount: parseFloat(item.amount),
            status: item.status || 'Pending',
            service: item.service || 'Service'
          }));
          
          setFinancialData(formattedData);
          setTotalPages(response.data.totalPages || 1);
          setTotalBalanceDue(response.data.totalBalanceDue || 0);
          console.log("Total Pages:", response.data.totalPages || 1);
        }
        setTotalBalance(response.data.totalBalance || 0);
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to load financial data: ${err.message}`);
        setIsLoading(false);
        console.error('Error details:', err.response?.data || err.message);
      }
    };

    fetchFinancialData();
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDownload = (invoiceId) => {
    const downloadUrl = `http://localhost:5001/api/FinancialHistory/${invoiceId}/download`;
  window.open(downloadUrl, "_blank");
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


    const renderSortButtonMenu = () => (
      <div className="sort-menu-container">
        <button className="sort-button" onClick={() => setShowSortMenu(!showSortMenu)}>
          Sort Options ⏷
        </button>
        {showSortMenu && (
          <div className="sort-menu">
            <div onClick={() => { handleSort('date', 'asc'); setShowSortMenu(false); }}>Date ↑ (Oldest First)</div>
            <div onClick={() => { handleSort('date', 'desc'); setShowSortMenu(false);}}>Date ↓ (Newest First)</div>
            <div onClick={() => { handleSort('amount', 'asc'); setShowSortMenu(false);}}>Amount ↑ (Low to High)</div>
            <div onClick={() => { handleSort('amount', 'desc'); setShowSortMenu(false);}}>Amount ↓ (High to Low)</div>
          </div>
        )}
      </div>
    );

  return (
    
    <div className="financial-history-container">
      <title>Financial History</title>
      <h1 className="financial-title">Financial History</h1>
      <div className="financial-table-container">
      <div className="sort-section">
        {renderSortButtonMenu()}
      </div>
        <table className="financial-table">
          <thead>
            <tr>
              <th className="date-column">
                DATE <span className="sort-icon">↕</span>
              </th>
              <th className="service-column">SERVICE</th>
              <th className="amount-column">AMOUNT DUE</th>
              <th className="status-column">STATUS</th>
              <th className="download-column">DOWNLOAD NOTES</th>
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
                    Download PDF
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
        <button
          className="pagination-btn next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
      <div className="summary-container">
        <div className="balance-card">
          <div className="balance-title">TOTAL BALANCE DUE:</div>
          <div className="balance-amount">${totalBalanceDue.toFixed(2)}</div>
        </div>
        <button className="pay-now-btn" onClick={handlePayNow}>
          PAY NOW
        </button>
      </div>
    </div>
  );
};

export default FinancialPage;
