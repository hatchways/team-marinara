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

import { getTemplates, createTemplate } from "Utils/api";
import TextEditor from "Components/TextEditor/TextEditor";
import StepHeader from "Components/TextEditor/StepHeader";
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [saveSuccess, setSaveSuccess] = useState(null);
  const classes = useStyles();
  const [templates, setTemplates] = useState([]);
  const [recentlyFetched, setRecentlyFetched] = useState(false);


  useEffect( () => {
      

    const fetchTemplates = async () => {
        try {
            const res = await getTemplates();
            console.log(res);
            setTemplates(res.data);

        } catch (error) {
            console.log(error);
        }
    }
    fetchTemplates();
}, [recentlyFetched]);

  const handleClose = () => {
    props.setModalOpen(false);
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
        name: "Template 1",
        subject: subject,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      });
      console.log("here");
      // launches success dialog
      setSaveSuccess(true);
    } catch (error) {
      // Launches error dialog
      console.log(error);
      setSaveSuccess(false);
    }
  };

  const handleLoadTemplate = () => {
    let template = templates[0];
    console.log(template.content);
    const DBEditorState = convertFromRaw(JSON.parse(template.content));
    setEditorState(EditorState.createWithContent(DBEditorState));
    //EditorState.createWithContent(convertFromRaw(rawContent))
  }

  const errorDialogClose = () => {
    setSaveSuccess(null);
  };

  const onClose = () => {

  }

  return (
    <Modal open={props.open} onClose={onClose} className={classes.modal}>
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
