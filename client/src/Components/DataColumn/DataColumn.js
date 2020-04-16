import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = {
  root: {
    width: "auto",
    padding: "0 2rem"
  },
  label: {
    fontSize: "0.75rem",
    color: colors.black,
    fontWeight: "bold"
  },
  value: {
    fontSize: "1.5rem",
    color: colors.lightGreen
  }
};

const DataColumn = props => {
  const { classes } = props;
  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography className={classes.label}>{props.label}</Typography>
      </Grid>

      <Grid item>
        <Typography className={classes.value}>{props.value}</Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(DataColumn);
