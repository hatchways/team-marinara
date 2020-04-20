import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
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
    height: "1rem",
    width: "75px",
    textAlign: "center",
    borderRight: "1px solid #bbb",
    borderBottom: "1px solid #bbb",
    borderTop: "1px solid #bbb",
    borderSpacing: "0",
    borderCollapse: "separate",
    "&:hover": {
      backgroundColor: `${colors.green}`,
      color: `${colors.white}`
    },
    "&:first-child": {
      borderLeft: "1px solid #bbb",
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },

  stepButtonColored: {
    backgroundColor: `${colors.green}`,
    color: "#ffffff",
    width: "75px",
    textAlign: "center",
    borderRight: "1px solid #bbb",
    borderBottom: "1px solid #bbb",
    borderTop: "1px solid #bbb",
    borderSpacing: "0",
    borderCollapse: "separate",
    "&:first-child": {
      borderLeft: "1px solid #bbb",
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },

  stepBar: {
    borderCollapse: "separate"
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
      setStepBarArray(defaultStepOptions.concat(result));
      result = defaultStepOptions.concat(result);
      let activeArray = [];
      if (selectedButton.length > 0) {
        activeArray = selectedButton;
      } else {
        for (let i = 0; i < result.length; i++) {
          if (i == 0) {
            activeArray.push(true);
          } else {
            activeArray.push(false);
          }
        }
      }
      setSelectedButton(activeArray);
      setRecentlyFetched(true);
    }
  });

  const handleClick = e => {
    const buttonPosition = e.target.getAttribute("buttonposition");
    let buttonArray = selectedButton;
    for (let i = 0; i < selectedButton.length; i++) {
      if (i == buttonPosition) {
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
      buttonPosition={i}
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
