import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { getCampaign, getCampaignProspects } from "Utils/api";

import Header from "./CampaignHeader";
import Table from "./CampaignProspectsTable";
import Sidebar from "./CampaignSidebar";

const Campaign = props => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState({});
  const [prospects, setProspects] = useState([]);
  const [recentlyFetched, setRecentlyFetched] = useState(false);

  useEffect(() => {
    const fetchCampaign = async campaignId => {
      try {
        const res = await getCampaign(campaignId);
        setCampaign(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const getProspects = async campaignId => {
      try {
        const res = await getCampaignProspects(campaignId);
        setProspects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!recentlyFetched) {
      fetchCampaign(campaignId);
      getProspects(campaignId);
      setRecentlyFetched(true);
    }
  }, [recentlyFetched, campaignId, props]);

  return (
    <React.Fragment>
      <Sidebar />
      <Grid
        item
        container
        direction="column"
        style={{ flexGrow: 1, width: "auto" }}
      >
        <Header name={campaign.name} />
        <Table prospects={prospects} />
      </Grid>
    </React.Fragment>
  );
};

export default Campaign;
