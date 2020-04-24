import React from "react";

import { TableCell, TableRow, makeStyles } from "@material-ui/core";
import colors from "Components/Styles/Colors";
import ProspectUploadHeaderSelect from "./ProspectUploadHeaderSelect";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  headRow: {
    backgroundColor: `${colors.gray}`,
    fontWeight: "bold"
  },
  headCell: {
    width: "150px"
  },
  row: {
    backgroundColor: "#FAFAFA",
    fontWeight: "bold"
  }
});

const ProspectUploadFormTableRow = props => {
  const classes = useStyles();

  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.cell}>
        <ProspectUploadHeaderSelect
          index={props.index}
          selectOptions={props.headerOptions}
          selectErrors={props.selectErrors}
          requestHeaders={props.requestHeaders}
          handleSelectChange={props.handleSelectChange}
        />
      </TableCell>
      <TableCell className={classes.cell}>
        {props.importedHeaders[props.index]
          ? props.importedHeaders[props.index]
          : "No header found"}
      </TableCell>
      <TableCell className={classes.cell}>
        {props.importedData[props.index]}
      </TableCell>
    </TableRow>
  );
};

export default ProspectUploadFormTableRow;
