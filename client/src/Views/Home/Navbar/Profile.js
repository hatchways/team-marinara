import React, { useContext, useState, useRef } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  withStyles
} from "@material-ui/core";
import { AccountCircle, ArrowDropDown } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

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
  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownArrowRef = useRef(null);

  const toggleMenu = e => {
    //When the menu is open, clicking anywhere on the page triggers the top-level component's onClick listener
    //This prevents state from being changed unless the click was within the original Profile component
    if (profileRef && profileRef.current.contains(e.target)) {
      setOpen(prevOpen => !prevOpen);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    props.history.push(`${props.location.pathname}/email-auth-dialog`);
  };

  return (
    <Grid
      item
      container
      className={props.classes.root}
      alignItems="center"
      spacing={1}
      onClick={toggleMenu}
      ref={profileRef}
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
        <ArrowDropDown
          className={props.classes.dropdownArrow}
          ref={dropdownArrowRef}
        />
      </Grid>

      <Menu
        anchorEl={dropdownArrowRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        getContentAnchorEl={null}
        open={open}
        onClose={onClose}
      >
        <MenuItem onClick={handleClick}>Link Gmail</MenuItem>
        <MenuItem onClick={onClose}>Edit Profile</MenuItem>
        <MenuItem onClick={context.logOut}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default withStyles(styles)(withRouter(Profile));
