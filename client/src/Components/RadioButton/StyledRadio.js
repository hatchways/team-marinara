import React from "react";
import { Radio, withStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const StyledRadio = withStyles({
  root: {
    "&$checked": {
      color: `${colors.green}`
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

export default StyledRadio;
