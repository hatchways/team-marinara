import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import StyledTabs from "Components/Tabs/StyledTabs";
import StyledTab from "Components/Tabs/StyledTab";

const NavbarTabs = props => {
  const [active, setActive] = React.useState("campaigns");
  const match = useRouteMatch("/home/:page");

  useEffect(() => {
    if (!match) {
      setActive("campaigns");
    } else {
      setActive(match.params.page);
    }
  }, [match]);

  const onChange = (event, value) => {
    setActive(value);
  };

  return (
    <StyledTabs value={active} onChange={onChange}>
      <StyledTab
        label="Campaigns"
        value="campaigns"
        component={Link}
        to="/home/campaigns"
      />
      <StyledTab
        label="Prospects"
        value="prospects"
        component={Link}
        to="/home/prospects"
      />
      <StyledTab
        label="Templates"
        value="templates"
        component={Link}
        to="/home/templates"
      />
    </StyledTabs>
  );
};

export default NavbarTabs;
