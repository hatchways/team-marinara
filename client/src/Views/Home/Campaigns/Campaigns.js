import React, { useState, useEffect, useCallback } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./CampaignsHeader";
import Table from "./CampaignsTable";
import Modal from "./CreateCampaignModal";

import Campaign from "./Campaign/Campaign";

import { getCampaigns, checkForGmailToken } from "Utils/api";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Campaigns = props => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [recentlyFetched, setRecentlyFetched] = useState(false);

  const checkGmailAuth = useCallback(async () => {
    const gmailTokenExists = await checkForGmailToken();
    if (!gmailTokenExists) {
      props.history.push(`${props.location.pathname}/email-auth-dialog`);
    }
  }, [props]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getCampaigns();
        setCampaigns(res.data);
        checkGmailAuth();
      } catch (error) {
        console.log(error);
      }
    };

    if (!recentlyFetched) {
      fetchCampaigns();
      setRecentlyFetched(true);
    }
  }, [recentlyFetched, checkGmailAuth]);

  return (
    <Grid item container className={classes.root}>
      <Switch>
        <Route path="/home/campaigns/:campaignId" component={Campaign} />
        <Route path={["/home", "/home/campaigns"]}>
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

export default withRouter(Campaigns);
