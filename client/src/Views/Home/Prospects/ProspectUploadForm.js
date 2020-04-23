import React from "react";

import {
  Grid,
  DialogTitle,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  makeStyles
} from "@material-ui/core";
import StyledRadio from "Components/RadioButton/StyledRadio";

import StyledButton from "Components/Button/StyledButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import colors from "Components/Styles/Colors";
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
          lg={12}
          className={classes.tableContainer}
        >
          <ProspectUploadFormTable headerOptions={headerOptions} />
        </Grid>
      </form>
    </div>
  );
};

export default ProspectUploadForm;
