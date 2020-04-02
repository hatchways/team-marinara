import React, { Component } from "react";
import { Grid, withStyles, Typography, TextField } from "@material-ui/core";

import styles from "Components/Form/LandingFormStyles";
import StyledButton from "Components/Button/StyledButton";
import GmailDialog from "./GmailDialog";

class Login extends Component {
  state = {
    email: "",
    password: "",
    gmailDialogOpen: false,
    gmailAuthUrl: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClick = (e) => {
    /*
     * Get user ID from login process
     */
    const userId = "5e84b3101bd834092a28464f";
    this.checkForGmailToken(userId);
  };

  checkForGmailToken = async (userId) => {
    // CHANGE URL
    let response = await fetch(
      "http://localhost:3001/api/gmail-auth/checkToken"
    )
      .then((res) => {
        if (!res.ok)
          throw new Error(`Server responded with status ${res.status}`);
        return res;
      })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error occurred checking gmail token:", err);
        return { tokenExists: false };
      });

    // If the user hasn't authorised gmail access, prompt them to do it
    if (!response.tokenExists) {
      let authUrl = await this.getAuthUrl();
      if (authUrl) {
        this.setState({
          gmailDialogOpen: true,
          gmailAuthUrl: authUrl,
        });
      }
    }
  };

  getAuthUrl = async () => {
    let response = await fetch(
      "http://localhost:3001/api/gmail-auth/getAuthUrl"
    )
      .then((res) => {
        if (!res.ok)
          throw new Error(`Server responded with status ${res.status}`);
        return res;
      })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error occurred getting Google Auth URL:", err);
        return false;
      });

    return response.authUrl;
  };

  handleClose = () => {
    this.setState({
      gmailDialogOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Grid
          item
          container
          direction="column"
          alignContent="center"
          alignItems="center"
          spacing={7}
          className={this.props.classes.root}
        >
          <Grid item>
            <Typography className={this.props.classes.header}>Login</Typography>
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignContent="center"
            spacing={2}
          >
            <Grid item className={this.props.classes.input}>
              <TextField
                label="Your email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                onChange={this.onChange}
                value={this.state.email}
              />
            </Grid>
            <Grid item className={this.props.classes.input}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={this.onChange}
                value={this.state.password}
              />
            </Grid>
          </Grid>

          <Grid item>
            <StyledButton onClick={this.onClick}>Login</StyledButton>
          </Grid>
        </Grid>

        <GmailDialog
          open={this.state.gmailDialogOpen}
          onClose={this.handleClose}
          gmailAuthUrl={this.state.gmailAuthUrl}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
