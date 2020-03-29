import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const styles = {
  root: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #2AA897',
    borderRadius: 7,
    color: '#000000',
    fontWeight: 'bold',
    height: 54,
    width: 140
  }
};

const StyledButtonOutline = props => {
  const {classes, ...other} = props;
  return <Button className={classes.root} {...other}></Button>;
}

export default withStyles(styles)(StyledButtonOutline);