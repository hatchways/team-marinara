import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  makeStyles,
  InputBase
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import colors from "Components/Styles/Colors.js";

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: "1.5rem",
    borderBottom: `1px solid ${colors.midGray}`,
    alignItems: "center",
    justifyContent: "flex-start",
    direction: "row"
  },
  stepName: {
    fontWeight: "bold",
    borderRight: `1px solid ${colors.midGray}`
  },
  editTemplateText: {
    color: colors.darkGray,
    paddingLeft: "1rem"
  },
  typeSubjectRows: {
    alignItems: "center",
    padding: "0.5rem 0 0.5rem 0",
    borderBottom: `1px solid ${colors.midGray}`
  },
  typeSubjectTitles: {
    color: colors.darkGray
  },
  formControl: {
    minWidth: 120
  }
}));

const AddStepHeader = props => {
  const classes = useStyles();
  const { handleClose, subject, setSubject } = props;

  return (
    <Grid container>
      <Grid container item xs={12} className={classes.header}>
        <Grid item className={classes.stepName} xs={2}>
          <Typography variant="h4">Step 1</Typography>
        </Grid>
        <Grid item container className={classes.editTemplateText} xs={8}>
          <Typography variant="h6">Edit Template</Typography>
        </Grid>
        <Grid item container xs={2} alignItems="flex-start" justify="flex-end">
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container item className={classes.typeSubjectRows} xs={12}>
        <Grid item className={classes.typeSubjectTitles} xs={1}>
          <Typography>Subject</Typography>
        </Grid>
        <Grid item xs={10}>
          <InputBase
            id="subject"
            autoComplete="off"
            fullWidth={true}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddStepHeader;
