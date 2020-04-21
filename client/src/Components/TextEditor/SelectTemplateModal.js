import React, { useEffect, useState } from "react";
import {
  List,
  makeStyles,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog,
  Divider
} from "@material-ui/core";
import colors from "Components/Styles/Colors";
import { getTemplates } from "Utils/api";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    fontSize: "2rem"
  }
}));

const SelectTemplateModal = props => {
  const [templateList, setTemplateList] = useState([]);
  const { handleCloseTemplateModal, open } = props;

  const classes = useStyles();

  useEffect(() => {
    const retrieveTemplates = async () => {
      const templates = await getTemplates();
      console.log(templates);
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
      className={classes.dialogContainer}
    >
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>
        Select Template
      </DialogTitle>
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
