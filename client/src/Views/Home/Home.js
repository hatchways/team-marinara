import React, { useContext } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import AuthUserContext from "Components/Session/AuthUserContext";
import requireAuth from "Components/Session/requireAuth";

import Navbar from "./Navbar/HomeNavbar";
import Campaigns from "./Campaigns/Campaigns";
import Prospects from "./Prospects/Prospects";
import Templates from "./Templates/Templates";
import Reporting from "./Reporting/Reporting";
import GmailAuthResultDialog from "Views/GmailAuth/GmailAuthResultDialog";
import GmailSignInDialog from "Views/GmailAuth/GmailSignInDialog";
import Step from "Views/Home/Steps/AddStep";

import colors from "Components/Styles/Colors";

const styles = () => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: `${colors.gray}`,
    overflow: "auto"
  }
});

const Home = props => {
  const context = useContext(AuthUserContext);
  return (
    <Grid
      className={props.classes.root}
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >
      <Navbar />

      <Switch>
        <Route path="/home/reporting" component={Reporting} />
        <Route path="/home/templates" component={Templates} />
        <Route path="/home/prospects" component={Prospects} />
        <Route path={["/home", "/home/campaigns"]} component={Campaigns} />
      </Switch>

      {/* Overlay components */}
      <Route path={`*/email-auth-dialog`} component={GmailSignInDialog} />
      <Route
        path={`*/email-auth-results-dialog`}
        component={GmailAuthResultDialog}
      />
      <Route path={`*/step`} component={Step} />
    </Grid>
  );
};

export default withStyles(styles)(requireAuth(Home));
