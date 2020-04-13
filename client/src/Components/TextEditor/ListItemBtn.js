import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

const ListItemBtn = props => {
  return (
    <ListItem button>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};

export default ListItemBtn;
