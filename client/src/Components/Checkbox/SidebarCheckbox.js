import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const SidebarCheckbox = withStyles({
    root: {
      color: "#808080",
      '&$checked': {
        color: "#4FBE75",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


export default (SidebarCheckbox);