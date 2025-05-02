import express from "express";
import Payroll from "../models/Payroll.js";

const router = express.Router();

// Fetch all employees
router.get("/", async (req, res) => {
  try {
    console.log("GET /employees route hit");
    const employees = await Payroll.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees." });
  }
});

// Fetch a specific employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Payroll.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ message: "Error fetching employee details." });
  }
});

// Save payroll data
router.post("/", async (req, res) => {
  try {
    const { name, hoursWorked, overtimeHours, payRate, sickPay } = req.body;

    const employee = await Employee.findOneAndUpdate(
      { name },
      { hoursWorked, overtimeHours, payRate, sickPay },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Payroll data saved successfully!", employee });
  } catch (error) {
    console.error("Error saving payroll data:", error);
    res.status(500).json({ message: "Error saving payroll data." });
  }
});

export default router;