import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';

import styles from '../../styles/Landing/LandingNavbarStyles';

const LandingNavbar = props => (
  <Grid item className={props.classes.root}>
    <Typography variant='h2'>{props.variant}</Typography>
  </Grid>
);

export default withStyles(styles)(LandingNavbar);