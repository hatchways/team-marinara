import React from "react";
import { Button, withStyles } from "@material-ui/core";

const styles = {
  root: {
    backgroundImage: "linear-gradient(to right, #2AA897, #4FBE75)",
    borderRadius: 7,
    color: "#FFFFFF",
    fontWeight: "thin",
    fontSize: ".8rem",
    height: 54,
    width: 180
  }
};

const StyledAddProspectButton = props => {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other}></Button>;
};

export default withStyles(styles)(StyledAddProspectButton);
