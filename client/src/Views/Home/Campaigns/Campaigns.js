import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import StyledButton from "Components/Button/StyledButton";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const Campaigns = props => {
  const openTextEditor = () => {
    props.history.push(`${props.match.url}/text-editor`);
  };

  return (
    <Grid
      item
      container
      direction="column"
      className={props.classes.root}
      alignContent="center"
      alignItems="center"
    >
      <Grid>
        <Typography variant="h1">Campaigns Page</Typography>
      </Grid>
      <Grid>
        <StyledButton onClick={openTextEditor}>Add Step</StyledButton>
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(Campaigns);
