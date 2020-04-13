import React, { useState } from "react";
import {
  Modal,
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles
} from "@material-ui/core";

import colors from "Components/Styles/Colors";
import { createCampaign } from "Utils/api";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    justifyContent: "center"
  },
  root: {
    backgroundColor: `${colors.white}`,
    width: "38rem",
    borderRadius: 7,
    marginTop: 60,
    padding: "2rem",
    position: "absolute"
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "2rem"
  },
  footer: {
    marginTop: "2rem"
  },
  button: {
    borderRadius: 7,
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "1rem 2.5rem"
  },
  save: {
    backgroundImage: `linear-gradient(to right, ${colors.green}, ${colors.lightGreen})`,
    color: `${colors.white}`
  },
  cancel: {
    color: `${colors.black}`,
    backgroundColor: "inherit"
  }
});

const CreateCampaignModal = props => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const onChange = e => {
    setName(e.target.value);
  };

  const onClose = () => {
    props.setOpen(false);
  };

  const onSubmit = async () => {
    try {
      await createCampaign(name);
      props.setRecentlyFetched(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={props.open} onClose={onClose} className={classes.modal}>
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Typography className={classes.title}>New Campaign</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Campaign Name"
            fullWidth
            value={name}
            onChange={onChange}
          />
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          spacing={1}
          className={classes.footer}
        >
          <Grid item>
            <Button
              className={`${classes.button} ${classes.cancel}`}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={`${classes.button} ${classes.save}`}
              onClick={onSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default CreateCampaignModal;
