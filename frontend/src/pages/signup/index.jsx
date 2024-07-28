import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function signUp(event) {
    event.preventDefault();

    if (isLoading) return;

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    } else if (password.length < 8) {
      setError("password must be at least 8 characters");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/sign-up", {
        username: name,
        email,
        password,
      });
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);
      const cookies = new Cookies(null, { path: "/", expires: expirationDate });
      cookies.set("user", JSON.stringify(response.data.data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="Login_container">
        <form onSubmit={signUp} className="Login_App">
          <h1 className="title">Sign Up</h1>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="sub_btn">
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <div className="error_message">{error}</div>
          <p className="login_signup">
            Already have an account ?
            <Link to="/" className="login_link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
