import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

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
      <h1>Summary</h1>
    </Grid>
  );
};

export default CampaignSummary;
