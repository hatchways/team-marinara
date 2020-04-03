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
    confirmPassword: ""
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
      console.log(error.response.data);
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
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="First Name"
              name="firstName"
              type="text"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.firstName}
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="Last Name"
              name="lastName"
              type="text"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.lastName}
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
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              onChange={this.onChange}
              value={this.state.confirmPassword}
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
