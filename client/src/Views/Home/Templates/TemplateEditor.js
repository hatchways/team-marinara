import React, { useState, useEffect, useRef } from "react";
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

import { getTemplates, createTemplate } from "Utils/api";
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
  const classes = useStyles();

  const { templates, setTemplates } = props;

  Modal.onEnter = () => {
    console.log("check")
  }


  useEffect(  () => {
    
});

  const handleClose = () => {
    props.setModalOpen(false);
    setTitle("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
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
      const res = await createTemplate({
        name: title,
        subject: subject,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      });
      console.log("here");
      // launches success dialog
      setSaveSuccess(true);
      setEditorState(EditorState.createEmpty());
      setSubject("");
      setTitle("");
    } catch (error) {
      // Launches error dialog
      console.log(error);
      setSaveSuccess(false);
    }
  };

  const handleLoadTemplate = () => {
    let template = templates[0];
    setTitle(template.name);
    setSubject(template.subject);
    const DBEditorState = convertFromRaw(JSON.parse(template.content));
    setEditorState(EditorState.createWithContent(DBEditorState));
  }

  const errorDialogClose = () => {
    setSaveSuccess(null);
  };

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
            handleLoadTemplate={handleLoadTemplate}
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
    </Modal>
  );
};

export default TemplateEditor;
