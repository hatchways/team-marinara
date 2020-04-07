import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import MailIcon from '@material-ui/icons/Mail';

//import styles from "Components/List/ProspectListStyles";


import StyledImportProspectButtonOutline from "Components/Button/StyledImportProspectButtonOutline";
import StyledAddProspectButton from "Components/Button/StyledAddProspectButton";

const styles = () => ({
    root: {
      width: "100%",
      backgroundColor: "#F4F6FC",
      padding: "48px 56px"
    },
    bold: {
      fontWeight: "bold",
      fontSize: 14
    },
    toggle: {
      width: "auto"
    },
    header: {
        fontSize: "1.5rem",
        fontWeight: "bold"
    },
    main_header_icon : {
      color: "#A9A9A9"
    }
  });


  const ProspectMainHeader = props => (
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
        <FlashOnIcon className={props.classes.main_header_icon }/>
        </Grid>
        <Grid item>
          <MailIcon className={props.classes.main_header_icon } />  
        </Grid>
        
      <Grid item>
        <StyledImportProspectButtonOutline>
          Imports
        </StyledImportProspectButtonOutline>
      </Grid>

      <Grid item>
        <StyledAddProspectButton
          component={Link}
        >
          Add New Prospect
        </StyledAddProspectButton>
      </Grid>
    </Grid>
  </Grid>
  );
  
  export default withStyles(styles)(ProspectMainHeader);