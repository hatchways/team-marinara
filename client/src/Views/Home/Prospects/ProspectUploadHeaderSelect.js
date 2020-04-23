import React, { useState } from "react";

import { makeStyles, FormControl, MenuItem, Select } from "@material-ui/core";
import colors from "Components/Styles/Colors";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  formControl: {
    width: "150px"
  }
});

const ProspectUploadHeaderSelect = props => {
  const classes = useStyles();

  const [value, setValue] = useState(props.selectOptions[props.index]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const menuItems = props.selectOptions.map(curr => (
    <MenuItem value={curr}>{curr}</MenuItem>
  ));

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        id="select"
        value={value}
        onChange={handleChange}
        //label="Age"
        maxWidth
        fullWidth
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default ProspectUploadHeaderSelect;
