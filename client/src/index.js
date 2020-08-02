import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

// Presentational Components
import Navigation from "./components/presentational/Navigation.js";
import Footer from "./components/presentational/Footer.js";

// Functional Components

// Pages
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Logout from "./components/pages/Logout.js";
import Register from "./components/pages/Register.js";

// APP
// USE: manage routing and authentication
class App extends React.Component {
  constructor(props) {
    super(props);

    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.updateState = this.updateState.bind(this);

    const token = localStorage.getItem("token");
    this.state = {
      loggedIn: (token == null || token.length === 0 ? false : true),
      user: (token == null || token.length === 0 ? "" : localStorage.getItem("user"))
    }

  }
  loginUser(token) {
    const decodedJwt = jwtDecode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", decodedJwt.name);
    this.updateState();
  }
  logoutUser() {
    localStorage.clear();
    this.updateState();
  }
  updateState() {
    const token = localStorage.getItem("token");
    this.setState({
      loggedIn: (token == null || token.length === 0 ? false : true),
      user: (token == null || token.length === 0 ? "" : localStorage.getItem("user"))
    });
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedJwt = jwtDecode(token);
      if (decodedJwt.exp < Date.now()) {
        this.logoutUser();
      }
    }
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login">
              { this.state.loggedIn ? <Redirect to="/"/> : <Login login={this.loginUser}/> }
            </Route>
            <Route exact path="/logout">
              { this.state.loggedIn ? <Logout logout={this.logoutUser}/> : <Redirect to="/login"/> }
            </Route>
            <Route exact path="/register">
              { this.state.loggedIn ? <Redirect to="/"/> : <Register/> }
            </Route>
            <Route component={Error}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    )
  }
}

const wrapper = document.querySelector("#wrapper");
ReactDOM.render(<App/>, wrapper);
