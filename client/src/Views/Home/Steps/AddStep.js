import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles
} from "@material-ui/core";
import { EditorState, convertToRaw, Modifier } from "draft-js";

import { addStepToCampaign } from "Utils/api";
import TextEditor from "Components/TextEditor/TextEditor";
import StepHeader from "Components/TextEditor/StepHeader";
import StepFooter from "Components/TextEditor/StepFooter";

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    justifyContent: "center"
  },
  // remove scrollbars
  dialogContent: {
    maxWidth: "900px",
    overflow: "hidden",
    height: "100%",
    padding: "1rem 0 0 0"
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
    // Removes '/step' from current url to go back to calling route
    props.history.push(props.match.params[0]);
  };

  const handleVariableValueClick = value => {
    let textToInsert;
    switch (value) {
      case "First name":
        textToInsert = "{{firstName}}";
        break;
      case "Last name":
        textToInsert = "{{lastName}}";
        break;
      default:
        console.log("Error matching variable");
        break;
    }
    const newEditorState = insertText(textToInsert);
    setEditorState(newEditorState);
  };

  // Inserts variables text into editor
  const insertText = textToInsert => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const newContentState = Modifier.insertText(
      contentState,
      selectionState,
      textToInsert
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    return newEditorState;
  };

  // Sends editor content to back-end
  const handleSave = async () => {
    try {
      await addStepToCampaign({
        campaignId: props.campaignId,
        type: type,
        subject: subject,
        editorState: convertToRaw(editorState.getCurrentContent())
      });

      // launches success dialog
      setSaveSuccess(true);
    } catch (error) {
      // Launches error dialog
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
      fullWidth={false}
      maxWidth="md"
      className={classes.root}
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
            handleVariableValueClick={handleVariableValueClick}
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
