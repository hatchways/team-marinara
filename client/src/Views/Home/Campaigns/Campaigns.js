import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./CampaignsHeader";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Campaigns = () => {
  const classes = useStyles();
  return (
    <Grid item container className={classes.root}>
      <Grid item container>
        <Header />
      </Grid>
    </Grid>
  );
};

export default Campaigns;
