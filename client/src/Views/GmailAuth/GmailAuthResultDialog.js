/*
 * Google authorisation process redirects here. Checks for success.
 * Sends authorisation code to back-end
 */

import React, { useState, useEffect, useContext } from "react";
import {
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  withStyles
} from "@material-ui/core";
import { postGmailAuthCode } from "Utils/api";
import AuthUserContext from "Components/Session/AuthUserContext";

const styles = {
  // center the spinner
  spinner: {
    display: "block",
    margin: "auto"
  }
};

const GmailAuthResultDialog = props => {
  const [displayModal, setDisplayModal] = useState(false);
  const [tokenSaved, setTokenSaved] = useState(false);
  const [emailAddr, setEmailAddr] = useState("");
  const context = useContext(AuthUserContext);
  const { classes } = props;

  // Putting useEffect in a callback with an empty
  // array passed, ensures useEffect only runs once on mount
  const useMountEffect = func => useEffect(func, []);

  /*
   * When component mounts following redirect from Google authorisation
   * get the auth code from URL, post to back-end to exchange for token,
   * save to db and return authorised email address
   */

  useMountEffect(() => {
    const postCode = async () => {
      if (!tokenSaved) {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("error")) {
          // Google process returned error
          // Show modal with 'Failed'
          setDisplayModal(true);
          return;
        }
        const redirectUrl = `${window.location.origin}${props.match.url}`;
        const { tokenSaved, emailAddr } = await postGmailAuthCode(
          searchParams.get("code"),
          redirectUrl,
          context.token
        );
        setDisplayModal(true);

        if (tokenSaved === true) {
          // Show modal with 'Success'
          setTokenSaved(true);
          setEmailAddr(emailAddr);
        }
      }
      // Else modal shows with 'Failure'
    };
    postCode();
  });

  const handleClose = e => {
    // Go to parent component on close
    props.history.push(props.match.params[0]);
  };

  return displayModal ? (
    <Dialog open={displayModal} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">
        {tokenSaved ? "Success" : "Failed"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {tokenSaved
            ? `Connected Gmail account: ${emailAddr}`
            : "Gmail connection failed. Please try again"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <CircularProgress className={classes.spinner} />
  );
};

export default withStyles(styles)(GmailAuthResultDialog);
