import React from "react";
import { Grid, Typography, withStyles, Tabs, Tab } from "@material-ui/core";

const NavbarTabs = props => {
  const [active, setActive] = React.useState("campaigns");
  const onChange = (event, value) => {
    setActive(value);
  };
  return (
    <Grid item>
      <Tabs value={active} onChange={onChange}>
        <Tab label="Campaigns" value="campaigns" />
        <Tab label="Prospects" value="prospects" />
        <Tab label="Templates" value="templates" />
        <Tab label="Reporting" value="reporting" />
      </Tabs>
    </Grid>
  );
};

export default NavbarTabs;
