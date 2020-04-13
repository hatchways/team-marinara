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
import Row from "./CampaignsTableRow";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "0 3rem"
  },
  tableContainer: {
    padding: 15,
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

const CampaignsTable = props => {
  const classes = useStyles();
  const rows = props.campaigns.map(curr => (
    <Row campaign={curr} key={curr._id} />
  ));
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.headRow}>
            <TableRow className={classes.headRow}>
              <TableCell className={classes.headCell}>Name</TableCell>
              <TableCell align="center" className={classes.headCell}>
                Created
              </TableCell>
              <TableCell align="center" className={classes.headCell}>
                Prospects
              </TableCell>
              <TableCell align="center" className={classes.headCell}>
                Replies
              </TableCell>
              <TableCell align="center" className={classes.headCell}>
                Steps
              </TableCell>
              <TableCell className={classes.headCell}>Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

export default CampaignsTable;
