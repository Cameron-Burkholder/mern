import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// USE: navigation bar
class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      active: false
    };
  }
  // USE: toggle menu state for mobile
  toggleMenu() {
    this.setState({
      active: !this.state.active,
    });
  }
  render() {
    return (
      <nav className={"nav " + (this.state.active ? "nav--active" : "nav--inactive")}>
        <h3 className="nav__heading"></h3>
        <ul className="nav__body">
          <li className="nav__item">
            <Link onClick={this.toggleMenu} className="nav__link" to="/">Home</Link>
          </li>
        </ul>
        <a className="nav__button" onClick={this.toggleMenu}></a>
      </nav>
    );
  }
}

export default Navigation;
