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
  logo: {
    flexGrow: 1
  },
  tabs: {
    height: "100%",
    paddingRight: "10rem"
  }
});

const HomeNavbar = props => (
  <Grid item container alignItems="center" className={props.classes.root}>
    <Grid item className={props.classes.logo}>
      <Link to="/home">
        <img src={logo} alt="logo" />
      </Link>
    </Grid>

    <Grid item className={props.classes.tabs}>
      <Tabs />
    </Grid>

    <Profile />
  </Grid>
);

export default withStyles(styles)(HomeNavbar);
