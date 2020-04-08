import React from "react";
import { Button, withStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = {
  root: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
    borderRadius: 7,
    color: `${colors.white}`,
    fontWeight: "bold",
    fontSize: "1rem",
    height: 64,
    width: 180
  }
};

const StyledButton = props => {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other}></Button>;
};

export default withStyles(styles)(StyledButton);
