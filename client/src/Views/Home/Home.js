import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";
import AuthUserContext from "Components/Session/AuthUserContext";

class Home extends Component {
  state = {};

  logOut = () => {
    this.context.setToken(null);
    this.context.setUserId(null);
  };

  render() {
    const user = this.context.user;
    return (
      <div>
        <Typography variant="h1" align="center">
          {this.context.userId
            ? `Home Page for ${user.firstName} ${user.lastName}`
            : "Access Denied"}
          <Grid item>
            <StyledButton onClick={this.logOut}>Log Out</StyledButton>
          </Grid>
        </Typography>
      </div>
    );
  }
}

Home.contextType = AuthUserContext;

export default Home;
