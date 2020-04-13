import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles
} from "@material-ui/core";
import { EditorState, convertToRaw } from "draft-js";

import { addStepToCampaign } from "Utils/api";
import TextEditor from "Components/TextEditor/TextEditor";
import StepHeader from "Components/TextEditor/StepHeader";
import StepFooter from "Components/TextEditor/StepFooter";

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "'Open Sans', sans-serif"
  },
  // remove scrollbars
  dialogContent: {
    overflow: "hidden",
    height: "100%",
    padding: "1rem"
  },
  emailContainer: {
    margin: "1rem 2rem"
  }
}));

const Step = props => {
  const [type, setType] = useState("New Thread");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [saveSuccess, setSaveSuccess] = useState(null);
  const classes = useStyles();

  const handleClose = () => {
    props.history.push(props.match.params[0]);
  };

  const handleVariablesClick = () => {};

  const handleSave = async () => {
    try {
      await addStepToCampaign({
        campaignId: props.campaignId,
        type: type,
        subject: subject,
        editorState: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        )
      });

      setSaveSuccess(true);
    } catch (error) {
      setSaveSuccess(false);
    }
  };

  const errorDialogClose = () => {
    setSaveSuccess(null);
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      className={(classes.root, classes.dialog)}
    >
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid container className={classes.emailContainer}>
            <StepHeader
              handleClose={handleClose}
              type={type}
              setType={setType}
              subject={subject}
              setSubject={setSubject}
            />

            <Grid item xs={12}>
              <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
          </Grid>

          <StepFooter
            handleVariablesClick={handleVariablesClick}
            handleClose={handleClose}
            handleSave={handleSave}
          />
        </Grid>
      </DialogContent>

      {/* Success or Failure Dialog */}
      {saveSuccess !== null && (
        <Dialog
          open={true}
          onClose={errorDialogClose}
          maxWidth="md"
          className={(classes.root, classes.dialog)}
        >
          <DialogTitle>{saveSuccess ? "Success" : "Failed"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {saveSuccess ? "Step saved" : "Save failed. Please try again."}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default Step;
