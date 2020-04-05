import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { AuthUserContext } from "Components/Session/AuthUserContext";

class Home extends Component {
  state = {};
  render() {
    const user = this.context.user;
    return (
      <div>
        <Typography variant="h1" align="center">
          {this.context.user
            ? `Home Page for ${user.firstName} ${user.lastName}`
            : "Access Denied"}
        </Typography>
      </div>
    );
  }
}

Home.contextType = AuthUserContext;

export default Home;
