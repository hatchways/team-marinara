import React, { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Typography,
  Paper,
  TextField,
  Dialog,
  Divider,
  makeStyles
} from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";
import { createProspect } from "Utils/api";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },

  dialog: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  dialogTitle: {
    fontSize: "2rem"
  },
  form: {
    width: "100%"
    //marginTop: "2rem"
  },
  inputContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: "2rem",
    width: "100%"
  }
});

export default function CreateProspectForm(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("open");
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      status: status
    };
    console.log(data);
    try {
      const result = await createProspect(data);
      console.log(result);
      props.onClose();
    } catch (error) {
      setErrors({ ...error.response.data });
      console.log(errors);
    }
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={props.open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <div className={classes.dialog}>
        <DialogTitle id="simple-dialog-title">
          <Typography className={classes.dialogTitle}>
            Create a Prospect
          </Typography>
        </DialogTitle>
        <Divider />
        <form method="POST" onSubmit={handleSubmit} className={classes.form}>
          <Grid
            container
            alignItems="center"
            direction="column"
            spacing={2}
            sm={12}
            className={classes.inputContainer}
          >
            <Grid item sm={12}>
              <TextField
                label="First name"
                name="First Name"
                variant="outlined"
                fullWidth
                hintText="First Name"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                error={"firstName" in errors}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Last name"
                name="Last Name"
                variant="outlined"
                fullWidth
                hintText="Last Name"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                error={"lastName" in errors}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Email"
                name="Email"
                variant="outlined"
                hintText="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                error={"email" in errors}
                helperText={errors.email}
              />
            </Grid>
            <Grid item sm={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  aria-label="status"
                  name="status"
                  row
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <StyledButton onClick={handleSubmit}>Submit</StyledButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
}
