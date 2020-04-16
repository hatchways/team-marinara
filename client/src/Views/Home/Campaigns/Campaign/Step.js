import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.white,
    padding: "2rem",
    borderRadius: 7,
    border: `2px solid ${colors.midGray}`,
    width: "100%",
    marginBottom: "2rem"
  }
});

const Step = props => {
  const classes = useStyles();
  return (
    <Grid item container alignItems="center" className={classes.root}>
      <Typography>{props.step.name}</Typography>
    </Grid>
  );
};

export default Step;
