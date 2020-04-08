import React from "react";
import { Button, withStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = {
  root: {
    color: colors.white,
    border: `1px solid ${colors.white}`,
    padding: "0.8rem 2rem",
    margin: "0.5rem"
  }
};

const StyledButtonTransparent = props => {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other}></Button>;
};

export default withStyles(styles)(StyledButtonTransparent);
