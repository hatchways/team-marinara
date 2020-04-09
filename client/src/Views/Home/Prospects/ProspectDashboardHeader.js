import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, withStyles } from "@material-ui/core";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import MailIcon from '@material-ui/icons/Mail';
import colors from "Components/Styles/Colors";



import StyledImportProspectButtonOutline from "Components/Button/StyledImportProspectButtonOutline";
import StyledAddProspectButton from "Components/Button/StyledAddProspectButton";

const styles = () => ({
    root: {
      width: "100%",
      backgroundColor: `${colors.gray}`,
      padding: "48px 56px"
    },
    toggle: {
      width: "auto"
    },
    header: {
        fontSize: "1.5rem",
        fontWeight: "bold"
    },
    mainHeaderIcon : {
      color: "#A9A9A9"
    }
  });


  const ProspectDashboardHeader = props => (
    <Grid
    item
    container
    alignContent="center"
    alignItems="center"
    justify="space-between"
    className={props.classes.root}
  >
    <Grid item>
    <Typography className={props.classes.header}>Prospects</Typography>
    </Grid>

    <Grid
      item
      container
      alignContent="center"
      alignItems="center"
      spacing={4}
      className={props.classes.toggle}
    >
      <Grid item>
        <FlashOnIcon className={props.classes.mainHeaderIcon }/>
        </Grid>
        <Grid item>
          <MailIcon className={props.classes.mainHeaderIcon } />  
        </Grid>
        
      <Grid item>
        <StyledImportProspectButtonOutline
          component={Link}
          to="/home/prospects/upload">
          Imports
        </StyledImportProspectButtonOutline>
      </Grid>

      <Grid item>
        <StyledAddProspectButton>
          Add New Prospect
        </StyledAddProspectButton>
      </Grid>
    </Grid>
  </Grid>
  );
  
  export default withStyles(styles)(ProspectDashboardHeader);