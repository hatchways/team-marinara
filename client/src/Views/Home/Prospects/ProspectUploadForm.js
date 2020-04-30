import React from "react";

import { Grid, DialogTitle, makeStyles } from "@material-ui/core";
import ProspectUploadFormTable from "./ProspectUploadFormTable";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  tableContainer: {
    paddingTop: "1rem"
  },
  selectedTag: {
    paddingBottom: "1rem",
    paddingLeft: "1rem",
    alignContent: "center",
    fontWeight: "bold",
    fontSize: "1.5rem"
  }
});

const ProspectUploadForm = props => {
  const classes = useStyles();

  const headerOptions = ["firstName", "lastName", "email", "status"];

  return (
    <div className={classes.dialog}>
      <DialogTitle id="simple-dialog-title"></DialogTitle>
      <form method="POST" className={classes.form}>
        <Grid
          container
          alignItems="center"
          direction="row"
          className={classes.tableContainer}
        >
          <ProspectUploadFormTable
            importedHeaders={props.importedHeaders}
            importedData={props.importedData}
            headerOptions={headerOptions}
            selectErrors={props.selectErrors}
            requestHeaders={props.requestHeaders}
            handleSelectChange={props.handleSelectChange}
          />
        </Grid>
      </form>
    </div>
  );
};

export default ProspectUploadForm;
