import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import colors from "Components/Styles/Colors";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  stepButton: {
    color: `${colors.black}`,
    fontSize: ".8rem",
    fontWeight: "bold",
    padding: "10px 0px 10px 0px",
    height: ".8rem",
    minWidth: "75px",
    maxWidth: "120px",
    textAlign: "center",
    borderRight: `1px solid ${colors.borderGray}`,
    borderBottom: `1px solid ${colors.borderGray}`,
    borderTop: `1px solid ${colors.borderGray}`,
    borderSpacing: "0",
    borderCollapse: "separate",
    "&:hover": {
      backgroundColor: `${colors.lightGreen}`,
      color: `${colors.white}`
    },
    "&:first-child": {
      borderLeft: `1px solid ${colors.borderGray}`,
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },

  stepButtonColored: {
    backgroundColor: `${colors.lightGreen}`,
    color: "#ffffff",
    fontWeight: "bold",
    maxWidth: "120px",
    fontSize: ".8rem",
    height: ".8rem",
    padding: "10px 0px 10px 0px",
    minWidth: "75px",
    textAlign: "center",
    borderRight: `1px solid ${colors.borderGray}`,
    borderBottom: `1px solid ${colors.borderGray}`,
    borderTop: `1px solid ${colors.borderGray}`,
    borderSpacing: "0",
    borderCollapse: "separate",
    "&:first-child": {
      borderLeft: `1px solid ${colors.borderGray}`,
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },

  stepBar: {
    borderCollapse: "separate",
    fontSize: ".8rem",
    height: ".8rem",
    padding: "10px 0px 10px 0px"
  }
});

const CampaignProspectsStepBar = props => {
  const classes = useStyles();

  const { stepBarArray, handleStepSelect, activeStep } = props;

  const handleClick = e => {
    const selected = e.target.getAttribute("value");
    handleStepSelect(selected);
  };

  const stepBar = stepBarArray.map((step, i) => (
    <TableCell
      onClick={e => handleClick(e)}
      className={
        activeStep === step ? classes.stepButtonColored : classes.stepButton
      }
      key={i}
      buttonposition={i}
      value={step}
    >
      {step}
    </TableCell>
  ));

  return (
    <Table className={classes.stepBar}>
      <TableHead className={classes.stepBarRow}>
        <TableRow className={classes.stepBarRow}>{stepBar}</TableRow>
      </TableHead>
    </Table>
  );
};

export default CampaignProspectsStepBar;
