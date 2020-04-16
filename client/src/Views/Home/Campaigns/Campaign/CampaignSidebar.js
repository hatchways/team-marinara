import React, { useState, useEffect } from "react";
import { Grid, Tabs, Tab, makeStyles, withStyles } from "@material-ui/core";
import colors from "Components/Styles/Colors";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "21rem",
    backgroundColor: `${colors.white}`,
    height: "100%",
    padding: "3rem"
  }
});

const SidebarTabs = withStyles({
  indicator: {
    display: "none"
  }
})(Tabs);

const SidebarTab = withStyles({
  root: {
    width: "100%",
    height: "3rem",
    borderRadius: 10,
    fontSize: "1rem",
    fontWeight: "bold",
    color: colors.black,
    marginBottom: "1rem",
    textTransform: "uppercase"
  },
  selected: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
    color: colors.white
  },
  wrapper: {
    alignItems: "flex-start",
    textAlign: "left",
    paddingLeft: "2rem"
  }
})(Tab);

const CampaignSidebar = props => {
  const classes = useStyles();
  const [active, setActive] = useState("summary");
  const match = useRouteMatch("/home/campaigns/*/:page");

  useEffect(() => {
    if (!match) {
      setActive("summary");
    } else {
      setActive(match.params.page);
    }
  }, [match]);

  const handleChange = (event, value) => {
    setActive(value);
  };

  return (
    <Grid item className={classes.root}>
      <SidebarTabs
        orientation="vertical"
        value={active}
        onChange={handleChange}
      >
        <SidebarTab
          label="Summary"
          value="summary"
          component={Link}
          to={`/home/campaigns/${props.campaignId}/summary`}
          disableRipple
        />
        <SidebarTab
          label="Prospects"
          value="prospects"
          component={Link}
          to={`/home/campaigns/${props.campaignId}/prospects`}
          disableRipple
        />
      </SidebarTabs>
    </Grid>
  );
};

export default CampaignSidebar;
