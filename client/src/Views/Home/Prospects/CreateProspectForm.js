import React from "react";
import {
  Grid,
  DialogTitle,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  makeStyles
} from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import colors from "Components/Styles/Colors";
import StyledRadio from "Components/RadioButton/StyledRadio";

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
  },
  inputContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    width: "100%"
  },
  statusLabel: {
    color: `${colors.darkGray}`
  }
});

export default function CreateProspectForm(props) {
  const classes = useStyles();

  const {
    firstName,
    lastName,
    email,
    status,
    errors,
    setCreateSuccess,
    createSuccess,
    handleCreateProspectSubmit,
    handleFormChange
  } = props;

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmit = async e => {
    handleCreateProspectSubmit();
  };

  const handleChange = e => {
    handleFormChange(e);
  };

  const successDialogClose = () => {
    setCreateSuccess(null);
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
            justify="center"
            alignItems="center"
            spacing={2}
            className={classes.inputContainer}
          >
            <Grid item sm={8}>
              <TextField
                label="First name"
                name="createFormFirstName"
                variant="outlined"
                fullWidth
                hintText="First Name"
                onChange={handleChange}
                value={firstName}
                error={"firstName" in errors}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item sm={8}>
              <TextField
                label="Last name"
                name="createFormLastName"
                variant="outlined"
                fullWidth
                hintText="Last Name"
                onChange={handleChange}
                value={lastName}
                error={"lastName" in errors}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item sm={8}>
              <TextField
                label="Email"
                name="createFormEmail"
                variant="outlined"
                hintText="Email"
                fullWidth
                onChange={handleChange}
                value={email}
                error={"email" in errors}
                helperText={errors.email}
              />
            </Grid>
            <Grid item sm={8}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.statusLabel}>
                  Status
                </FormLabel>
                <RadioGroup
                  aria-label="status"
                  name="createFormStatus"
                  row
                  value={status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="open"
                    control={<StyledRadio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="closed"
                    control={<StyledRadio />}
                    label="Closed"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={8}>
              <StyledButton onClick={handleSubmit}>Submit</StyledButton>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* Success or Failure Dialog */}
      {createSuccess !== null && (
        <Dialog
          open={true}
          maxWidth="md"
          className={(classes.root, classes.dialog)}
          onClose={successDialogClose}
        >
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <DialogContentText>Prospect Created</DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
