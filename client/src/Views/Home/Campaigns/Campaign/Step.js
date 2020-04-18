import React from "react";
import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  withStyles
} from "@material-ui/core";
import {
  Email as EmailIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";

import colors from "Components/Styles/Colors";
import DataColumn from "Components/DataColumn/DataColumn";
import { moveProspectsToStep } from "Utils/api";

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
    fontSize: "1.2rem",
    fontWeight: "bold"
  },
  button: {
    marginRight: "1rem",
    "&:hover": {
      color: colors.green
    }
  }
});

const EmailTooltip = withStyles({
  tooltip: {
    fontSize: "0.8rem"
  }
})(Tooltip);

const Step = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const moveProspects = async () => {
    try {
      const prospectIds = props.prevStep.prospects.map(curr => curr.prospectId);
      await moveProspectsToStep(props.campaignId, props.step._id, prospectIds);
    } catch (error) {
      console.log(error);
    }
    props.triggerFetch();
    closeMenu();
  };

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
      <Grid item>
        <EmailTooltip title="Edit Email">
          <IconButton
            className={classes.button}
            onClick={() => props.openEditor(props.step)}
          >
            <EmailIcon />
          </IconButton>
        </EmailTooltip>
      </Grid>
      <Grid item className={classes.nameContainer}>
        <Typography className={classes.name}>{props.step.name}</Typography>
      </Grid>
      <DataColumn label="Prospects" value={props.step.prospects.length} />
      {generateColumns(props.step.summary)}
      <Grid item>
        <IconButton onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem onClick={moveProspects}>Move prospects to this step</MenuItem>
      </Menu>
    </Grid>
  );
};

export default Step;
