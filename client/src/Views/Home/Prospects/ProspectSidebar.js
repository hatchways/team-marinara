import React, { Component } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid, TextField, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import SidebarCheckbox from 'Components/Checkbox/SidebarCheckbox';


const useStyles = makeStyles((theme) => ({
    
    main: {
        backgroundColor : "#ffffff",
        height: "100vh",
        width: "100%",
    },
    textField: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 50,
        fontWeight: 500,
        color: "#4FBE75"
    },
    input: {
        borderColor: '#000000',
        '&:focus': {
            borderColor: "#000000",
          },
          '& label.Mui-focused': {
            color: 'green',
          },
    },
    checkbox : {
        colorSecondary: "green",
        colorPrimary: "red",
    }
  }));

function ProspectSidebar () {

    const [state, setState] = React.useState({
        specialCheckbox: true,
        limitCheckbox : false,
        tadCheckbox : false,
        importedFromCheckbox : false,
        optedOutCheckbox : false
      });

    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };

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
                <TextField 
                className={classes.textField}
                id="outlined-basic" label="Search" variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon style={{ color: "#4FBE75" }}/>
                        </InputAdornment>
                    ),
                    }}
                /><br/>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                    <FormControlLabel
                        control={<SidebarCheckbox disableRipple={true} checked={state.importedFromCheckbox} onChange={handleChange} name="importedFromCheckbox" />}
                        label="Imported From"
                    />
                    <FormControlLabel
                        control={<SidebarCheckbox disableRipple={true} checked={state.optedOutCheckbox} onChange={handleChange} name="optedOutCheckbox" />}
                        label="Opted Out"
                    />
                    <FormControlLabel
                        control={<SidebarCheckbox disableRipple={true} checked={state.bouncedCheckbox} onChange={handleChange} name="bouncedCheckbox" />}
                        label="Bounced"
                    />
                    <FormControlLabel
                        control={<SidebarCheckbox disableRipple={true} checked={state.tadCheckbox} onChange={handleChange} name="tadCheckbox" />}
                        label="Tad"
                    />
                    <FormControlLabel
                        control={<SidebarCheckbox disableRipple={true} checked={state.limitCheckbox} onChange={handleChange} name="limitCheckbox" />}
                        label="Limit"
                    />
                </FormGroup>
                </FormControl>
            </Grid>
        </Box>
    )
    
    
}


export default ProspectSidebar;