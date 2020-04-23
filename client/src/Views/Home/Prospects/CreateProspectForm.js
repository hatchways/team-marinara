import React, { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Paper,
  TextField,
  Dialog,
  Divider
} from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";
import { createProspect } from "Utils/api";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function CreateProspectForm(props) {
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
    >
      <DialogTitle id="simple-dialog-title">Create a Prospect</DialogTitle>
      <Divider />
      <form method="POST" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First name"
              name="First Name"
              variant="outlined"
              hintText="First Name"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              error={"firstName" in errors}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              name="Last Name"
              variant="outlined"
              hintText="Last Name"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              error={"lastName" in errors}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
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
          <FormControl component="fieldset">
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <FormControlLabel value="open" control={<Radio />} label="Open" />
              <FormControlLabel
                value="closed"
                control={<Radio />}
                label="Closed"
              />
            </RadioGroup>
          </FormControl>
          <Grid item xs={3}>
            <StyledButton onClick={handleSubmit}>Submit</StyledButton>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}
