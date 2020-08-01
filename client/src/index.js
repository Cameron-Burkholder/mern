import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";

// Components
import Navigation from "./components/Navigation.js";

// USE: manage routing and authentication
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation/>
          <Switch>
            <Route exact path="/">
              { this.state.status ? "" : <Home/> }
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
