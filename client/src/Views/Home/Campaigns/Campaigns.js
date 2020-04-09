import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./CampaignsHeader";
import Modal from "./CreateCampaignModal";

import { getCampaigns } from "Utils/api";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Campaigns = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [recentlyFetched, setRecentlyFetched] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getCampaigns();
        setCampaigns(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!recentlyFetched) {
      fetchCampaigns();
      setRecentlyFetched(true);
    }
  }, [recentlyFetched]);

  return (
    <Grid item container className={classes.root}>
      <Grid item container>
        <Header setModalOpen={setModalOpen} />
      </Grid>

      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        setRecentlyFetched={setRecentlyFetched}
      />
    </Grid>
  );
};

export default Campaigns;
