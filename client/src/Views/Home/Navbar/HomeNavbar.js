import React from "react";
import { Grid, withStyles } from "@material-ui/core";

import Tabs from "./NavbarTabs";
import colors from "Components/Styles/Colors";
import logo from "Assets/logo.png";

const styles = () => ({
  root: {
    width: "100%",
    backgroundColor: `${colors.white}`,
    padding: "0 48px",
    height: 100
  },
  tabs: {
    height: "100%"
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

    <Grid item className={props.classes.tabs}>
      <Tabs />
    </Grid>
  </Grid>
);

export default withStyles(styles)(HomeNavbar);
