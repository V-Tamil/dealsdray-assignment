const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const EmployeeSchema = new mongoose.Schema(
  {
    employeeId: { type: Number, default: 0 },
    image: { type: String, default: "" },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: Number, default: 0 },
    designation: { type: String, default: "" },
    gender: { type: String, default: "" },
    course: { type: String, default: "" },
  },
  { timestamps: true }
);

EmployeeSchema.plugin(AutoIncrement, {
  inc_field: "employeeId",
});

module.exports = mongoose.model("Employee", EmployeeSchema);
