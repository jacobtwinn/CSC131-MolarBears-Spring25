import React, { useState, useEffect} from 'react'
import axios from 'axios';
import '/src/CSS/FinancialHist.css';

const FinancialPage = () => {
    const [financialData, setFinancialData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalBalance, setTotalBalance] = useState(0);
  
    useEffect(() => {
      // Fetch financial data from your backend
      const fetchFinancialData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('/routes/financialHistory', {
            params: { page: currentPage }
          });
          setFinancialData(response.data.transactions || []);
          setTotalBalance(response.data.totalBalance || 0);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to load financial data. Please try again later.');
          setIsLoading(false);
          console.error('Error fetching financial data:', err);
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
      setCurrentPage(currentPage + 1);
    };
  
    const handleDownload = (invoiceId) => {
      // Implement your download logic here
      console.log(`Downloading invoice ${invoiceId}`);
      // Example: window.open(`/api/invoices/${invoiceId}/download`, '_blank');
    };
  
    const handlePayNow = () => {
      // Implement your payment logic here
      console.log('Processing payment');
      // Redirect to payment gateway or show payment modal
    };
  
    if (isLoading) {
      return <div className="loading">Loading financial history...</div>;
    }
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  

    const sampleData = [
      { id: 1, date: '27 Dec, 2025', service: 'Root Canal', amount: 900.00, status: 'Paid', invoiceId: '123' },
      { id: 2, date: '5 Dec, 2025', service: 'Teeth Cleaning', amount: 80.00, status: 'Pending', invoiceId: '124' },
      { id: 3, date: '7 Dec, 2025', service: 'Checkup', amount: 50.00, status: 'Paid', invoiceId: '125' },
      { id: 4, date: '21 Nov, 2024', service: 'Checkup', amount: 50.00, status: 'Paid', invoiceId: '126' },
      { id: 5, date: '19 Aug, 2024', service: 'Checkup', amount: 50.00, status: 'Paid', invoiceId: '127' },
      { id: 6, date: '4 July, 2024', service: 'Teeth Cleaning', amount: 80.00, status: 'Paid', invoiceId: '128' },
      { id: 7, date: '17 May, 2024', service: 'Cavity Filling', amount: 150.00, status: 'Paid', invoiceId: '129' },
      { id: 8, date: '4 April, 2024', service: 'Checkup', amount: 50.00, status: 'Paid', invoiceId: '130' },
    ];
  
    // Use sample data for development/preview, replace with actual data in production
    const displayData = financialData.length > 0 ? financialData : sampleData;
    const pendingAmount = displayData
      .filter(item => item.status === 'Pending')
      .reduce((total, item) => total + item.amount, 0)
      .toFixed(2);
  
    return (
      <div className="financial-history-container">
        <h1 className="financial-title">Financial History</h1>
        
        <div className="financial-table-container">
          <table className="financial-table">
            <thead>
              <tr>
                <th className="date-column">DATE <span className="sort-icon">↕</span></th>
                <th className="service-column">SERVICE</th>
                <th className="amount-column">AMOUNT DUE</th>
                <th className="status-column">STATUS</th>
                <th className="download-column">DOWNLOAD INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.service}</td>
                  <td>${item.amount.toFixed(2)}</td>
                  <td>
                    <label className={`status-indicator ${item.status.toLowerCase()}`}>
                      {item.status}
                    </label>
                  </td>
                  <td>
                    <button 
                      className="download-btn" 
                      onClick={() => handleDownload(item.invoiceId)}
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
          <button 
            className="pagination-btn next" 
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
  
        <div className="summary-container">
          <div className="balance-card">
            <div className="balance-title">
              TOTAL BALANCE DUE:
            </div>
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