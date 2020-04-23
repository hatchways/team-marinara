import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog,
  Divider
} from "@material-ui/core";

const DataSelectDialog = props => {
  const { handleCloseTemplateModal, open, dataType, data } = props;

  const handleClose = () => {
    handleCloseTemplateModal();
  };

  const handleListItemClick = template => {
    handleCloseTemplateModal(template);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Select {dataType}</DialogTitle>
      <Divider />
      <List>
        {data.map(datum => (
          <ListItem
            button
            onClick={() => handleListItemClick(datum)}
            key={datum._id}
          >
            <ListItemText primary={datum.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default DataSelectDialog;
