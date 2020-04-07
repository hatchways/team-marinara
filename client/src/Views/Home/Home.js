import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import Navbar from "./Navbar/HomeNavbar";
import Campaigns from "./Campaigns/Campaigns";
import Prospects from "./Prospects/Prospects";
import Templates from "./Templates/Templates";
import Reporting from "./Reporting/Reporting";

import colors from "Components/Styles/Colors";

const styles = () => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: `${colors.gray}`,
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

    <Switch>
      <Route path="/home/reporting">
        <Reporting />
      </Route>
      <Route path="/home/templates">
        <Templates />
      </Route>
      <Route path="/home/prospects">
        <Prospects />
      </Route>
      <Route path={["/home", "/home/campaigns"]}>
        <Campaigns />
      </Route>
    </Switch>
  </Grid>
);

export default withStyles(styles)(Home);
