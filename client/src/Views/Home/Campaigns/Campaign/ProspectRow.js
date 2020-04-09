import React from "react";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles({
  cell: {
    fontSize: "1rem",
    fontWeight: "bold",
    height: "3rem"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: `${colors.gray}`
    }
  }
});

const ProspectRow = props => {
  const classes = useStyles();

  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.cell}>
        {props.prospect.prospectId.email}
      </TableCell>
      <TableCell className={classes.cell} align="center">
        {props.prospect.prospectId.firstName}
      </TableCell>
      <TableCell className={classes.cell} align="center">
        {props.prospect.prospectId.lastName}
      </TableCell>
      <TableCell className={classes.cell} align="center">
        {props.prospect.status}
      </TableCell>
    </TableRow>
  );
};

export default ProspectRow;
