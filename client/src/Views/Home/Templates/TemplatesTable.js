import React from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from "@material-ui/core";

import colors from "Components/Styles/Colors";
import Row from "./TemplatesTableRow";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "0 3rem"
  },
  tableContainer: {
    minWidth: "500px",
    backgroundColor: `${colors.white}`,
    borderRadius: 7
  },
  headRow: {
    backgroundColor: `${colors.lightGreen}`
  },
  headCell: {
    fontSize: "1rem",
    fontWeight: "bold",
    height: "2rem",
    width: "50px",
    color: `${colors.white}`,
    "&:first-child": {
      borderRadius: "7px 0 0 7px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },
  table: {
    borderCollapse: "separate",
    margin: "25px 0px 75px 0px",
    padding: "15px"
  }
});

const TemplatesTable = props => {
  const classes = useStyles();

  const headers = props.headerColumns.map(header => (
    <TableCell align="center" key={header} className={classes.headCell}>
      {header}
    </TableCell>
  ));

  const rows = props.filteredTemplates.map(template => (
    <Row
      align="center"
      viewTemplate={props.viewTemplate}
      user={props.user}
      template={template}
      key={template._id}
      handleChange={props.handleChange}
    />
  ));
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.headRow}>
            <TableRow className={classes.headRow}>{headers}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

export default TemplatesTable;
