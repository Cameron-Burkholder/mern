import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// Components
import LoginForm from "../functional/LoginForm.js";

// LOGIN
// USE: display login page
// PROPS: login (function);
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="login">
        <LoginForm login={this.props.login}/>
      </div>
    )
  }
}

export default Login;
