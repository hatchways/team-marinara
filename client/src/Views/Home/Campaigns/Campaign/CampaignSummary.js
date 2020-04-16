import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./CampaignSummaryHeader";
import Steps from "./Steps";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "auto"
  }
});

const CampaignSummary = props => {
  const classes = useStyles();
  return (
    <Grid item container direction="column" className={classes.root}>
      <Header campaign={props.campaign} />
      <Steps steps={props.steps} />
    </Grid>
  );
};

export default CampaignSummary;
