import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButtonTransparent from "Components/Button/StyledButtonTransparent";
import StyledButtonText from "Components/Button/StyledButtonText";
import colors from "Components/Styles/Colors";

const useStyles = makeStyles(theme => ({
  buttonBar: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
    margin: "0.2rem",
    padding: "0rem",
    borderRadius: 5
  }
}));

const StepFooter = props => {
  const classes = useStyles();
  const { handleVariablesClick, handleClose, handleSave } = props;

  return (
    <Grid container item className={classes.buttonBar} xs={12}>
      <Grid item xs={8}>
        <StyledButtonTransparent>Templates</StyledButtonTransparent>
        <StyledButtonTransparent>Save as Template</StyledButtonTransparent>
        <StyledButtonTransparent onClick={handleVariablesClick}>
          Variables
        </StyledButtonTransparent>
      </Grid>
      <Grid item xs={4}>
        <StyledButtonText onClick={handleClose}>Cancel</StyledButtonText>
        <StyledButtonOutline onClick={handleSave}>Save</StyledButtonOutline>
      </Grid>
    </Grid>
  );
};

export default StepFooter;
