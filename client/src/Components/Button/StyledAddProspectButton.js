import React from "react";
import { Button, withStyles } from "@material-ui/core";
import colors from "Components/Styles/Colors";

const styles = {
  root: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
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
