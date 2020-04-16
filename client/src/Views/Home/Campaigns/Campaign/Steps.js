import React from "react";
import { Grid, makeStyles, withStyles } from "@material-ui/core";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";

const useStyles = makeStyles({
  root: {
    padding: "0 3rem",
    flexGrow: 1
  }
});

const Button = withStyles({
  root: {
    backgroundColor: "inherit"
  }
})(StyledButtonOutline);

const Steps = props => {
  const classes = useStyles();
  return (
    <Grid item container direction="column" className={classes.root}>
      <Grid item>
        <Button>Add Step</Button>
      </Grid>
    </Grid>
  );
};

export default Steps;
