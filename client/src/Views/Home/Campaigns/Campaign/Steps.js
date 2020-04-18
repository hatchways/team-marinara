import React, { useState } from "react";
import { Grid, makeStyles, withStyles } from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import Step from "./Step";
import StepEditor from "./StepEditor";

const useStyles = makeStyles({
  root: {
    padding: "0 3rem",
    flexGrow: 1
  }
});

const Button = withStyles({
  root: {
    backgroundColor: "inherit"
  }
})(StyledButtonOutline);

const Steps = props => {
  const classes = useStyles();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  const handleClose = () => {
    setEditorOpen(false);
  };

  //If null is passed in, "Add Step" editor will open
  //Else, "Edit Email" editor will open
  const openEditor = step => {
    setSelectedStep(step);
    setEditorOpen(true);
  };

  const steps = [];

  for (let i = 0; i < props.steps.length; i++) {
    let prevStep;

    if (i === 0) {
      prevStep = props.campaign;
    } else {
      prevStep = props.steps[i - 1];
    }

    steps.push(
      <Step
        key={props.steps[i]._id}
        step={props.steps[i]}
        openEditor={openEditor}
        prevStep={prevStep}
      />
    );
  }

  return (
    <Grid item container direction="column" className={classes.root}>
      {steps}
      <Grid item>
        <Button onClick={() => openEditor(null)}>Add Step</Button>
      </Grid>
      <StepEditor
        open={editorOpen}
        onClose={handleClose}
        campaignId={props.campaign._id}
        step={selectedStep}
        triggerFetch={props.triggerFetch}
      />
    </Grid>
  );
};

export default Steps;
