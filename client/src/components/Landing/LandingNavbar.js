import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import StyledButtonOutline from '../../styles/Buttons/StyledButtonOutline';
import styles from '../../styles/Landing/LandingNavbarStyles';

import logo from '../../assets/logo.png';

const LandingNavbar = props => (
  <Grid 
    item 
    container
    alignContent='center'
    alignItems='center'
    justify='space-between'
    className={props.classes.root}
  >
    <Grid item>
      <img src={logo} alt='logo' />
    </Grid>

    <Grid 
      item 
      container
      alignContent='center'
      alignItems='center'
      spacing={4} 
      className={props.classes.toggle}
    >
      <Grid item>
        <Typography className={props.classes.bold}>
          {props.variant === 'login' ? "Don't have an account?" : "Already have an account?"}
        </Typography>
      </Grid>

      <Grid item>
        <StyledButtonOutline component={Link} to={props.variant === 'login' ? '/register' : '/login'}>
          {props.variant === 'login' ? 'Create' : 'Login'}
        </StyledButtonOutline>
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(LandingNavbar);