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

const TemplateEditorFooter = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const { handleClose, handleSave, handleVariableValueClick } = props;

  const handleVariablesBtnClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleVariableClick = event => {
    handleVariableValueClick(event.target.innerText);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid container item className={classes.buttonBar} xs={12}>
      <Grid item xs={10}>
        <StyledButtonText onClick={handleClose}>Cancel</StyledButtonText>
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
          disableAutoFocus={true}
          disableEnforceFocus={true}
        >
          <List component="nav">
            <ListItemBtn text="First name" onClick={handleVariableClick} />
            <ListItemBtn text="Last name" onClick={handleVariableClick} />
          </List>
        </Popover>
      </Grid>
      <Grid item xs={2}>
        <StyledButtonOutline align="right" onClick={handleSave}>Save</StyledButtonOutline>
      </Grid>
    </Grid>
  );
};

export default TemplateEditorFooter;
