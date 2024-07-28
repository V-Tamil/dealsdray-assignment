import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "../../assets/employee.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

function Employee(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "hr",
    gender: "male",
    courses: [],
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const user = new Cookies(null, { path: "/" }).get("user") || null;

  useEffect(() => {
    if (!user) navigate("/");
    if (props.editPage) {
      (async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/employee/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          setData(res.data.data);
        } catch (error) {
          alert("Something went wrong, Please try again");
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const errorsObj = {};

    if (!data.name) errorsObj.name = "Name is required";
    if (!data.email) {
      errorsObj.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errorsObj.email = "Email is invalid";
    }
    if (!data.mobile) {
      errorsObj.mobile = "Mobile number is required";
    } else if (data.mobile && !/^\d+$/.test(data.mobile)) {
      errorsObj.mobile = "Mobile number is invalid";
    }
    if (data.courses.length === 0) {
      errorsObj.courses = "At least one course must be selected";
    }

    setErrors(errorsObj);

    return Object.keys(errorsObj).length === 0;
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  function handleCheck(event) {
    const { name, value } = event.target;
    if (data[name].includes(value)) {
      const filtered = data[name].filter((v) => v !== value);
      setData({ ...data, [name]: filtered });
    } else {
      setData({ ...data, [name]: [...data[name], value] });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (!validate()) return;
      setIsLoading(true);

      if (props.editPage) {
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/employee/${params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/employee`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      navigate("/employee/list");
    } catch (error) {
      alert("Something went wrong, Please try again");
    }
    setIsLoading(false);
  }

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(image.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG and PNG formats are allowed",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: "" }));

    const form = new FormData();
    form.append("image", image);

    try {
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        form,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData({ ...data, image: response.data });
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Something went wrong, Please try again");
    }
  };

  return (
    <div className="employee-container">
      <Navbar />
      <h1 className="employee-title">
        {props.editPage ? "Edit Employee" : "Create Employee"}
      </h1>
      <form onSubmit={onSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="form-control"
          />
          {!!errors?.name && <div className="field_error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="form-control"
          />
          {!!errors?.email && <div className="field_error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
            className="form-control"
          />
          {!!errors?.mobile && (
            <div className="field_error">{errors.mobile}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <select
            onChange={handleChange}
            id="designation"
            name="designation"
            value={data.designation}
            className="form-control"
          >
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="form-control">
            <label>
              <input
                type="radio"
                onChange={handleChange}
                name="gender"
                checked={data.gender === "male"}
                value="male"
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                onChange={handleChange}
                name="gender"
                checked={data.gender === "female"}
                value="female"
              />{" "}
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Course</label>
          <div className="form-control">
            <label>
              <input
                type="checkbox"
                name="courses"
                value="MCA"
                checked={data.courses.includes("MCA")}
                onChange={handleCheck}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="BCA"
                checked={data.courses.includes("BCA")}
                onChange={handleCheck}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="BSC"
                checked={data.courses.includes("BSC")}
                onChange={handleCheck}
              />
              BSC
            </label>
          </div>
          {!!errors?.courses && (
            <div className="field_error">{errors.courses}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            className="form-control"
          />
          {!!errors?.image && <div className="field_error">{errors.image}</div>}
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            {isLoading ? "Loading..." : props.editPage ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Employee;
