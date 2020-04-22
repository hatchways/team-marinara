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

import { addStepToCampaign, editStepContent, createTemplate } from "Utils/api";
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

const emptyFieldMessage = "Subject and Body cannot be empty.";
const genericErrorMessage = "Save failed. Please try again.";
const duplicateTitle = "A template with this title already exists.";

const StepEditor = props => {
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [recentlyOpened, setRecentlyOpened] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSaveAsTemplate = async () => {
    try {
      if (subject && editorState.getCurrentContent().hasText()) {
        await createTemplate({
          name: subject,
          subject: subject,
          content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        });
        // launches success dialog
        setSaveSuccess(true);
      } else {
        displayErrorDialogue(emptyFieldMessage);
        setSaveSuccess(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage(duplicateTitle);
      }
      setSaveSuccess(false);
    }
  };

  const handleLoadTemplate = template => {
    if (template) {
      const rawContentState = convertFromRaw(JSON.parse(template.content));
      const editorState = EditorState.createWithContent(rawContentState);
      setEditorState(EditorState.moveSelectionToEnd(editorState));
      setSubject(template.subject);
    }
  };

  const errorDialogClose = () => {
    setSaveSuccess(null);
  };

  const displayErrorDialogue = message => {
    if (message) {
      setErrorMessage(message);
    } else {
      setErrorMessage(genericErrorMessage);
    }
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
            handleSaveAsTemplate={handleSaveAsTemplate}
            handleLoadTemplate={handleLoadTemplate}
            templates={props.templates}
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
              {saveSuccess ? "Template saved" : errorMessage}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default StepEditor;
