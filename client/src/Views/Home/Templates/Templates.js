import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import ProspectSidebar from "../Prospects/ProspectSidebar";
import TemplatesHeader from "./TemplatesHeader";
import TemplatesTable from "./TemplatesTable";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const Templates = props => {
  
  return (
    <Grid item container className={props.classes.root}>
      <Grid item xs={3}>
            <ProspectSidebar />
        </Grid>
        
        <Grid item xs={9}>
          <TemplatesHeader />
          <TemplatesTable />
        </Grid>
    </Grid>
  );
  }

export default withStyles(styles)(Templates);
