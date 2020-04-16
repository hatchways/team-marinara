import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { getCampaign, getCampaignProspects, getCampaignSteps } from "Utils/api";

import Prospects from "./CampaignProspects";
import Summary from "./CampaignSummary";
import Sidebar from "./CampaignSidebar";

const Campaign = props => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState({});
  const [prospects, setProspects] = useState([]);
  const [steps, setSteps] = useState([]);
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

    const getSteps = async campaignId => {
      try {
        const res = await getCampaignSteps(campaignId);
        setSteps(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!recentlyFetched) {
      fetchCampaign(campaignId);
      getProspects(campaignId);
      getSteps(campaignId);
      setRecentlyFetched(true);
    }
  }, [recentlyFetched, campaignId, props]);

  return (
    <React.Fragment>
      <Sidebar campaignId={campaignId} />
      <Switch>
        <Route path="/home/campaigns/*/prospects">
          <Prospects campaign={campaign} prospects={prospects} />
        </Route>
        <Route path={["/home/campaigns/*", "/home/campaigns/*/summary"]}>
          <Summary campaign={campaign} steps={steps} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Campaign;
