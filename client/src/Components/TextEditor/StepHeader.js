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
    width: "100%"
  },
  stepName: {
    fontWeight: "bold",
    borderRight: `1px solid ${colors.midGray}`,
    paddingRight: "1rem"
  },
  editTemplateText: {
    color: colors.darkGray,
    paddingLeft: "1rem",
    flexGrow: 1,
    width: "auto"
  },
  typeSubjectRows: {
    alignItems: "center",
    padding: "0.5rem 0 0.5rem 0",
    borderBottom: `1px solid ${colors.midGray}`,
    width: "100%"
  },
  typeSubjectTitles: {
    color: colors.darkGray,
    width: "auto",
    paddingRight: "1rem"
  },
  subjectInput: {
    width: "auto",
    flexGrow: 1
  }
}));

const AddStepHeader = props => {
  const classes = useStyles();
  const { handleClose, subject, setSubject, step } = props;

  return (
    <Grid container direction="column">
      <Grid container item className={classes.header}>
        <Grid item className={classes.stepName}>
          <Typography variant="h4">
            {props.step ? props.step.name : "New Step"}
          </Typography>
        </Grid>
        <Grid item container className={classes.editTemplateText}>
          <Typography variant="h6">Edit Template</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container item className={classes.typeSubjectRows}>
        <Grid item className={classes.typeSubjectTitles}>
          <Typography>Subject</Typography>
        </Grid>
        <Grid className={classes.subjectInput}>
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
