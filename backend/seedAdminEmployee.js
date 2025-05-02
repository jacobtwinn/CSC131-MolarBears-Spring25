// seedAdminEmployee.js - Used to create a new admin/employee account in the database.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config({ path: "../.env" }); 

const createAccounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const usersToCreate = [
      {
        username: "admintest",
        password: "userName123!",
        role: "admin",
        firstName: "Alice",
        lastName: "Admin",
        email: "admin1@molarbears.com",
        gender: "Other",
        dob: new Date("1980-01-01"),
      },
      {
        username: "employeetest",
        password: "userName123!",
        role: "employee",
        firstName: "Elias",
        lastName: "Employee",
        email: "employee1@molarbears.com",
        gender: "Male",
        dob: new Date("1990-06-15"),
      }
    ];

    for (const user of usersToCreate) {
      const exists = await User.findOne({ username: user.username });
      if (exists) {
        console.log(`User '${user.username}' already exists. Skipping.`);
        continue;
      }

      const hashedPassword = bcrypt.hashSync(user.password, 10);
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
      console.log(`Created ${user.role}: ${user.username}`);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding users:", err);
    mongoose.disconnect();
  }
};

createAccounts();
