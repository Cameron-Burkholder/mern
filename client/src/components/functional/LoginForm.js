import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

// LOGIN_FORM
// USE: allow user to login
// PROPS: login (function)
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    this.setState({
      errors: {}
    });
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(function(response) {
      return response.json();
    }).then(function(packet) {
      switch (packet.status) {
        case "INVALID_LOGIN":
          component.setState({
            errors: packet.errors
          });
          break;
        case "EMAIL_NOT_FOUND":
          alert("Email not found.");
          break;
        case "INCORRECT_PASSWORD":
          alert("Incorrect password.");
          break;
        case "VALID_LOGIN":
          component.props.login(packet.token);
          component.props.history.push("/");
          break;
      }
    });
  }
  render() {
    return (
      <form className="form" id="login-form" onSubmit={this.onSubmit}>
        <fieldset className="form-fieldset" id="email-field">
          <label className="form-label" htmlFor="email">Email</label>
          <input onChange={this.onChange} className={"form-input" + (this.state.errors.password1 == null ? "" : " input-error")} value={this.state.email} id="email" type="email"/>
          <span className="form-error">{this.state.errors.name}</span>
        </fieldset>
        <fieldset className="form-fieldset" id="password-field">
          <label className="form-label" htmlFor="password">Password</label>
          <input onChange={this.onChange} className={"form-input" + (this.state.errors.password1 == null ? "" : " input-error")} value={this.state.password} id="password" type="password"/>
          <span className="form-error">{this.state.errors.password}</span>
        </fieldset>
        <button className="form-button">Login</button>
      </form>
    )
  }
}

export default withRouter(LoginForm);
