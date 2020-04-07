import React from "react";
import { withStyles, Tabs } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = () => ({
  root: {
    height: "100%"
  },
  flexContainer: {
    height: "100%"
  },
  indicator: {
    top: 0,
    backgroundColor: `${colors.green}`,
    height: 5
  }
});

const StyledTabs = props => <Tabs {...props} />;

export default withStyles(styles)(StyledTabs);
