import React, { useState } from "react";

import {
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  makeStyles,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Paper,
  TableBody
} from "@material-ui/core";
import StyledRadio from "Components/RadioButton/StyledRadio";

import StyledButton from "Components/Button/StyledButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import colors from "Components/Styles/Colors";
import ProspectUploadHeaderSelect from "./ProspectUploadHeaderSelect";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  headRow: {
    backgroundColor: `${colors.gray}`
  },
  headCell: {
    width: "150px"
  },
  headCellExtend: {}
});

const ProspectUploadFormTableRow = props => {
  const classes = useStyles();

  const [age, setAge] = useState("");

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.cell}>
        <ProspectUploadHeaderSelect
          index={props.index}
          selectOptions={props.headerOptions}
        />
      </TableCell>
      <TableCell className={classes.cell}>Column 2</TableCell>
      <TableCell className={classes.cell}>Column 3</TableCell>
    </TableRow>
  );
};

export default ProspectUploadFormTableRow;
