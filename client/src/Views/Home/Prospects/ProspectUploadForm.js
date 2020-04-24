import React from "react";

import { Grid, DialogTitle, Typography, makeStyles } from "@material-ui/core";
import ProspectUploadFormTable from "./ProspectUploadFormTable";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  tableContainer: {
    paddingTop: "1rem"
  }
});

const ProspectUploadForm = props => {
  const classes = useStyles();
  const { file } = props;

  const headerOptions = ["firstName", "lastName", "email", "status"];

  return (
    <div className={classes.dialog}>
      <DialogTitle id="simple-dialog-title"></DialogTitle>
      <form method="POST" className={classes.form}>
        <Typography>{file.name} selected</Typography>
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
