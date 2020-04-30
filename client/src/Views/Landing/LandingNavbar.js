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
  },
  orSeparator: {
    margin: "0px 0px 0px 15px"
  }
});

const LandingNavbar = props => {
  return (
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
        {props.variant === "login" ? (
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <Grid item>
              <StyledButtonOutline onClick={props.handleDemoModeSubmit}>
                Demo
              </StyledButtonOutline>
            </Grid>
            <Grid item>
              <Typography className={props.classes.orSeparator}>Or</Typography>
            </Grid>
          </div>
        ) : (
          ""
        )}

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
};

export default withStyles(styles)(LandingNavbar);
