import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SidebarCheckbox from 'Components/Checkbox/SidebarCheckbox';
import colors from "Components/Styles/Colors";


const useStyles = makeStyles((theme) => ({
    
    main: {
        backgroundColor : `${colors.white}`,
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
    },
  }));

function ProspectSidebar (props) {

    const [state, setState] = React.useState({
        limitCheckbox : false,
        tadCheckbox : false,
        importedFromCheckbox : false,
        optedOutCheckbox : false
      });

    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleInputChange = (event) => {
        const text = event.target.value;
        props.onChange(props.id, text);
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
                onChange={handleInputChange} value={props.value}
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