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
  const [activeStep, setActiveStep] = useState("All");
  const [stepBarArray, setStepBarArray] = useState([]);
  const [filteredProspects, setFilteredProspects] = useState([]);
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
        setFilteredProspects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSteps = async campaignId => {
      try {
        const res = await getCampaignSteps(campaignId);
        setSteps(res.data);
        const stepArray = [
          "All",
          "Pending",
          ...res.data.map(step => step.name)
        ];
        setStepBarArray(stepArray);
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

  const triggerFetch = () => {
    setRecentlyFetched(false);
  };

  const handleStepSelect = stepName => {
    setActiveStep(stepName);
    if (stepName === "All") {
      setFilteredProspects(prospects);
    } else if (stepName === "Pending") {
      filterPendingProspects();
    } else {
      const step = steps.find(step => {
        return step.name === stepName;
      });

      let stepProspects = [];

      stepProspects = step.prospects.map(prospect => prospect.prospectId);
      console.log(stepProspects);
      let newFilteredProspectList = [];
      newFilteredProspectList = prospects.filter(prospect =>
        stepProspects.includes(prospect.prospectId._id)
      );
      setFilteredProspects(newFilteredProspectList);
    }
  };

  const filterPendingProspects = () => {
    let totalActiveProspects = [];
    steps.forEach(step => {
      totalActiveProspects = totalActiveProspects.concat(step.prospects);
    });
    totalActiveProspects = totalActiveProspects.map(
      prospect => prospect.prospectId
    );
    let totalProspects = prospects;
    setFilteredProspects(
      totalProspects.filter(
        prospect => !totalActiveProspects.includes(prospect.prospectId._id)
      )
    );
  };

  return (
    <React.Fragment>
      <Sidebar campaignId={campaignId} />
      <Switch>
        <Route path="/home/campaigns/*/prospects">
          <Prospects
            steps={steps}
            campaign={campaign}
            prospects={filteredProspects}
            stepBarArray={stepBarArray}
            activeStep={activeStep}
            handleStepSelect={handleStepSelect}
          />
        </Route>
        <Route path={["/home/campaigns/*", "/home/campaigns/*/summary"]}>
          <Summary
            campaign={campaign}
            steps={steps}
            triggerFetch={triggerFetch}
          />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Campaign;
