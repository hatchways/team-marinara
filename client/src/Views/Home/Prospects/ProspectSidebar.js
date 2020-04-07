import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
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
        color: 'black'
    },
    checkbox : {
        colorSecondary: "green",
        colorPrimary: "red",
    }
  }));

function ProspectSidebar () {


    const handleChange = () => {

    }

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
                        
                        control={<Checkbox color="secondary" className="checkbox" onChange={handleChange} name="imported_from" />}
                        label="Imported From"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={handleChange} onChange={handleChange} name="opted_out" />}
                        label="Opted Out"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={handleChange} onChange={handleChange} name="bounced" />}
                        label="Bounced"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={handleChange} onChange={handleChange} name="tad" />}
                        label="Tad"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={handleChange} onChange={handleChange} name="limit" />}
                        label="Limit"
                    />
                </FormGroup>
                </FormControl>
            </Grid>
        </Box>
    )
    
    
}


export default ProspectSidebar;