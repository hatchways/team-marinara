import React from "react";
import { Button, withStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = {
  root: {
    color: colors.gray,
    padding: "0.8rem 3rem",
    margin: "0.5rem"
  }
};

const StyledButtonText = props => {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other}></Button>;
};

export default withStyles(styles)(StyledButtonText);
