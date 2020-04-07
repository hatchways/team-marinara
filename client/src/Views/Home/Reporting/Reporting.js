import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const Reporting = props => (
  <Grid item container className={props.classes.root} justify="center">
    <Typography variant="h1">Reporting Page</Typography>
  </Grid>
);

export default withStyles(styles)(Reporting);
