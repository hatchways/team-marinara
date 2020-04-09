import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCampaign } from "Utils/api";

import Header from "./CampaignHeader";

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
    <React.Fragment>
      <Header name={campaign.name} />
    </React.Fragment>
  );
};

export default Campaign;
