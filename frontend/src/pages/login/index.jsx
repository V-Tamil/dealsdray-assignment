import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="Login_container">
      <div className="Login_App">
        <h1 className="title">LOGIN </h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="sub_btn">Submit</button>
        <p className="login_signup">
          Don't have an account ?{" "}
          <Link to="./sign-up" className="login_link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
