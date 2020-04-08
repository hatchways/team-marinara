import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, withStyles, Typography, TextField } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


//import styles from "Components/List/ProspectListStyles";
import StyledButton from "Components/Button/StyledButton";
import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import ProspectMainHeader from "./ProspectMainHeader";
import Box from '@material-ui/core/Box';
import ProspectList from "./ProspectList";


const useStyles = makeStyles((theme) => ({
    
    main: {
        backgroundColor : "#F4F6FC",
        height: "100vh",
        width: "100%",
    }
  }));

function ProspectMain() {
    const classes = useStyles();
    return (
        <Box className={classes.main}>
            <Grid
                className={classes.root}
                container
                direction="column"
                alignItems="center"
                wrap="nowrap"
            >
            <ProspectMainHeader/>
            <ProspectList/>
            </Grid>
        </Box>
    )
    
    
}

export default ProspectMain;