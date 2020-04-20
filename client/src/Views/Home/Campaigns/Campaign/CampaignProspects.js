import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import Header from "./CampaignProspectsHeader";
import Table from "./CampaignProspectsTable";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "auto"
  }
});

const CampaignProspects = props => {
  const classes = useStyles();
  const [prospectsList, setProspectsList] = useState(props.prospects);
  const [filteredProspects, setFilteredProspects] = useState(props.prospects);
  const [recentlyFetched, setRecentlyFetched] = useState(false);

  useEffect(() => {
    if (props.prospects.length > 0 && !recentlyFetched) {
      setProspectsList(props.prospects);
      setFilteredProspects(props.prospects);
      setRecentlyFetched(true);
    }

    /*if (!recentlyFetched) {
      getCampaignProspects();
    }*/
  });

  const handleStepSelect = stepName => {
    console.log("Filtering for : " + stepName);
    if (stepName === "All") {
      setFilteredProspects(prospectsList);
    } else if (stepName === "Pending") {
      filterPendingProspects();
    } else {
      const step = props.steps.find(step => {
        return step.name === stepName;
      });

      let stepProspects = [];
      for (let i = 0; i < step.prospects.length; i++) {
        stepProspects.push(step.prospects[i].prospectId);
      }
      let newFilteredProspectList = [];
      newFilteredProspectList = prospectsList.filter(prospect =>
        stepProspects.includes(prospect.prospectId._id)
      );
      setFilteredProspects(newFilteredProspectList);
    }
  };

  const filterPendingProspects = () => {
    let totalActiveProspects = [];
    props.steps.forEach(step => {
      totalActiveProspects = totalActiveProspects.concat(step.prospects);
    });
    totalActiveProspects = totalActiveProspects.map(
      prospect => prospect.prospectId
    );
    let totalProspects = prospectsList;

    console.log(totalActiveProspects);
    console.log(totalProspects);
    setFilteredProspects(
      totalProspects.filter(
        prospect => !totalActiveProspects.includes(prospect.prospectId._id)
      )
    );
  };

  return (
    <Grid item container direction="column" className={classes.root}>
      <Header
        handleStepSelect={handleStepSelect}
        steps={props.steps}
        name={props.campaign.name}
      />
      <Table prospects={filteredProspects} />
    </Grid>
  );
};

export default CampaignProspects;
