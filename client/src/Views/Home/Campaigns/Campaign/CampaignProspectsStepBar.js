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
    maxWidth: "150px",
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
    maxWidth: "150px",
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

const defaultStepOptions = ["All", "Pending"];

const CampaignProspectsStepBar = props => {
  const classes = useStyles();
  const [stepBarArray, setStepBarArray] = useState([]);
  const [recentlyFetched, setRecentlyFetched] = useState(false);
  const [selectedButton, setSelectedButton] = useState([]);

  useEffect(() => {
    if (props.steps.length > 0 && !recentlyFetched) {
      let result = props.steps.map(step => step.name);
      result = defaultStepOptions.concat(result);
      setStepBarArray(result);
      let buttonActiveArray = [];
      if (selectedButton.length > 0) {
        buttonActiveArray = selectedButton;
      } else {
        for (let i = 0; i < result.length; i++) {
          if (i === 0) {
            buttonActiveArray.push(true);
          } else {
            buttonActiveArray.push(false);
          }
        }
      }
      setSelectedButton(buttonActiveArray);
      setRecentlyFetched(true);
    }
  });

  const handleClick = e => {
    const buttonPosition = e.target.getAttribute("buttonposition");
    let buttonArray = selectedButton;
    //reset all button values except one to false
    for (let i = 0; i < selectedButton.length; i++) {
      if (i === parseInt(buttonPosition)) {
        buttonArray[i] = true;
      } else {
        buttonArray[i] = false;
      }
    }
    setSelectedButton(buttonArray);
    setRecentlyFetched(false);
    props.handleStepSelect(e.target.getAttribute("value"));
  };

  const stepBar = stepBarArray.map((step, i) => (
    <TableCell
      onClick={e => handleClick(e)}
      className={
        selectedButton[i] ? classes.stepButtonColored : classes.stepButton
      }
      buttonposition={i}
      value={step}
      key={step.concat(i)}
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
