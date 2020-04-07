import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";
import AuthUserContext from "Components/Session/AuthUserContext";
import requireAuth from "Components/Session/requireAuth";
import { checkForGmailToken } from "Utils/api";

class Home extends Component {
  state = {};

  authorizeGmail = async () => {
    const gmailAuthorized = await checkForGmailToken();
    if (!gmailAuthorized) {
      this.props.history.push(`${this.props.match.url}/email-auth-dialog`);
    } else {
      alert("Account already authorized with Gmail");
    }
  };

  render() {
    const user = this.context.user;
    return (
      <div>
        <Typography variant="h1" align="center">
          Home Page for {user.firstName} {user.lastName}
          <Grid item>
            <StyledButton onClick={this.context.logOut}>Log Out</StyledButton>
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

export default requireAuth(Home);
