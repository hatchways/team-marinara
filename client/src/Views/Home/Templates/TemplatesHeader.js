import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, withStyles } from "@material-ui/core";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import MailIcon from "@material-ui/icons/Mail";
import colors from "Components/Styles/Colors";
import { useHistory } from "react-router-dom";

import StyledImportProspectButtonOutline from "Components/Button/StyledImportProspectButtonOutline";
import StyledAddProspectButton from "Components/Button/StyledAddProspectButton";

import Modal from "./TemplateEditor";

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
  mainHeaderIcon: {
    color: "#A9A9A9"
  }
});

const TemplatesHeader = (props) => {
  
  
  const history = useHistory();


  const handleCreateTemplate = () => {
    props.setModalOpen(true);
  };

  const handleLoadTemplate = () => {
    history.push(`/home/templates/load`);
  }

  

  const setRecentlyFetched = () => {

  }
  
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
        <Typography className={props.classes.header}>Templates</Typography>
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
          <FlashOnIcon className={props.classes.mainHeaderIcon} />
        </Grid>
        <Grid item>
          <MailIcon className={props.classes.mainHeaderIcon} />
        </Grid>
        
      <Grid item>
        <StyledImportProspectButtonOutline>
          Load Old Template
        </StyledImportProspectButtonOutline>
      </Grid>

        <Grid item>
          <StyledAddProspectButton
          onClick={handleCreateTemplate}>
            Create New Template
          </StyledAddProspectButton>
        </Grid>
        <Modal
            open={props.modalOpen}
            setModalOpen={props.setModalOpen}
            setRecentlyFetched={setRecentlyFetched}
          />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TemplatesHeader);
