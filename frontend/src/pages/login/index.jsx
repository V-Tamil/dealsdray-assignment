import React from "react";

function Login() {
  return (
    <div className="Login_App">
      <h1 className="title">LOGIN </h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="btn">Submit</button>
    </div>
  );
}

export default Login;
