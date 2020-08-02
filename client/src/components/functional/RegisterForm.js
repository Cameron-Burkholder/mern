import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

// LOGIN_FORM
// USE: allow user to register
// PROPS: n/a
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
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
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password1: this.state.password1,
        password2: this.state.password2
      })
    }).then(function(response) {
      return response.json();
    }).then(function(packet) {
      switch (packet.status) {
        case "INVALID_REGISTRATION":
          component.setState({
            errors: packet.errors
          });
          break;
        case "EXISTING_USER":
          alert("User already exists.");
          break;
        case "USER_REGISTERED":
          component.props.history.push("/login");
          break;
      }
    });
  }
  render() {
    return (
      <form className="form" id="register-form" onSubmit={this.onSubmit}>
        <fieldset className="form-fieldset" id="name-field">
          <label className="form-label" htmlFor="name">Name</label>
          <input onChange={this.onChange} className={"form-input" + (this.state.errors.name == null ? "" : " input-error")} value={this.state.name} id="name" type="text"/>
          <span className="form-error">{this.state.errors.name}</span>
        </fieldset>
        <fieldset className="form-fieldset" id="email-field">
          <label className="form-label" htmlFor="email">Email</label>
          <input onChange={this.onChange} className={"form-input" + (this.state.errors.email == null ? "" : " input-error")} value={this.state.email} id="email" type="email"/>
          <span className="form-error">{this.state.errors.email}</span>
        </fieldset>
        <fieldset className="form-fieldset" id="password1-field">
          <label className="form-label" htmlFor="password1">Password</label>
          <input onChange={this.onChange} className={"form-input" + (this.state.errors.password1 == null ? "" : " input-error")} value={this.state.password1} id="password1" type="password"/>
          <span className="form-error">{this.state.errors.password1}</span>
        </fieldset>
        <fieldset className="form-fieldset" id="password2-field">
          <label className="form-label" htmlFor="password2">Confirm Password</label>
          <input onChange={this.onChange} className={"form-input" + (this.state.errors.password2 == null ? "" : " input-error")} value={this.state.password2} id="password2" type="password"/>
          <span className="form-error">{this.state.errors.password2}</span>
        </fieldset>
        <button className="form-button">Register</button>
      </form>
    )
  }
}

export default withRouter(RegisterForm);
