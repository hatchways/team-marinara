import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import StyledButton from "Components/Button/StyledButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "2rem 3rem"
  },
  title: {
    flexGrow: 1
  },
  name: {
    fontSize: "2rem",
    fontWeight: "bold"
  }
});

const CampaignSummaryHeader = props => {
  const classes = useStyles();

  return (
    <Grid item container className={classes.root}>
      <Grid item className={classes.title}>
        <Typography className={classes.name}>{props.campaign.name}</Typography>
      </Grid>

      <Grid item>
        <StyledButton component={Link} to="/home/prospects">
          Add Prospects
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default CampaignSummaryHeader;
