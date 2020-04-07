import React from "react";
import { Grid, withStyles } from "@material-ui/core";
// import { Route, Switch } from "react-router-dom";

import Navbar from "./Navbar/HomeNavbar";

const styles = () => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#F4F6FC",
    overflow: "auto"
  }
});

const Home = props => (
  <Grid
    className={props.classes.root}
    container
    direction="column"
    alignItems="center"
    wrap="nowrap"
  >
    <Navbar />
  </Grid>
);

export default withStyles(styles)(Home);
