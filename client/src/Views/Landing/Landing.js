import React, { useRef } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import Navbar from "./LandingNavbar";
import Login from "./Login";
import Register from "./Register";

import colors from "Components/Styles/Colors";

const styles = () => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: `${colors.gray}`,
    overflow: "auto"
  }
});

const demoUser = {
  email: "demo@email.com",
  password: "testPass"
};

const Landing = props => {
  const demoUserRef = useRef();

  const handleDemoModeSubmit = () => {
    demoUserRef.current.setDemoUser(demoUser);
  };

  return (
    <Grid
      className={props.classes.root}
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >
      <Switch>
        <Route path="/register">
          <Navbar
            handleDemoModeSubmit={handleDemoModeSubmit}
            variant="register"
          ></Navbar>
          <Register />
        </Route>

        <Route path={["/", "/login"]}>
          <Navbar
            handleDemoModeSubmit={handleDemoModeSubmit}
            variant="login"
          ></Navbar>
          <Login ref={demoUserRef} />
        </Route>
      </Switch>
    </Grid>
  );
};
export default withStyles(styles)(Landing);
