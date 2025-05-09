import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  role: { 
    type: String,
    enum: ["patient", "employee", "admin"],
    default: "patient"
  },
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: Date, default: 0 },
  profilePicture: { type: String, default: "" },
});

UserSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
