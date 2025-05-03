import React, { useState, useEffect } from "react";
import axios from "axios";
import "../utils/AdminPayroll.css"; // Assuming you have a CSS file for styling

const AdminPayroll = () => {
  const [employees, setEmployees] = useState([]); // List of employees for the dropdown
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(""); // Selected employee ID
  const [employeeData, setEmployeeData] = useState({
    name: "",
    hoursWorked: 0,
    overtimeHours: 0,
    payRate: 0,
    sickPay: 0,
  });
  const [payroll, setPayroll] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch employees from the backend when the component loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/employees");
        setEmployees(response.data); // Assuming the backend returns an array of employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle dropdown selection and fetch employee details
  const handleEmployeeSelect = async (e) => {
    const employeeId = e.target.value;
    setSelectedEmployeeId(employeeId);

    if (employeeId) {
      try {
        const response = await axios.get(`http://localhost:5001/api/employees/${employeeId}`);
        setEmployeeData(response.data); // Populate input fields with employee data
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    } else {
      setEmployeeData({
        name: "",
        hoursWorked: 0,
        overtimeHours: 0,
        payRate: 0,
        sickPay: 0,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const calculatePayroll = () => {
    const { hoursWorked, overtimeHours, payRate, sickPay } = employeeData;
    const regularPay = hoursWorked * payRate;
    const overtimePay = overtimeHours * payRate * 1.5; // Overtime is 1.5x pay rate
    const totalPay = regularPay + overtimePay + parseFloat(sickPay || 0);

    setPayroll({
      regularPay,
      overtimePay,
      totalPay,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculatePayroll();

    try {
      await axios.post("http://localhost:5001/api/employees", employeeData);
      setMessage("Payroll data saved successfully!");
    } catch (error) {
      setMessage("Error saving payroll data. Please try again.");
    }
  };

  return (
    <div className="admin-payroll-container">
      <h2>Admin Payroll Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeSelect">Select Employee:</label>
          <select
            id="employeeSelect"
            value={selectedEmployeeId}
            onChange={handleEmployeeSelect}
          >
            <option value="">-- Select an Employee --</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Employee Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hoursWorked">Weekly Hours Worked:</label>
          <input
            type="number"
            id="hoursWorked"
            name="hoursWorked"
            value={employeeData.hoursWorked}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="overtimeHours">Overtime Hours:</label>
          <input
            type="number"
            id="overtimeHours"
            name="overtimeHours"
            value={employeeData.overtimeHours}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="payRate">Pay Rate ($/hour):</label>
          <input
            type="number"
            id="payRate"
            name="payRate"
            value={employeeData.payRate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sickPay">Sick Pay ($):</label>
          <input
            type="number"
            id="sickPay"
            name="sickPay"
            value={employeeData.sickPay}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Calculate and Save Payroll
        </button>
      </form>

      {payroll && (
        <div className="payroll-summary">
          <h3>Payroll Summary</h3>
          <p>Regular Pay: ${payroll.regularPay.toFixed(2)}</p>
          <p>Overtime Pay: ${payroll.overtimePay.toFixed(2)}</p>
          <p>Total Pay: ${payroll.totalPay.toFixed(2)}</p>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminPayroll;