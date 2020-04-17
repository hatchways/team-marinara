import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

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

const CampaignProspectsHeader = props => {
  const classes = useStyles();

  return (
    <Grid item container className={classes.root}>
      <Grid item className={classes.title}>
        <Typography className={classes.name}>{props.name}</Typography>
      </Grid>

      <Grid item>
        <StyledButton>Move to Step</StyledButton>
      </Grid>
    </Grid>
  );
};

export default CampaignProspectsHeader;
