import React, { useState, useContext, useEffect } from "react";
import { Grid, withStyles, Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Route, Switch } from "react-router-dom";

import requireAuth from "Components/Session/requireAuth";

import Navbar from "./Navbar/HomeNavbar";
import Campaigns from "./Campaigns/Campaigns";
import ProspectsUpload from "./Prospects/ProspectsUpload";
import Prospects from "./Prospects/Prospects";
import Templates from "./Templates/Templates";
import Reporting from "./Reporting/Reporting";
import GmailAuthResultDialog from "Views/GmailAuth/GmailAuthResultDialog";
import GmailSignInDialog from "Views/GmailAuth/GmailSignInDialog";
import AuthUserContext from "Components/Session/AuthUserContext";

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
  const [snackbarContent, setSnackbarContent] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const socket = useContext(AuthUserContext).socket;

  useEffect(() => {
    if (socket) {
      socket.on("reply received", data => {
        setSnackbarContent(data);
        setSnackbarOpen(true);
      });
    }
  });

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

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
        <Route path="/home/prospects/upload" component={ProspectsUpload} />
        <Route path="/home/reporting" component={Reporting} />
        <Route path="/home/templates" component={Templates} />
        <Route path="/home/prospects" component={Prospects} />
        <Route path={["/home", "/home/campaigns"]} component={Campaigns} />
      </Switch>

      {/* Overlay Components */}
      <Route path={`*/email-auth-dialog`} component={GmailSignInDialog} />
      <Route
        path={`*/email-auth-results-dialog`}
        component={GmailAuthResultDialog}
      />
      <Snackbar
        open={snackbarOpen}
        onClose={closeSnackbar}
        message={`${snackbarContent.firstName} ${snackbarContent.lastName} replied to ${snackbarContent.campaignName}`}
        autoHideDuration={5000}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom"
        }}
        action={
          <IconButton onClick={closeSnackbar} color="inherit">
            <Close />
          </IconButton>
        }
      />
    </Grid>
  );
};

export default withStyles(styles)(requireAuth(Home));
