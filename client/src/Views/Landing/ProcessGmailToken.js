/*
 * Google authorisation process redirects here. Checks for success.
 * Sends authorisation code to back-end
 */

import React, { Component } from "react";
import {
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { postCode } from "./gmailAuth";

const styles = {
  // center the spinner
  spinner: {
    display: "block",
    margin: "auto",
  },
};

class ProcessToken extends Component {
  state = {
    displayModal: false,
    tokenSaved: false,
  };

  /*
   * When component mounts following redirect from Google authorisation
   * get the auth code from URL, post to back-end to exchange for token,
   * save to db and return authorised email address
   */
  async componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("error")) {
      this.setState({
        displayModal: true,
      });
      return;
    }

    const { tokenSaved, emailAddr } = await postCode(searchParams.get("code"));
    if (tokenSaved === true) {
      this.setState({
        displayModal: true,
        tokenSaved: true,
        emailAddr: emailAddr,
        endRoute: decodeURIComponent(searchParams.get("state")),
      });
    } else {
      this.setState({
        displayModal: true,
        tokenSaved: false,
        endRoute: decodeURIComponent(searchParams.get("state")),
      });
    }
  }

  handleClose = (e) => {
    /*
     * TO DO: Change routing to get destination from google redirect query
     */
    this.props.history.push(this.state.endRoute);
  };

  render() {
    const { classes } = this.props;
    return this.state.displayModal ? (
      <Dialog open={this.state.displayModal} onClose={this.handleClose}>
        <DialogTitle id="simple-dialog-title">
          {this.state.tokenSaved ? "Success" : "Failed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.tokenSaved
              ? `Connected Gmail account: ${this.state.emailAddr}`
              : "Gmail connection failed. Please try again"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    ) : (
      <CircularProgress className={classes.spinner} />
    );
  }
}

export default withRouter(withStyles(styles)(ProcessToken));
