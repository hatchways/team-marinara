import React from "react";
import { withStyles, Tab } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const styles = () => ({
  root: {
    fontSize: "1rem",
    fontWeight: "bold",
    opacity: 1
  },
  selected: {
    color: `${colors.lightGreen}`
  }
});

const StyledTab = props => <Tab disableRipple {...props} />;

export default withStyles(styles)(StyledTab);
