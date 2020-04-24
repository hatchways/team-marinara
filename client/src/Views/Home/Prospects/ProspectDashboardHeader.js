import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, withStyles } from "@material-ui/core";
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
    fontSize: "2rem",
    fontWeight: "bold"
  },
  mainHeaderIcon: {
    color: "#A9A9A9"
  }
});

const ProspectDashboardHeader = props => {
  return (
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
          {props.addToCampaignBtnVisible && (
            <StyledAddProspectButton
              idxyt="add-to-campaign"
              onClick={e => props.handleClick(e)}
            >
              Add to Campaign
            </StyledAddProspectButton>
          )}
        </Grid>

        <Grid item>
          <StyledImportProspectButtonOutline>
            Imports
          </StyledImportProspectButtonOutline>
        </Grid>

        <Grid item>
          <StyledAddProspectButton component={Link} to="/home/prospects/upload">
            Add New Prospects
          </StyledAddProspectButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ProspectDashboardHeader);
