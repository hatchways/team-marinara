import React, { useState, useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { getCampaign } from "Utils/api";

const Campaign = props => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState({});
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

    if (!recentlyFetched) {
      fetchCampaign(campaignId);
      setRecentlyFetched(true);
    }
  }, [recentlyFetched, campaignId]);

  return (
    <Grid item container>
      <Typography variant="h6">{campaign.name}</Typography>
    </Grid>
  );
};

export default Campaign;
