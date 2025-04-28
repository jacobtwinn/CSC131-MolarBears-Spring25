import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/CSS/VisitHist.css';

const VisitsPage = () => {
  console.log('Rendering VisitsPage'); // Debugging log
  const [visitData, setVisitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [sortCriteria, setSortCriteria] = useState({
    field: 'date',
    order: 'desc'
  });

  const handleSort = (field, order) => {
    setSortCriteria({ field, order });
    const sortedData = [...visitData].sort((a, b) => {
      if (field === 'date') {
        const [yearA, monthA, dayA] = a.date.split('-');
        const [yearB, monthB, dayB] = b.date.split('-');
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
    setVisitData(sortedData);
  };

  useEffect(() => {
    console.log("Fetching page:", currentPage);

    const pageSize = 10;

    if (visitData.length < pageSize) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  
    const fetchVisitData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5001/api/VisitHistory', {
          params: { page: currentPage },
        });
  
        console.log("API Response:", response.data);
  
        if (response.data && Array.isArray(response.data.visits)) {
          const visits = response.data.visits; // ✅ declared here
  
          const formattedData = visits.map(item => ({
            ...item,
            date: item.date ? new Date(item.date).toISOString().slice(0, 10) : '1970-01-01',
            patient: item.patient || 'Patient',
            dentist: item.dentist || 'Dentist',
            service: item.service || 'Service',
          }));
  
          setVisitData(formattedData);
          setHasNextPage(response.data.hasNextPage); // ✅ avoid reference error
          setError(null);
        } else {
          setVisitData([]);
          setHasNextPage(false);
          setError('No visits found.');
        }
  
      } catch (err) {
        console.error('Error fetching visit data:', err);
        setError('Failed to load visit data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchVisitData();
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage && visitData.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDownload = (invoiceId) => {
    console.log(`Downloading invoice ${invoiceId}`);
  };

  // Conditional rendering logic after all Hooks
  if (isLoading) {
    return <div className="loading">Loading visit history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const renderSortButtonMenu = () => (
    <div className="sort-menu-container">
      <button className="sort-button" onClick={() => setShowSortMenu(!showSortMenu)}>
        Sort Options ⏷
      </button>
      {showSortMenu && (
        <div className="sort-menu">
          <div onClick={() => { handleSort('date', 'asc'); setShowSortMenu(false); }}>Date ↑ (Oldest First)</div>
          <div onClick={() => { handleSort('date', 'desc'); setShowSortMenu(false);}}>Date ↓ (Newest First)</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="visit-table-container">
      <h1 className="visit-title">Visit History</h1>
      <div className="sort-section">
        {renderSortButtonMenu()}
      </div>
      <table className="visit-table">
        <thead>
          <tr>
          <th className="date-column">DATE <span className="sort-icon">↕</span></th>
            <th className="patient-column">PATIENT</th>
            <th className="dentist-column">DENTIST</th>
            <th className="service-column">SERVICE</th>
            <th className="download-column">DOWNLOAD INVOICE</th>
          </tr>
        </thead>
        <tbody>
          { visitData.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.date).toISOString().substring(0, 10)}</td>
              <td>{item.patient}</td>
              <td>{item.dentist}</td>
              <td>{item.service}</td>
              <td>
                <button className="download-btn" onClick={() => handleDownload(item._id)}>
                  [Download]
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="pagination-btn previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button className="pagination-btn next" onClick={handleNext} disabled={!hasNextPage}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default VisitsPage;