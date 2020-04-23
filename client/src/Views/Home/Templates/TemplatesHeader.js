import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import colors from "Components/Styles/Colors";

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
    fontSize: "2rem",
    fontWeight: "bold"
  },
  mainHeaderIcon: {
    color: "#A9A9A9"
  }
});

const TemplatesHeader = props => {
  const handleCreateTemplate = () => {
    props.setModalOpen(true);
  };

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
          <StyledAddProspectButton onClick={handleCreateTemplate}>
            Create New Template
          </StyledAddProspectButton>
        </Grid>
        <Modal
          open={props.modalOpen}
          setModalOpen={props.setModalOpen}
          setRecentlyFetched={props.setRecentlyFetched}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TemplatesHeader);
