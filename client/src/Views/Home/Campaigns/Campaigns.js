import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import Header from "./CampaignsHeader";
import Table from "./CampaignsTable";
import Modal from "./CreateCampaignModal";

import Campaign from "./Campaign/Campaign";

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
      <Switch>
        <Route path="/home/campaigns/:campaignId">
          <Campaign />
        </Route>
        <Route path="/home/campaigns">
          {/* TODO: Add Sidebar */}

          {/* Content Area */}
          <Grid item container direction="column">
            <Header setModalOpen={setModalOpen} />
            <Table campaigns={campaigns} />
          </Grid>

          <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            setRecentlyFetched={setRecentlyFetched}
          />
        </Route>
      </Switch>
    </Grid>
  );
};

export default Campaigns;
