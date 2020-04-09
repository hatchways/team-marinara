import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";

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

const CampaignHeader = props => {
  const classes = useStyles();

  const handleAddProspects = () => {
    props.history.push(`/home/prospects`);
  };

  const handleAddStep = () => {
    props.history.push(`${props.match.url}/step`);
  };

  return (
    <Grid item container className={classes.root} spacing={4}>
      <Grid item className={classes.title}>
        <Typography className={classes.name}>{props.name}</Typography>
      </Grid>

      <Grid item>
        <StyledButton onClick={handleAddStep}>Add Step</StyledButton>
      </Grid>

      <Grid item>
        <StyledButton onClick={handleAddProspects}>Add Prospects</StyledButton>
      </Grid>
    </Grid>
  );
};

export default withRouter(CampaignHeader);
