import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Route, Switch } from "react-router-dom";

import styles from '../../styles/Landing/LandingStyles';

import Navbar from './LandingNavbar';

const Landing = props => (
  <Grid 
    className={props.classes.root} 
    container 
    direction='column'
    alignItems='center'
  >
    <Switch>
      <Route path='/register'>
        <Navbar variant='register'></Navbar>
      </Route>

      <Route path={['/', '/login']}>
        <Navbar variant='login'></Navbar>
      </Route>
    </Switch>
  </Grid>
);

export default withStyles(styles)(Landing);