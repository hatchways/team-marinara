import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

import DataColumn from "Components/DataColumn/DataColumn";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.white,
    padding: "2rem",
    borderRadius: 7,
    border: `2px solid ${colors.midGray}`,
    width: "100%",
    marginBottom: "2rem"
  },
  nameContainer: {
    flexGrow: 1
  },
  name: {
    fontSize: "1rem",
    fontWeight: "bold"
  }
});

const Step = props => {
  const classes = useStyles();

  const generateColumns = summary => {
    const columns = [];
    const sent = summary.sent;

    columns.push(<DataColumn label="Sent" key="Sent" value={sent} />);

    ["Opened", "Clicked", "Replied"].forEach(curr => {
      let value;

      if (!sent) {
        value = "0%";
      } else {
        value = 100 * (summary[curr.toLowerCase()] / sent);
        value = Math.round(value).toString() + "%";
      }

      columns.push(<DataColumn label={curr} key={curr} value={value} />);
    });

    return columns;
  };

  return (
    <Grid item container alignItems="center" className={classes.root}>
      <Grid item className={classes.nameContainer}>
        <Typography className={classes.name}>{props.step.name}</Typography>
      </Grid>
      <DataColumn label="Prospects" value={props.step.prospects.length} />
      {generateColumns(props.step.summary)}
    </Grid>
  );
};

export default Step;
