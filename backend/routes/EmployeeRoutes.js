import express from "express";
import { getDb, connectToServer } from "../config/db.js";
import { ObjectId } from "mongodb";

let EmployeeRoutes = express.Router();

// Get paginated employees
EmployeeRoutes.get('/EmploymentStatus', async (req, res) => {
    await connectToServer();
    const db = getDb();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Get the total number of documents
        const totalDocs = await db.collection("Employees").countDocuments();

        // Fetch paginated data
        const employees = await db.collection("Employees")
            .find({})
            .skip(skip)
            .limit(limit)
            .toArray();

        const hasNextPage = page * limit < totalDocs;

        res.json({
            employees,
            currentPage: page,
            hasNextPage,
        });

    } catch (err) {
        console.error("Failed to fetch visit history:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single employee by ID
EmployeeRoutes.get("/EmploymentStatus/:id", async (req, res) => {
  try {
    let db = getDb();
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    let data = await db.collection("Employees").findOne({ _id: ObjectId(id) });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    res.status(500).json({ message: "Server error while fetching employee" });
  }
});

// Create a new employee
EmployeeRoutes.post("/EmploymentStatus", async (req, res) => {
  try {
    const { name, position, salary } = req.body;

    if (!name || !position || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let db = getDb();
    let mongoObject = { name, position, salary };
    let data = await db.collection("Employees").insertOne(mongoObject);
    res.json(data);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ message: "Server error while creating employee" });
  }
});

// Update an employee
EmployeeRoutes.put("/EmploymentStatus/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    console.log("🛠 PUT /EmploymentStatus/:id called");
    console.log("➡️ ID:", id);
    console.log("➡️ Body:", req.body);

    const { name, position, salary } = req.body;
    const parsedSalary = Number(salary);

    if (!ObjectId.isValid(id)) {
      console.log("❌ Invalid ObjectId");
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (!name || !position || isNaN(parsedSalary)) {
      console.log("❌ Invalid input data:", { name, position, salary });
      return res.status(400).json({ message: "Invalid input data" });
    }

    const result = await db.collection("Employees").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, position, salary: parsedSalary } }
    );

    if (result.matchedCount === 0) {
      console.log("❌ No employee found with that ID");
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("✅ Employee updated successfully");
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("🔥 Error during update:", err); // FULL ERROR LOGGING
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete an employee
EmployeeRoutes.delete("/EmploymentStatus/:id", async (req, res) => {
  try {
    let db = getDb();
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    let data = await db.collection("Employees").deleteOne({ _id: ObjectId(id) });
    res.json(data);
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: "Server error while deleting employee" });
  }
});

export default EmployeeRoutes;