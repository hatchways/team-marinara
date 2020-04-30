import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./CampaignProspectsHeader";
import Table from "./CampaignProspectsTable";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "auto"
  }
});

const CampaignProspects = props => {
  const classes = useStyles();

  const handleStepSelect = stepName => {
    props.handleStepSelect(stepName);
  };

  return (
    <Grid item container direction="column" className={classes.root}>
      <Header
        handleStepSelect={handleStepSelect}
        steps={props.steps}
        name={props.campaign.name}
        stepBarArray={props.stepBarArray}
        activeStep={props.activeStep}
      />
      <Table prospects={props.prospects} />
    </Grid>
  );
};

export default CampaignProspects;
