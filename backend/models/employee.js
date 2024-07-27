const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    name: { type: String, default: "" },
    email: { type: String, default: "", },
    mobile: { type: Number, default: 0 },
    designation: { type: String, default: "" },
    gender: { type: String, default: "" },
    course: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);;
