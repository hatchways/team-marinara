import React from "react";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";

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

const CampaignsTableRow = props => {
  const classes = useStyles();
  const { history } = props;

  const formatDate = dateString => {
    let date = new Date(dateString);
    date = date.toDateString().split(" ");
    const month = date[1];
    const day = Number.parseInt(date[2]);
    return `${month} ${day}`;
  };

  const onClick = () => {
    history.push(`/home/campaigns/${props.campaign._id}`);
  };

  return (
    <TableRow
      key={props.campaign._id}
      className={classes.row}
      onClick={onClick}
    >
      <TableCell className={classes.cell}>{props.campaign.name}</TableCell>
      <TableCell className={classes.cell} align="center">
        {formatDate(props.campaign.created)}
      </TableCell>
      <TableCell className={classes.cell} align="center">
        {props.campaign.prospects.length}
      </TableCell>
      <TableCell className={classes.cell} align="center">
        {props.campaign.stepsSummary.replied}
      </TableCell>
      <TableCell className={classes.cell} align="center">
        {props.campaign.steps.length}
      </TableCell>
      <TableCell className={classes.cell}></TableCell>
    </TableRow>
  );
};

export default withRouter(CampaignsTableRow);
