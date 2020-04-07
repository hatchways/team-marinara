import React, { useState } from "react";
import MUIRichTextEditor from "mui-rte";
import {
  Grid,
  Dialog,
  DialogContentText,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButton from "Components/Button/StyledButton";

const useStyles = makeStyles({
  root: {
    "font-family": "Open Sans"
  },
  formControl: {}
});

const TextEditor = props => {
  const [displayModal, setDisplayModal] = useState(true);
  const [type, setType] = React.useState("");
  const classes = useStyles();

  const handleClose = () => {
    props.history.push(props.match.params[0]);
  };

  return (
    <Dialog
      open={displayModal}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
    >
      <Grid container spacing={4}>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <DialogContentText>Name</DialogContentText>
          </Grid>
          <Grid item xs={6}>
            <DialogContentText>Edit Template</DialogContentText>
          </Grid>
          <Grid item xs={2}>
            X
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            <DialogContentText>Type</DialogContentText>
          </Grid>
          <Grid item xs={10}>
            <FormControl className={classes.formControl}>
              <InputLabel id="type-select-label">Step Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                <MenuItem>New Thread</MenuItem>
                <MenuItem>Follow-up</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            <DialogContentText>Subject</DialogContentText>
          </Grid>
          <Grid item xs={10}>
            Subject dropdown
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MUIRichTextEditor />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <StyledButtonOutline>Templates</StyledButtonOutline>
            <StyledButtonOutline>Save as Template</StyledButtonOutline>
            <StyledButtonOutline>Variables</StyledButtonOutline>
          </Grid>
          <Grid item xs={4}>
            <StyledButton>Cancel</StyledButton>
            <StyledButton>Save</StyledButton>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default TextEditor;
