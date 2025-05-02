import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hoursWorked: { type: Number, default: 0 },
  overtimeHours: { type: Number, default: 0 },
  payRate: { type: Number, required: true },
  sickPay: { type: Number, default: 0 },
});

const Payroll = mongoose.model("employees", employeeSchema);

export default Payroll;