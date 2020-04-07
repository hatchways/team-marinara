import React from "react";
import { Button, withStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = {
  root: {
    backgroundColor: `${colors.white}`,
    border: `1px solid ${colors.green}`,
    borderRadius: 7,
    color: `${colors.black}`,
    fontWeight: "bold",
    height: 54,
    width: 140
  }
};

const StyledButtonOutline = props => {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other}></Button>;
};

export default withStyles(styles)(StyledButtonOutline);
