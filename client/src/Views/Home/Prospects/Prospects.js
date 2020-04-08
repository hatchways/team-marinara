import React, { Component } from "react";
import { Grid, withStyles, Typography } from "@material-ui/core";
import { Route } from "react-router-dom";
import { Box, Table, TableBody, TableCell, TableHead, TableRow }
   from "@material-ui/core/";
import { getProspectData } from "Utils/api";
import AuthUserContext from "Components/Session/AuthUserContext";
import styles from "Components/Table/ProspectTableStyles";
import CloudIcon from "@material-ui/icons/Cloud";
import ProspectTableCheckbox from "Components/Checkbox/ProspectTableCheckbox";

import ProspectSidebar from "./ProspectSidebar";
import ProspectDashboardHeader from "./ProspectDashboardHeader";

class Prospects extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      prospects : [],
      filteredProspects: [],
      user : {},
      checked : false,
      errors: {},
    }
  }
  

  handleClick = (event, id) => {
    console.log(event);
  }
  

  componentDidMount = async () => {
    try {
      this.state.user = this.context.user;
      const res = await getProspectData(this.state.user.id);
      this.setState({
        prospects: res.data,
        filteredProspects : res.data
      });
    } catch(error) {
      this.setState({
        errors: { error }
      });
    }
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  handleFieldChange = (elementId, value) => {
    
    let filteredProspectList = this.state.prospects;
    const newFilteredProspectList = this.state.prospects.filter(p => 
      p.email.toLowerCase().includes(value.toLowerCase()));
    this.setState({filteredProspects : newFilteredProspectList});
  }


  render() {
    const { filteredProspects, prospects, user } = this.state;
    const filteredProspectList = filteredProspects.length ? (
      
      filteredProspects.map((prospect, index) => (
        <TableRow key={prospect.id} hover
        onClick={event => this.handleClick(event, index)}>
          <TableCell className={this.props.classes.prospect_id_cell} align="center">{index + 1}</TableCell>
          <TableCell className={this.props.classes.email_cell}>{prospect.email}</TableCell>
          <TableCell className={this.props.classes.cloud_cell}><CloudIcon className={this.props.classes.cloud_icon_table}></CloudIcon></TableCell>
          <TableCell className={this.props.classes.status_cell} align="center">{prospect.status}</TableCell>
          <TableCell className={this.props.classes.owner_cell} align="center">{user.firstName + " " + user.lastName}</TableCell>
          <TableCell className={this.props.classes.last_contacted_cell} align="center">{"-"}</TableCell>
          <TableCell className={this.props.classes.email_count_cell} align="center">{0}</TableCell>
        </TableRow>
      ))
    ) : 
    (
      //print an empty row when no prospects available - looks a bit nicer
      <TableRow >
          <TableCell className={this.props.classes.prospect_id} align="center"></TableCell>
          <TableCell className={this.props.classes.email}></TableCell>
          <TableCell className={this.props.classes.email}></TableCell>
          <TableCell className={this.props.classes.status} align="center"></TableCell>
          <TableCell className={this.props.classes.owner} align="center"></TableCell>
          <TableCell className={this.props.classes.last_contacted} align="center"></TableCell>
          <TableCell className={this.props.classes.email_count} align="center"></TableCell>
        </TableRow>
    );
    
    
    return (
      
      <Route path="/home/prospects">
            <Grid className={this.props.classes.root} container xs={12} spacing={0}>
                <Grid item xs={3}>
                    <ProspectSidebar
                      onChange={this.handleFieldChange}
                    />
                </Grid>
                <Grid item xs={9}>
                  <Box className={this.props.classes.main}>
                    <Grid
                          className={this.props.classes.root}
                          container
                          direction="column"
                          alignItems="center"
                          wrap="nowrap"
                    >
                      <ProspectDashboardHeader/>
                      <Grid
                          item
                          container
                          direction="column"
                          alignContent="center"
                          alignItems="center"
                          spacing={7}
                          className={this.props.classes.root}
                        >
                  
                          <Grid
                            item
                            container
                            direction="column"
                            alignContent="center"
                            spacing={2}
                            className={this.props.classes.list_entire}
                          >
                            
                            <React.Fragment>
                              <Table size="small" className={this.props.classes.table}>
                                <TableHead className={this.props.classes.table_header}>
                                  <TableRow className={this.props.classes.table_header}>
                                    <TableCell className={this.props.classes.table_header_cell} align="center">
                                      <ProspectTableCheckbox disableRipple={true} checked={this.checked} onChange={this.handleChange} className={this.props.classes.table_checkbox_checked}  /></TableCell>
                                    <TableCell className={this.props.classes.table_header_cell}>Email</TableCell>
                                    <TableCell className={this.props.classes.table_header_cell}align="center"><CloudIcon className={this.props.classes.cloud_icon}></CloudIcon></TableCell>
                                    <TableCell className={this.props.classes.table_header_cell}align="center">Status</TableCell>
                                    <TableCell className={this.props.classes.table_header_cell}align="center">Owner</TableCell>
                                    <TableCell className={this.props.classes.table_header_cell}align="center">Last Contacted</TableCell>
                                    <TableCell className={this.props.classes.table_header_cell}align="right">Emails</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                              {filteredProspectList}
                              </TableBody>
                              </Table>
                              </React.Fragment>    
                            </Grid>
                            {prospects.length==0 ? 
                              <Typography style= {{color: "black"}} className="this.props.empty_prospects"> No Prospects to show</Typography>
                               : <p></p>}
                            </Grid>
                      </Grid>
                  </Box>
                </Grid>
            </Grid>
      </Route>
    )
  }
}

Prospects.contextType = AuthUserContext;

export default withStyles(styles)(Prospects);
