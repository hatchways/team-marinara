import React, { Component } from 'react';
import { Grid, withStyles, Typography, TextField } from '@material-ui/core';

import styles from '../../styles/Landing/LandingFormStyles';
import StyledButton from '../../styles/Buttons/StyledButton';

class Login extends Component {
  state = {  }
  render() {
    return (
      <Grid 
        item 
        container
        direction='column'
        alignContent='center'
        alignItems='center'
        spacing={7}
        className={this.props.classes.root}
      >
        <Grid item>
          <Typography className={this.props.classes.header}>Login</Typography>
        </Grid>

        <Grid 
          item 
          container
          direction='column'
          alignContent='center'
          spacing={2}
        >
          <Grid item className={this.props.classes.input}>
            <TextField
              label='Your email'
              name='email'
              type='email'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item className={this.props.classes.input}>
            <TextField
              label='Password'
              name='password'
              type='password'
              variant='outlined'
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item>
          <StyledButton>Login</StyledButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);