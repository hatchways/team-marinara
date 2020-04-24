import React, { useState } from "react";

import {
  makeStyles,
  FormControl,
  MenuItem,
  FormHelperText,
  Select
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  formControl: {
    width: "150px"
  },
  errorText: {
    color: "red"
  }
});

const ProspectUploadHeaderSelect = props => {
  const classes = useStyles();

  const [value, setValue] = useState(props.requestHeaders[props.index]);

  const handleChange = event => {
    console.log(props.selectErrors);
    props.handleSelectChange(event);
    setValue(event.target.value);
  };

  const menuItems = props.selectOptions.map(curr => (
    <MenuItem value={curr}>{curr}</MenuItem>
  ));

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select name={props.index} value={value} onChange={handleChange}>
        {menuItems}
      </Select>
      <FormHelperText className={classes.errorText}>
        {props.selectErrors[props.index] !== ""
          ? "Cannot have two headers with the same value"
          : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default ProspectUploadHeaderSelect;
