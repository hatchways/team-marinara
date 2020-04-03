import React, { Component } from "react";
import { Grid, withStyles, Typography, TextField } from "@material-ui/core";

import styles from "Components/Form/LandingFormStyles";
import StyledButton from "Components/Button/StyledButton";

import { register } from "Utils/api";

class Register extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
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
      const res = await register(fields);
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
          <Typography className={this.props.classes.header}>
            Create an account
          </Typography>
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
              error={this.state.errors.email}
              helperText={this.state.errors.email}
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="First name"
              name="firstName"
              type="text"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.firstName}
              error={this.state.errors.firstName}
              helperText={this.state.errors.firstName}
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="Last name"
              name="lastName"
              type="text"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.lastName}
              error={this.state.errors.lastName}
              helperText={this.state.errors.lastName}
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
              error={this.state.errors.password}
              helperText={this.state.errors.password}
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.confirmPassword}
              error={this.state.errors.confirmPassword}
              helperText={this.state.errors.confirmPassword}
            />
          </Grid>
        </Grid>

        <Grid item>
          <StyledButton onClick={this.onSubmit}>Create</StyledButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Register);
