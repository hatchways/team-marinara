import React from "react";

import {
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  makeStyles,
  Paper,
  TableBody
} from "@material-ui/core";
import StyledRadio from "Components/RadioButton/StyledRadio";

import StyledButton from "Components/Button/StyledButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import colors from "Components/Styles/Colors";
import Row from "./ProspectUploadFormTableRow";

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

const ProspectUploadFormTable = props => {
  const classes = useStyles();
  const rows = props.headerOptions.map((curr, index) => (
    <Row headerOptions={props.headerOptions} index={index} key={index} />
  ));

  return (
    <Grid item className={classes.root}>
      <Paper className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.headRow}>
            <TableRow className={classes.headRow}>
              <TableCell className={classes.headCell}>
                Mail Sender Prospect Field
              </TableCell>
              <TableCell className={classes.headCell}>
                Import Data Header
              </TableCell>
              <TableCell className={classes.headCellExtend}>
                Example Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

export default ProspectUploadFormTable;
