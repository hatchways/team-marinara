/*
 * Displays prompt to authorise MailSender to access their gmail
 */

import React, { useEffect, useState } from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  withStyles,
  Button
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";

import googleSignInImg from "Assets/btnGoogleSignIn.png";
import { getAuthUrl } from "Utils/api";

const styles = {
  btn: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

const GmailDialog = props => {
  const { classes, endRoute } = props;
  const [gmailAuthUrl, setGmailAuthUrl] = useState("");
  // const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const authUrl = await getAuthUrl(encodeURIComponent(endRoute));
      if (authUrl) {
        setGmailAuthUrl(authUrl);
      } else {
        props.history.push("/login");
      }
    };
    getData();
  }, [endRoute, props.history]);

  const onClose = () => {
    props.history.push("/login");
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

export default withStyles(styles)(GmailDialog);
