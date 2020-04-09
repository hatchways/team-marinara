import React from "react";
import { Button, withStyles } from "@material-ui/core";

const styles = {
  root: {
    backgroundColor: "#F4F6FC",
    border: "1px solid #2AA897",
    borderRadius: 7,
    color: "#000000",
    fontWeight: "bold",
    fontSize: ".8rem",
    height: 54,
    width: 140
  }
};

const StyledImportProspectButtonOutline = props => {
  const { classes, ...other } = props;
  return <Button className={classes.root} {...other}></Button>;
};

export default withStyles(styles)(StyledImportProspectButtonOutline);
