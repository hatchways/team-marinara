import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";
import AuthUserContext from "Components/Session/AuthUserContext";
import withAuthorization from "Components/Session/withAuthorization";

class Home extends Component {
  state = {};

  logOut = () => {
    this.context.setToken(null);
    this.context.setUserId(null);
  };

  authorizeGmail = () => {
    this.props.history.push(`${this.props.match.url}/email-auth-dialog`);
  };

  render() {
    const user = this.context.user;
    return (
      <div>
        <Typography variant="h1" align="center">
          Home Page for {user.firstName} {user.lastName}
          <Grid item>
            <StyledButton onClick={this.logOut}>Log Out</StyledButton>
          </Grid>
          <Grid item>
            <StyledButton onClick={this.authorizeGmail}>
              Authorize Gmail
            </StyledButton>
          </Grid>
        </Typography>
      </div>
    );
  }
}

Home.contextType = AuthUserContext;

export default withAuthorization(Home);
