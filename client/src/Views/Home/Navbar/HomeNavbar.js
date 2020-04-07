import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import Tabs from "./NavbarTabs";

import logo from "Assets/logo.png";

const styles = () => ({
  root: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: "0 48px",
    height: 100
  }
});

const HomeNavbar = props => (
  <Grid
    item
    container
    alignItems="center"
    justify="space-between"
    className={props.classes.root}
  >
    <Grid item>
      <img src={logo} alt="logo" />
    </Grid>

    <Grid item>
      <Tabs />
    </Grid>
  </Grid>
);

export default withStyles(styles)(HomeNavbar);
