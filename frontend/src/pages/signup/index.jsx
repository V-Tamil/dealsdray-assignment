import React from "react";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <>
      <div className="Login_container">
        <div className="Login_App">
          <h1 className="title">Sign Up</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="sub_btn ">Submit</button>
          <p className="login_signup">
            Already have an account ?
            <Link to="/" className="login_link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
