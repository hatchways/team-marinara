import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  makeStyles,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
  Typography,
  lighten
} from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import colors from "Components/Styles/Colors";
import Step from "./Step";
import StepEditor from "./StepEditor";
import { sendStepEmails } from "Utils/api";
import AuthUserContext from "Components/Session/AuthUserContext";

const useStyles = makeStyles({
  root: {
    padding: "0 3rem",
    flexGrow: 1
  }
});

const AddStepButton = withStyles({
  root: {
    backgroundColor: "inherit"
  }
})(StyledButtonOutline);

const Steps = props => {
  const classes = useStyles();
  const socket = useContext(AuthUserContext).socket;
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [sendConfirmation, setSendConfirmation] = useState(false);
  const [sendEmailsObj, setSendEmailsObj] = useState({});
  const [sendingConfirmation, setSendingConfirmation] = useState(false);

  const handleClose = () => {
    setEditorOpen(false);
  };

  //If null is passed in, "Add Step" editor will open
  //Else, "Edit Email" editor will open
  const openEditor = step => {
    setSelectedStep(step);
    setEditorOpen(true);
  };

  const confirmSendEmails = (stepId, numOfEmails) => {
    setSendEmailsObj({ stepId: stepId, numOfEmails: numOfEmails });
    setSendConfirmation(true);
  };

  const handleSendEmails = async () => {
    await sendStepEmails(props.campaign._id, sendEmailsObj.stepId);
    setSendConfirmation(false);
    setSendingConfirmation(true);
  };

  const steps = [];

  for (let i = 0; i < props.steps.length; i++) {
    let prevStep;

    if (i === 0) {
      prevStep = props.campaign;
    } else {
      prevStep = props.steps[i - 1];
    }

    steps.push(
      <Step
        key={props.steps[i]._id}
        step={props.steps[i]}
        openEditor={openEditor}
        prevStep={prevStep}
        campaignId={props.campaign._id}
        triggerFetch={props.triggerFetch}
        handleSendEmails={confirmSendEmails}
      />
    );
  }

  const ConfirmSendEmails = () => (
    <Dialog
      open={sendConfirmation}
      onClose={() => setSendConfirmation(false)}
      maxWidth="md"
    >
      <DialogTitle>Send Emails?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`You are about to send ${sendEmailsObj.numOfEmails} emails.\n\n`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSendConfirmation(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSendEmails} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );

  const ConfirmEmailsSending = () => {
    const [sent, setSent] = useState(0);
    const [total, setTotal] = useState(0);

    const classes = makeStyles({
      paper: {
        width: "50rem"
      }
    })();

    useEffect(() => {
      if (socket) {
        socket.on("email sent", data => {
          setSent(data.sent);
          setTotal(data.total);
        });
      }
    });

    const handleClose = () => {
      props.triggerFetch();
      setSendingConfirmation(false);
    };

    const ProgressBar = withStyles({
      root: {
        height: "1rem",
        backgroundColor: lighten(colors.green, 0.5),
        borderRadius: 7,
        marginBottom: "0.5rem"
      },
      bar: {
        backgroundColor: colors.green,
        borderRadius: 7
      }
    })(LinearProgress);

    return (
      <Dialog open={sendingConfirmation} onClose={handleClose} maxWidth="md">
        <DialogContent className={classes.paper}>
          <ProgressBar variant="determinate" value={(sent / total) * 100} />
          <Typography>
            {`${sent}/${total} email${total > 1 ? "s" : ""} sent`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Grid item container direction="column" className={classes.root}>
      {steps}
      <Grid item>
        <AddStepButton onClick={() => openEditor(null)}>Add Step</AddStepButton>
      </Grid>
      <StepEditor
        open={editorOpen}
        onClose={handleClose}
        campaignId={props.campaign._id}
        step={selectedStep}
        triggerFetch={props.triggerFetch}
      />
      <ConfirmSendEmails />
      <ConfirmEmailsSending />
    </Grid>
  );
};

export default Steps;
