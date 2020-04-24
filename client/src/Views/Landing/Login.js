import React, { Component } from "react";
import {
  Grid,
  withStyles,
  Typography,
  TextField,
  Snackbar,
  IconButton
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

import styles from "Components/Form/LandingFormStyles";
import StyledButton from "Components/Button/StyledButton";
import AuthUserContext from "Components/Session/AuthUserContext";

import { login } from "Utils/api";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loggedIn: localStorage.getItem("token") ? true : false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async () => {
    const fields = { ...this.state };

    try {
      const res = await login(fields);

      this.context.setToken(`Bearer ${res.data.token}`);
      this.setState({
        loggedIn: true
      });
    } catch (error) {
      this.setState({
        errors: { ...error.response.data }
      });
    }
  };

  onEnterPress = e => {
    if (e.key === "Enter") {
      this.onSubmit();
    }
  };

  closeSnackbar = () => {
    this.setState({
      errors: {}
    });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <Grid
        item
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        spacing={7}
        className={this.props.classes.root}
        onKeyPress={this.onEnterPress}
      >
        <Grid item>
          <Typography className={this.props.classes.header}>
            Welcome to mail
            <span className={this.props.classes.sender}>sender</span>{" "}
            <span role="img" aria-label="">
              💌
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Typography className={this.props.classes.header}>Login</Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignContent="center"
          spacing={2}
        >
          <Grid item className={this.props.classes.input}>
            <TextField
              label="Your email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.email}
              error={"email" in this.state.errors}
              helperText={this.state.errors.email}
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.password}
              error={"password" in this.state.errors}
              helperText={this.state.errors.password}
            />
          </Grid>
        </Grid>
        <Grid item>
          <StyledButton onClick={this.onSubmit}>Login</StyledButton>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={"msg" in this.state.errors}
          message={this.state.errors.msg}
          action={
            <IconButton onClick={this.closeSnackbar} color="inherit">
              <Close />
            </IconButton>
          }
        />
      </Grid>
    );
  }
}

Login.contextType = AuthUserContext;

export default withStyles(styles)(Login);
