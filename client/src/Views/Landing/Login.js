import React, { Component } from "react";
import { Grid, withStyles, Typography, TextField } from "@material-ui/core";

import styles from "Components/Form/LandingFormStyles";
import StyledButton from "Components/Button/StyledButton";
import GmailDialog from "./GmailDialog";
import { checkForGmailToken } from "./gmailAuth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    gmailDialogOpen: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClick = async (e) => {
    /*
     * TO DO: Get user ID from login process / local storage
     */
    const userId = "5e84b3101bd834092a28464f";
    const tokenExists = await checkForGmailToken(userId);

    /*
     *  Skip dialog
     *  TO DO: Goto user's home page instead of returning true
     */
    if (tokenExists) return true;

    // If the user hasn't authorised gmail access, launch dialog
    // to prompt them to do it
    this.setState({
      gmailDialogOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      gmailDialogOpen: false,
    });
  };

  render() {
    return (
      <span>
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
          <GmailDialog
            open={this.state.gmailDialogOpen}
            onClose={this.handleClose}
            endRoute="/login"
          />
        </Grid>
      </span>
    );
  }
}

export default withStyles(styles)(Login);
