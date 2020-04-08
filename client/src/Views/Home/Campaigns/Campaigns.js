import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./CampaignsHeader";
import Modal from "./CreateCampaignModal";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Campaigns = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Grid item container className={classes.root}>
      <Grid item container>
        <Header setModalOpen={setModalOpen} />
      </Grid>

      <Modal open={modalOpen} setOpen={setModalOpen} />
    </Grid>
  );
};

export default Campaigns;
