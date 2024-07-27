import React from "react";

function SignUp() {
  return (
    <div className="Login_App">
      <h1 className="title">Sign Up</h1>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="btn">Submit</button>
    </div>
  );
}

export default SignUp;
