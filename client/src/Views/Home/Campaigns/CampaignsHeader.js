import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import StyledButton from "Components/Button/StyledButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "2rem 3rem"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold"
  }
});

const CampaignsHeader = props => {
  const classes = useStyles();
  return (
    <Grid item container className={classes.root} justify="space-between">
      <Grid item>
        <Typography className={classes.title}>Campaigns</Typography>
      </Grid>

      <Grid item>
        <StyledButton>Create Campaign</StyledButton>
      </Grid>
    </Grid>
  );
};

export default CampaignsHeader;
