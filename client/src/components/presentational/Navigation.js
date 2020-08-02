import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// NAVIGATION
// USE: navigation bar
// PROPS: loggedIn (Boolean)
class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      active: false,
      loggedIn: this.props.loggedIn
    };
  }
  // USE: toggle menu state for mobile
  toggleMenu() {
    this.setState({
      active: !this.state.active,
      loggedIn: this.props.loggedIn
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.setState({
        loggedIn: this.props.loggedIn
      });
    }
  }
  render() {
    return (
      <nav className={"nav " + (this.state.active ? "nav--active" : "nav--inactive")}>
        <h3 className="nav__heading"></h3>
        <ul className="nav__body">
          <li className="nav__item">
            <Link onClick={this.toggleMenu} className="nav__link" to="/">Home</Link>
          </li>
          {
            this.state.loggedIn ? (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/logout">Logout</Link>
              </li>
            ) : (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/login">Login</Link>
              </li>
            )
          }
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/register">Register</Link>
              </li>
            )
          }
        </ul>
        <a className="nav__button" onClick={this.toggleMenu}></a>
      </nav>
    );
  }
}

export default Navigation;
