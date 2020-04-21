import React, { useState } from "react";
import { Grid, makeStyles, Popover, List, Modal } from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import StyledButtonTransparent from "Components/Button/StyledButtonTransparent";
import StyledButtonText from "Components/Button/StyledButtonText";
import ListItemBtn from "Components/TextEditor/ListItemBtn";
import colors from "Components/Styles/Colors";
import TemplateModal from "./SelectTemplateModal";

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
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();
  const {
    handleClose,
    handleSave,
    handleVariableValueClick,
    handleSaveAsTemplate,
    handleLoadTemplate
  } = props;

  const handleVariablesBtnClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleVariableClick = event => {
    handleVariableValueClick(event.target.innerText);
    setAnchorEl(null);
  };

  const saveAsTemplate = () => {
    handleSaveAsTemplate();
  };

  const handleCloseTemplateModal = template => {
    setModalOpen(false);
    handleLoadTemplate(template);
  };

  const handleOpenTemplateModal = () => {
    setModalOpen(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid container item className={classes.buttonBar} xs={12}>
      <Grid item xs={8}>
        <StyledButtonTransparent onClick={handleOpenTemplateModal}>
          Templates
        </StyledButtonTransparent>
        <StyledButtonTransparent onClick={saveAsTemplate}>
          Save as Template
        </StyledButtonTransparent>
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
      <Grid item xs={4}>
        <StyledButtonText onClick={handleClose}>Cancel</StyledButtonText>
        <StyledButtonOutline onClick={handleSave}>Save</StyledButtonOutline>
      </Grid>
      <TemplateModal
        handleCloseTemplateModal={handleCloseTemplateModal}
        open={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Grid>
  );
};

export default StepFooter;
