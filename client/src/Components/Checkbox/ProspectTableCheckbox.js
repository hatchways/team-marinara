import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const ProspectTableCheckbox = withStyles({
    root: {
      color: "#808080",
      '&$checked': {
        color: "#FAFAFA",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


export default (ProspectTableCheckbox);