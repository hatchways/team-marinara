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
  }
});

const CampaignProspectsHeader = props => {
  const classes = useStyles();

  const handleStepSelect = stepName => {
    props.handleStepSelect(stepName);
  };

  return (
    <Grid item container className={classes.root}>
      <Grid
        className={classes.root}
        container
        direction="row"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item className={classes.title}>
          <Typography className={classes.name}>{props.name}</Typography>
        </Grid>

        <Grid item>
          <StyledButton>Move to Step</StyledButton>
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item>
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
