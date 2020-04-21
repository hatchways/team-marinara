import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Divider,
  Dialog
} from "@material-ui/core";
import { getCampaigns } from "Utils/api";

const CampaignSelectDialog = props => {
  const [campaigns, setCampaigns] = useState([]);
  const { onClose, open } = props;

  useEffect(() => {
    const asyncFunc = async () => {
      const camps = await getCampaigns();
      const campsData = camps.data;
      setCampaigns(campsData);
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
      <Divider />
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
