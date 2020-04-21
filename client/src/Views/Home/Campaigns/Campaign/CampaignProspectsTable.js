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
import Row from "./ProspectRow";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "0 3rem"
  },
  tableContainer: {
    padding: 10,
    backgroundColor: `${colors.white}`,
    //border: `1px solid ${colors.darkGray}`,
    borderRadius: 7
  },
  headRow: {
    backgroundColor: `${colors.lightGreen}`
  },
  headCell: {
    fontSize: "1rem",
    fontWeight: "bold",
    height: "3rem",
    color: `${colors.white}`,
    "&:first-child": {
      borderRadius: "7px 0 0 7px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },
  table: {
    borderCollapse: "separate"
  }
});

const CampaignProspectsTable = props => {
  const classes = useStyles();
  const rows = props.prospects.map(curr => (
    <Row prospect={curr} key={curr.prospectId._id} />
  ));
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.headRow}>
            <TableRow className={classes.headRow}>
              <TableCell className={classes.headCell}>Email</TableCell>
              <TableCell align="center" className={classes.headCell}>
                First Name
              </TableCell>
              <TableCell align="center" className={classes.headCell}>
                Last Name
              </TableCell>
              <TableCell align="center" className={classes.headCell}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

export default CampaignProspectsTable;
