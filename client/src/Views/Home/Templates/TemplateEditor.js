import React, { useState, useEffect } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
  Modal
} from "@material-ui/core";
import { EditorState, convertToRaw, Modifier, convertFromRaw } from "draft-js";

import {createTemplate, editTemplate } from "Utils/api";
import TextEditor from "Components/TextEditor/TextEditor";
import TemplateEditorHeader from "./TemplateEditorHeader";
import TemplateEditorFooter from "./TemplateEditorFooter";

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

const TemplateEditor = props => {
  const [type, setType] = useState("New Thread");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles();
  const emptyFieldMessage = "Title, Subject, and Body cannot be empty."
  const genericErrorMessage = "Save failed. Please try again.";
  const duplicateTitle = "A template with this title already exists."

  const { template, setRecentlyFetched, setModalOpen } = props;

  useEffect( () => {
    if(template){
      const loadTemplateForView = () => {
        try {
            const rawContentState = convertFromRaw(JSON.parse(template.content));
            setEditorState(EditorState.createWithContent(rawContentState));
            setSubject(template.subject);
            setTitle(template.name);
            setEditMode(true);
        } catch (error) {
            console.log(error);
        }
    }
    loadTemplateForView();
    }
    
},[template]);

  const handleClose = () => {
    setModalOpen(false);
    clearState();
  };

  const clearState = () => {
    setTitle("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
    setRecentlyFetched(false);
    setEditMode(false);
  }

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
    if(editMode){
      console.log("edit");
      //console.log(template);
    } else {
      console.log("save");
      //console.log(template);
    }
    try {
      if(title && subject && editorState.getCurrentContent().hasText()) {
        if(editMode) {
          console.log(template); 
          await editTemplate({
            name: title,
            subject: subject,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
          }, template._id)
        } else {
          await createTemplate({
            name: title,
            subject: subject,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
          });
        }
        // launches success dialog
        setSaveSuccess(true);
        clearState();
      } else {
        displayErrorDialogue(emptyFieldMessage);
        setSaveSuccess(false);
      }
      
    } catch (error) {
      // Launches error dialog
      //if(error.sta)
      console.log(error);
      if(error.response.status === 409) {
        setErrorMessage(duplicateTitle);
      }
      setSaveSuccess(false);
    }
  };
  const errorDialogClose = () => {
    setSaveSuccess(null);
  };

  const displayErrorDialogue = (message) => {
    if(message) {
      setErrorMessage(message);
    } else {
      setErrorMessage(genericErrorMessage);
    }
    
  }

  return (
    <Modal open={props.open} className={classes.modal}>
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
            <TemplateEditorHeader
              handleClose={handleClose}
              title={title}
              editMode={editMode}
              setTitle={setTitle}
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

          <TemplateEditorFooter
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
              {saveSuccess ? "Template saved" : errorMessage}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
    </Modal>
  );
};

export default TemplateEditor;
