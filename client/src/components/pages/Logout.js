import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

// USE: logout user
// PROPS: logout (function)
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.props.logout();
    this.props.history.push("/login");
  }
  render() {
    return (
      <div className="logout">

      </div>
    )
  }
}

export default withRouter(Logout);
