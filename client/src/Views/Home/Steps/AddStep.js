import React, { useState } from "react";
import {
  IconButton,
  Button,
  Grid,
  Dialog,
  DialogContent,
  makeStyles,
  FormControl,
  Select,
  InputBase,
  MenuItem,
  Typography
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import TextEditor from "Components/TextEditor/TextEditor";
import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButtonTransparent from "Components/Button/StyledButtonTransparent";

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
    borderBottom: `1px solid ${colors.midGray}`
  },
  stepName: {
    fontWeight: "bold",
    borderRight: `1px solid ${colors.midGray}`
  },
  editTemplate: {
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
  },
  cancelBtn: {
    color: colors.gray,
    padding: "0.8rem 3rem",
    margin: "0.5rem"
  }
}));

const Step = props => {
  const [type, setType] = useState("New Thread");
  const classes = useStyles();

  const handleClose = () => {
    props.history.push(props.match.params[0]);
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
            <Grid
              container
              item
              xs={12}
              className={classes.header}
              alignItems="center"
              justifyContent="flex-start"
              direction="row"
            >
              <Grid item className={classes.stepName} xs={2}>
                <Typography variant="h4">Step 1</Typography>
              </Grid>
              <Grid item container className={classes.editTemplate} xs={8}>
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
                    <MenuItem value="Follow-up">Follow-up</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item className={classes.typeSubjectRows} xs={12}>
              <Grid item className={classes.typeSubjectTitles} xs={1}>
                <Typography>Subject</Typography>
              </Grid>
              <Grid item xs={10}>
                <InputBase id="subject" autoComplete="off" fullWidth={true} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextEditor />
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
              <Button className={classes.cancelBtn}>Cancel</Button>
              <StyledButtonOutline>Save</StyledButtonOutline>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Step;
