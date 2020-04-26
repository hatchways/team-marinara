import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import Tabs from "./NavbarTabs";
import Profile from "./Profile";
import colors from "Components/Styles/Colors";
import logo from "Assets/logo.png";

const styles = () => ({
  root: {
    width: "100%",
    backgroundColor: `${colors.white}`,
    padding: "0 48px",
    height: 100,
    borderBottom: `2px solid ${colors.midGray}`
  },
  tabs: {
    height: "100%"
  }
});

const HomeNavbar = props => (
  <Grid
    container
    direction="row"
    alignItems="center"
    justify="space-between"
    className={props.classes.root}
  >
    <Grid item>
      <Link to="/home">
        <img src={logo} alt="logo" />
      </Link>
    </Grid>

    <Grid item className={props.classes.tabs}>
      <Tabs />
    </Grid>
    <Grid item>
      <Profile />
    </Grid>
  </Grid>
);

export default withStyles(styles)(HomeNavbar);
