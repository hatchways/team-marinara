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
  return (
    <Grid item container direction="column" className={classes.root}>
      <Header name={props.campaign.name} />
      <Table prospects={props.prospects} />
    </Grid>
  );
};

export default CampaignProspects;
