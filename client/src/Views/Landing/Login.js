import React, { Component } from "react";
import { Grid, withStyles, Typography, TextField } from "@material-ui/core";

import styles from "Components/Form/LandingFormStyles";
import StyledButton from "Components/Button/StyledButton";

import { login } from "Utils/api";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
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
      console.log(res);
    } catch (error) {
      this.setState({
        errors: { ...error.response.data }
      });
    }
  };

  render() {
    return (
      <Grid
        item
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        spacing={7}
        className={this.props.classes.root}
      >
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
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
