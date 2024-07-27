import React from "react";
import Navbar from "../../components/navbar";
import "../../assets/employee.css";

function Employee(props) {
  return (
    <div className="employee-container">
      <Navbar />
      <h1 className="employee-title">
        {props.editPage ? " Employee Edit" : "Create Employee"}
      </h1>
      <form className="employee-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <select id="designation" name="designation" className="form-control">
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="form-control">
            <label>
              <input type="radio" name="gender" value="male" /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" /> Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Course</label>
          <div className="form-control">
            <label>
              <input type="checkbox" name="course" value="mca" defaultChecked />{" "}
              MCA
            </label>
            <label>
              <input type="checkbox" name="course" value="bca" /> BCA
            </label>
            <label>
              <input type="checkbox" name="course" value="bsc" /> BSC
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="file">Image Upload</label>
          <input type="file" id="file" name="file" className="form-control" />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Employee;
