import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Grid, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SidebarCheckbox from "Components/Checkbox/SidebarCheckbox";
import colors from "Components/Styles/Colors";

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: `${colors.white}`,
    height: "100vh",
    width: "100%"
  },
  searchBar: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 50,
    fontWeight: 500
  }
}));

const DashboardSidebar = props => {
  const [state, setState] = React.useState({
    limitCheckbox: false,
    tadCheckbox: false,
    recent: false,
    optedOutCheckbox: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleInputChange = event => {
    const text = event.target.value;
    props.handleFieldChange(props.id, text);
  };

  const checkboxes = props.sidebarCheckboxes.map(checkbox => (
    <FormControlLabel
      control={
        <SidebarCheckbox
          disableRipple={true}
          checked={state.recent}
          onChange={handleChange}
          name={checkbox}
        />
      }
      label={checkbox}
    />
  ));

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
          className={classes.searchBar}
          onChange={handleInputChange}
          value={props.value}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#4FBE75" }} />
              </InputAdornment>
            )
          }}
        />
        <br />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>{checkboxes}</FormGroup>
        </FormControl>
      </Grid>
    </Box>
  );
};

export default DashboardSidebar;
