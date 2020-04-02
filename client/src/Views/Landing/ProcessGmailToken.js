import React, { Component } from "react";
import {
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { postCode } from "./gmailAuth";

class ProcessToken extends Component {
  state = {
    displayModal: false,
    tokenSaved: false,
  };

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
      });
    } else {
      this.setState({
        displayModal: true,
        tokenSaved: false,
      });
    }
  }

  handleClose = (e) => {
    /*
     * TO DO: Change routing to push to home page or route passed through props
     */
    this.props.history.push("/login");
  };

  render() {
    return this.state.displayModal ? (
      <Dialog open={this.state.displayModal} onClose={this.handleClose}>
        <DialogTitle id="simple-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Connected Gmail account: {this.state.emailAddr}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    ) : (
      <CircularProgress />
    );
  }
}

export default withRouter(ProcessToken);
