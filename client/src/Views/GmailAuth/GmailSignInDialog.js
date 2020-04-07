/*
 * Displays prompt to authorise MailSender to access their gmail
 */

import React, { useEffect, useState, useContext } from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  withStyles,
  Button
} from "@material-ui/core";

import googleSignInImg from "Assets/btnGoogleSignIn.png";
import { getAuthUrl } from "Utils/api";
import AuthUserContext from "Components/Session/AuthUserContext";
import requireAuth from "Components/Session/requireAuth";

const styles = {
  btn: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

const GmailDialog = props => {
  const { classes } = props;
  const [gmailAuthUrl, setGmailAuthUrl] = useState("");
  const context = useContext(AuthUserContext);

  useEffect(() => {
    const getData = async () => {
      // redirect to parent path + /email-auth-results-dialog
      // all redirect routes need to be added to: https://console.developers.google.com/apis/credentials?project=mail-sender-1
      const redirectUrl = `${window.location.origin}${props.match.params[0]}/email-auth-results-dialog`;
      const authUrl = await getAuthUrl(redirectUrl);

      if (authUrl) {
        setGmailAuthUrl(authUrl);
      } else {
        // Send to parent component if error
        props.history.push(props.match.params[0]);
      }
    };
    getData();
  }, [props, context]);

  const onClose = () => {
    // Clicking 'Skip' takes user to parent component
    props.history.push(props.match.params[0]);
  };

  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle id="simple-dialog-title">
        Connect a Gmail Account
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Connect a gmail account to access all of MailSender's features.
        </DialogContentText>
        <a href={`${gmailAuthUrl}`}>
          <img
            className={classes.btn}
            src={googleSignInImg}
            alt="Google Sign In"
          />
        </a>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Skip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(requireAuth(GmailDialog));
