import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

const ListItemBtn = props => {
  return (
    <ListItem button onClick={props.onClick}>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};

export default ListItemBtn;
