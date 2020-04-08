import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, withStyles, Typography, TextField } from "@material-ui/core";
import List from '@material-ui/core/List';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
      fontSize: '10px',
      color: 'white',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 7,
    },
    form : {
      backgroundColor: theme.palette.background.paper,
    },
    list : {

    },
    listItem : {
      color: 'black',
    }
    
  }));

  function SimpleList() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        
        <List component="nav" className={classes.list}>
          
        </List>
        
      </div>
    );
  }

class ProspectList extends Component {
    
    state = {
        email: "",
        password: ""
      };
    
      onChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
    render() {
        return (
          <Grid
            item
            container
            direction="column"
            //alignContent="center"
            //alignItems="center"
            spacing={7}
            className={this.props.classes.root}
          >
    
            <Grid
              item
              container
              direction="column"
              alignContent="center"
              spacing={2}
            >
                
                <SimpleList/>
                

            </Grid>
          </Grid>
        );
      }
}

export default (ProspectList);