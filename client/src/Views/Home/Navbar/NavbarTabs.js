import React from "react";

import StyledTabs from "Components/Tabs/StyledTabs";
import StyledTab from "Components/Tabs/StyledTab";

const NavbarTabs = props => {
  const [active, setActive] = React.useState("campaigns");
  const onChange = (event, value) => {
    setActive(value);
  };
  return (
    <StyledTabs value={active} onChange={onChange}>
      <StyledTab label="Campaigns" value="campaigns" />
      <StyledTab label="Prospects" value="prospects" />
      <StyledTab label="Templates" value="templates" />
      <StyledTab label="Reporting" value="reporting" />
    </StyledTabs>
  );
};

export default NavbarTabs;
