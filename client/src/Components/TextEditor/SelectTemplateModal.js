import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog,
  Divider
} from "@material-ui/core";
import { getTemplates } from "Utils/api";

const SelectTemplateModal = props => {
  const [templateList, setTemplateList] = useState([]);
  const { handleCloseTemplateModal, open } = props;

  useEffect(() => {
    const retrieveTemplates = async () => {
      const templates = await getTemplates();
      setTemplateList(templates.data);
    };
    retrieveTemplates();
  }, []);

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
      <DialogTitle id="simple-dialog-title">Select Template</DialogTitle>
      <Divider />
      <List>
        {templateList.map(template => (
          <ListItem
            button
            onClick={() => handleListItemClick(template)}
            key={template._id}
          >
            <ListItemText primary={template.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default SelectTemplateModal;
