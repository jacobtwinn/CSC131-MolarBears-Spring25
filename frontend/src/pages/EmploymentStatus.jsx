import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/CSS/EmploymentStatus.css";

const EmploymentStatus = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Fetch employees from the API
  const fetchEmployees = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5001/api/EmploymentStatus`, {
        params: { page, limit: 10 },
      });

      if (response.data && response.data.employees) {
        setEmployees(response.data.employees);
        setHasNextPage(response.data.hasNextPage);
        setError(null);
      } else {
        setEmployees([]);
        setHasNextPage(false);
        setError("No employees found.");
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setError("Failed to load employee data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromote = async (employee) => {
    const input = prompt(`Enter amount to increase salary for ${employee.name}:`, "1000");
    const amount = parseFloat(input);
  
    if (isNaN(amount) || amount <= 0) {
      alert("Invalid amount entered.");
      return;
    }
  
    const current = typeof employee.salary === "number" ? employee.salary : parseFloat(employee.salary);
    const newSalary = current + amount;
  
    try {
      await axios.put(`http://localhost:5001/api/EmploymentStatus/${employee._id}`, {
        name: employee.name,
        position: employee.position,
        salary: Number(newSalary)
      });
      fetchEmployees(currentPage); // refresh table
    } catch (err) {
      console.error("Promotion failed:", err);
      alert("Failed to update salary.");
    }
  };
  
  const handleDemote = async (employee) => {
    const input = prompt(`Enter amount to decrease salary for ${employee.name}:`, "1000");
    const amount = parseFloat(input);
  
    if (isNaN(amount) || amount <= 0) {
      alert("Invalid amount entered.");
      return;
    }
  
    const current = typeof employee.salary === "number" ? employee.salary : parseFloat(employee.salary);
    const newSalary = Math.max(0, current - amount);
  
    try {
      await axios.put(`http://localhost:5001/api/EmploymentStatus/${employee._id}`, {
        name: employee.name,
        position: employee.position,
        salary: Number(newSalary)
      });
      fetchEmployees(currentPage); // refresh table
    } catch (err) {
      console.error("Demotion failed:", err);
      alert("Failed to update salary.");
    }
  };

  const handleFire = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to fire ${employee.name}?`);
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5001/api/EmploymentStatus/${employee._id}`);
      fetchEmployees(currentPage); // refresh the table
    } catch (err) {
      console.error("Failed to fire employee:", err);
      alert("Failed to remove employee.");
    }
  };

  // Fetch employees whenever the page changes
  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  // Handle pagination
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Conditional rendering for loading and error states
  if (isLoading) {
    return <div className="loading">Loading employee data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="employee-table-container">
      <h1 className="employee-title">Employee Manager</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th className="employee-column">Employee</th>
            <th className="position-column">Position</th>
            <th className="salary-column">Salary</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.position}</td>
              <td>${Number(item.salary).toLocaleString()}</td>
              <td>
                <button
                  className="action-btn promote"
                  onClick={() => handlePromote(item)}
                >
                  Promote
                </button>
                <button
                  className="action-btn demote"
                  onClick={() => handleDemote(item)}
                >
                  Demote
                </button>
                <button
                  className="action-btn fire"
                  onClick={() => handleFire(item)}
                >
                 Fire
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
        <button
          className="pagination-btn next"
          onClick={handleNext}
          disabled={!hasNextPage}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default EmploymentStatus;