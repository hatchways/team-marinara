import React, { useContext } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  withStyles
} from "@material-ui/core";
import { AccountCircle, ArrowDropDown } from "@material-ui/icons";

import AuthUserContext from "Components/Session/AuthUserContext";

import colors from "Components/Styles/Colors";

const styles = () => ({
  root: {
    width: "auto",
    cursor: "pointer"
  },
  avatar: {
    height: "3rem",
    width: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.white}`,
    marginRight: "0.5rem"
  },
  icon: {
    fontSize: "4rem",
    color: `${colors.darkGray}`
  },
  username: {
    fontSize: "1rem",
    fontWeight: "bold"
  },
  dropdownArrow: {
    opacity: 0.3,
    transform: "translateY(2px)"
  }
});

const Profile = props => {
  const context = useContext(AuthUserContext);
  return (
    <Grid
      item
      container
      className={props.classes.root}
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Avatar className={props.classes.avatar}>
          <AccountCircle className={props.classes.icon} />
        </Avatar>
      </Grid>

      <Grid item>
        <Typography className={props.classes.username}>
          {`${context.user.firstName} ${context.user.lastName}`}
        </Typography>
      </Grid>

      <Grid item>
        <ArrowDropDown className={props.classes.dropdownArrow} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Profile);
