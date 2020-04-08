import React, { useState } from "react";
import {
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  makeStyles,
  FormControl,
  Select,
  TextField,
  MenuItem,
  Typography
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import TextEditor from "Components/TextEditor/TextEditor";
import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButton from "Components/Button/StyledButton";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "'Open Sans', sans-serif"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  // remove scrollbars
  dialogContent: {
    overflow: "hidden",
    height: "100%",
    padding: "3rem 1rem 1rem 1rem"
  },
  buttonBar: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
    margin: "1rem",
    borderRadius: 8
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
        <Grid border={1} container spacing={6}>
          <Grid border={1} container item xs={12}>
            <Grid item className={classes.stepName} xs={4}>
              <Typography variant="h4">Step 1</Typography>
            </Grid>
            <Grid item className={classes.editTemplate} xs={6}>
              <Typography>Edit Template</Typography>
            </Grid>
            <Grid
              item
              container
              xs={2}
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <IconButton onClick={handleClose}>
                <Clear />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container alignItems="flex-start" item xs={12}>
            <Grid item className={classes.type} xs={2}>
              <Typography>Type</Typography>
            </Grid>
            <Grid item className={classes.FormControl} xs={10}>
              <FormControl className={classes.formControl}>
                <Select
                  // labelId="type-select-label"
                  // id="type-select"
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <MenuItem value="New Thread">New Thread</MenuItem>
                  <MenuItem value="Follow-up">Follow-up</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={2}>
              <Typography>Subject</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField id="standard-basic" label="Enter subject" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextEditor />
          </Grid>
          <Grid container item className={classes.buttonBar} xs={12}>
            <Grid item xs={8}>
              <StyledButton>Templates</StyledButton>
              <StyledButton>Save as Template</StyledButton>
              <StyledButton>Variables</StyledButton>
            </Grid>
            <Grid item xs={4}>
              <StyledButtonOutline>Cancel</StyledButtonOutline>
              <StyledButtonOutline variant="contained" disableElevation>
                Save
              </StyledButtonOutline>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Step;
