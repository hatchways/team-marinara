import React, { useState } from "react";
import { Grid, makeStyles, Popover, List } from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButtonTransparent from "Components/Button/StyledButtonTransparent";
import StyledButtonText from "Components/Button/StyledButtonText";
import ListItemBtn from "Components/TextEditor/ListItemBtn";
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
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const { handleClose, handleSave } = props;

  const handleVariablesBtnClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = event => {};

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid container item className={classes.buttonBar} xs={12}>
      <Grid item xs={8}>
        <StyledButtonTransparent>Templates</StyledButtonTransparent>
        <StyledButtonTransparent>Save as Template</StyledButtonTransparent>
        <StyledButtonTransparent
          id="variablesBtn"
          onClick={handleVariablesBtnClick}
        >
          Variables
        </StyledButtonTransparent>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={e => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <List component="nav">
            <ListItemBtn text="First name" />
            <ListItemBtn text="Last name" />
          </List>
        </Popover>
      </Grid>
      <Grid item xs={4}>
        <StyledButtonText onClick={handleClose}>Cancel</StyledButtonText>
        <StyledButtonOutline onClick={handleSave}>Save</StyledButtonOutline>
      </Grid>
    </Grid>
  );
};

export default StepFooter;
