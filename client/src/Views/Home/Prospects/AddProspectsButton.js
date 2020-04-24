import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import { Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import StyledAddProspectButton from "Components/Button/StyledAddProspectButton";

export default function AddProspectButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleProspectCreateModal = () => {
    console.log("first step");
    props.handleCreateProspectOpen();
  };

  return (
    <Grid item>
      <StyledAddProspectButton
        //component={Link}
        //to="/home/prospects/upload">
        onClick={handleClick}
      >
        Add New Prospects
      </StyledAddProspectButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProspectCreateModal}>
          <ListItemText primary="Add a Prospect" />
        </MenuItem>
        <MenuItem component={Link} to="/home/prospects/upload">
          <ListItemText primary="Upload Prospects"></ListItemText>
        </MenuItem>
      </Menu>
    </Grid>
  );
}
