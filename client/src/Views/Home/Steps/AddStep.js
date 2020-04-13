import React, { useState } from "react";
import {
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
  FormControl,
  Select,
  InputBase,
  MenuItem,
  Typography
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { EditorState, convertToRaw } from "draft-js";

import { addStepToCampaign } from "Utils/api";
import TextEditor from "Components/TextEditor/TextEditor";
import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButtonTransparent from "Components/Button/StyledButtonTransparent";
import StyledButtonText from "Components/Button/StyledButtonText";
import colors from "Components/Styles/Colors";

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
  },
  header: {
    paddingBottom: "1.5rem",
    borderBottom: `1px solid ${colors.midGray}`,
    alignItems: "center",
    justifyContent: "flex-start",
    direction: "row"
  },
  stepName: {
    fontWeight: "bold",
    borderRight: `1px solid ${colors.midGray}`
  },
  editTemplateText: {
    color: colors.darkGray,
    paddingLeft: "1rem"
  },
  typeSubjectRows: {
    alignItems: "center",
    padding: "0.5rem 0 0.5rem 0",
    borderBottom: `1px solid ${colors.midGray}`
  },
  typeSubjectTitles: {
    color: colors.darkGray
  },
  formControl: {
    minWidth: 120
  },
  buttonBar: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
    margin: "0.2rem",
    padding: "0rem",
    borderRadius: 5
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

  const errorDialogClose = () => {
    setSaveSuccess(null);
  };

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
            <Grid container item xs={12} className={classes.header}>
              <Grid item className={classes.stepName} xs={2}>
                <Typography variant="h4">Step 1</Typography>
              </Grid>
              <Grid item container className={classes.editTemplateText} xs={8}>
                <Typography variant="h6">Edit Template</Typography>
              </Grid>
              <Grid
                item
                container
                xs={2}
                alignItems="flex-start"
                justify="flex-end"
              >
                <IconButton onClick={handleClose}>
                  <Clear />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container item className={classes.typeSubjectRows} xs={12}>
              <Grid item className={classes.typeSubjectTitles} xs={1}>
                <Typography>Type</Typography>
              </Grid>
              <Grid item className={classes.FormControl} xs={10}>
                <FormControl className={classes.formControl}>
                  <Select
                    id="type"
                    value={type}
                    disableUnderline={true}
                    onChange={e => setType(e.target.value)}
                  >
                    <MenuItem value="New Thread">New Thread</MenuItem>
                    <MenuItem value="Follow-up">
                      Follow-up with previous thread
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item className={classes.typeSubjectRows} xs={12}>
              <Grid item className={classes.typeSubjectTitles} xs={1}>
                <Typography>Subject</Typography>
              </Grid>
              <Grid item xs={10}>
                <InputBase
                  id="subject"
                  autoComplete="off"
                  fullWidth={true}
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
          </Grid>

          <Grid container item className={classes.buttonBar} xs={12}>
            <Grid item xs={8}>
              <StyledButtonTransparent>Templates</StyledButtonTransparent>
              <StyledButtonTransparent>
                Save as Template
              </StyledButtonTransparent>
              <StyledButtonTransparent>Variables</StyledButtonTransparent>
            </Grid>
            <Grid item xs={4}>
              <StyledButtonText>Cancel</StyledButtonText>
              <StyledButtonOutline onClick={handleSave}>
                Save
              </StyledButtonOutline>
            </Grid>
          </Grid>
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
