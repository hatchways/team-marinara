import React from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  withStyles,
  Button,
} from "@material-ui/core";

import googleSignInImg from "Assets/btnGoogleSignIn.png";

const styles = () => ({
  btn: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const GmailDialog = (props) => {
  const { onClose, open, classes } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">
        Connect a Gmail Account
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Connect a gmail account to access all of MailSender's features.
        </DialogContentText>
        <a href="">
          <img
            className={classes.btn}
            src={googleSignInImg}
            alt="Google Sign In"
          />
        </a>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Skip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(GmailDialog);
