const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    email: { type: String, default: "", unique: true },
    mobile: { type: Number, default: 0 },
    designation: { type: String, default: "" },
    gender: { type: String, default: "" },
    courses: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
