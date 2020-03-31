import React from "react";
import { Button, withStyles } from "@material-ui/core";

const styles = {
  root: {
    backgroundImage: "linear-gradient(to right, #2AA897, #4FBE75)",
    borderRadius: 7,
    color: "#FFFFFF",
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
