import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import StyledButton from "Components/Button/StyledButton";
import CampaignProspectsStepBar from "./CampaignProspectsStepBar";

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
  },
  stepBar: {
    marginTop: "2rem",
    width: "100%"
  }
});

const CampaignProspectsHeader = props => {
  const classes = useStyles();

  const handleStepSelect = stepName => {
    props.handleStepSelect(stepName);
  };

  return (
    <Grid item container className={classes.root}>
      <Grid container direction="row">
        <Grid item className={classes.title}>
          <Typography className={classes.name}>{props.name}</Typography>
        </Grid>

        <Grid item>
          <StyledButton>Move to Step</StyledButton>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.stepBar}
        direction="row"
        alignItems="right"
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          <CampaignProspectsStepBar
            handleStepSelect={handleStepSelect}
            steps={props.steps}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CampaignProspectsHeader;
