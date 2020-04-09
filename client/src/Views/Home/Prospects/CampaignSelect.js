import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { getCampaigns } from "Utils/api";

const CampaignSelectDialog = props => {
  const [campaigns, setCampaigns] = useState([]);
  const { onClose, open } = props;

  useEffect(() => {
    const asyncFunc = async () => {
      const camps = await getCampaigns();
      setCampaigns(camps);
    };
    asyncFunc();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = campaignId => {
    onClose(campaignId);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Select Campaign</DialogTitle>
      <List>
        {campaigns.map(campaign => (
          <ListItem
            button
            onClick={() => handleListItemClick(campaign._id)}
            key={campaign._id}
          >
            <ListItemText primary={campaign.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default CampaignSelectDialog;
