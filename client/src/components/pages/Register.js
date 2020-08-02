import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// Components
import RegisterForm from "../functional/RegisterForm.js";

// REGISTER
// USE: display register page
// PROPS: n/a
const Register = () => {
  return (
    <div className="register">
      <RegisterForm/>
    </div>
  )
}

export default Register;
