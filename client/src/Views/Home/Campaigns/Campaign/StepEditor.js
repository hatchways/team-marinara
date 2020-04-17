import React, { useState, useEffect } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles
} from "@material-ui/core";
import { EditorState, convertToRaw, Modifier, convertFromRaw } from "draft-js";

import { addStepToCampaign, editStepContent } from "Utils/api";
import TextEditor from "Components/TextEditor/TextEditor";
import StepHeader from "Components/TextEditor/StepHeader";
import StepFooter from "Components/TextEditor/StepFooter";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    justifyContent: "center"
  },
  // remove scrollbars
  dialogContent: {
    maxWidth: "900px",
    overflow: "hidden",
    height: "100%",
    padding: "1rem"
  },
  emailContainer: {
    margin: "1rem 2rem"
  }
});

const StepEditor = props => {
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [recentlyOpened, setRecentlyOpened] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (recentlyOpened) {
      if (!props.step) {
        setSubject("");
        setEditorState(EditorState.createEmpty());
      } else {
        setSubject(props.step.subject);
        const content = EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.step.content))
        );
        setEditorState(EditorState.moveSelectionToEnd(content));
      }
      setRecentlyOpened(false);
    }
  }, [subject, editorState, recentlyOpened, props.step]);

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
      let stepId;

      //Create a new step if no existing step was provided
      if (!props.step) {
        const res = await addStepToCampaign(props.campaignId, subject);
        stepId = res.data._id;
      } else {
        stepId = props.step._id;
      }

      await editStepContent(props.campaignId, stepId, {
        subject,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      });

      props.triggerFetch();
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
      open={props.open}
      onClose={props.onClose}
      onEnter={() => setRecentlyOpened(true)}
      fullWidth={false}
      maxWidth="md"
      className={classes.root}
    >
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid container className={classes.emailContainer}>
            <StepHeader
              step={props.step}
              handleClose={props.onClose}
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
            handleClose={props.onClose}
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

export default StepEditor;
