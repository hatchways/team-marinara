import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import colors from "Components/Styles/Colors";

import logo from "Assets/logo.png";

const styles = () => ({
  root: {
    width: "100%",
    backgroundColor: `${colors.white}`,
    padding: "0px 48px",
    height: 100
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14
  },
  toggle: {
    width: "auto"
  }
});

const LandingNavbar = props => (
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

    <Grid
      item
      container
      alignItems="center"
      spacing={4}
      className={props.classes.toggle}
    >
      <Grid item>
        <Typography className={props.classes.bold}>
          {props.variant === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Typography>
      </Grid>

      <Grid item>
        <StyledButtonOutline
          component={Link}
          to={props.variant === "login" ? "/register" : "/login"}
        >
          {props.variant === "login" ? "Create" : "Login"}
        </StyledButtonOutline>
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(LandingNavbar);
