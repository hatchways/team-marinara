import React, { Component } from "react";
import { Grid, withStyles, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Route } from "react-router-dom";
import ProspectSidebar from "./ProspectSidebar";
import ProspectMainHeader from "./ProspectMainHeader";
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getProspectData } from "Utils/api";
import AuthUserContext from "Components/Session/AuthUserContext";
import styles from "Components/Form/ProspectFormStyles";
import CloudIcon from '@material-ui/icons/Cloud';
import ProspectTableCheckbox from 'Components/Checkbox/ProspectTableCheckbox';


class Prospects extends Component {
  
  state = {
    prospects : [],
    user : {},
    checked : false,
    errors: {},
    loggedIn: localStorage.getItem("token") ? true : false
  };

  onChange = e => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = (event, id) => {
    console.log("Clicked");
  }

  preventDefault(event) {
    event.preventDefault();
  }

  componentDidMount = async () => {
    try {
      this.state.user = this.context.user;
      let token = localStorage.getItem("token")
      console.log(this.state.user.id);
      const res = await getProspectData(this.state.user.id);
      this.setState({
        prospects: res.data
      });
    } catch(error) {
      this.setState({
        errors: { error }
      });
    }
  }

  displayTable() {
    const { prospects, user } = this.state;
    
    const prospectList = prospects.length ? (
      prospects.map((row, index) => (
        
        <TableRow key={index} hover
        onClick={event => this.handleClick(event, index)}>
          <TableCell className={this.props.classes.prospect_id} align="center">{index + 1}</TableCell>
          <TableCell className={this.props.classes.email}>{row.email}</TableCell>
          <TableCell className={this.props.classes.email}><CloudIcon className={this.props.classes.cloud_icon_table}></CloudIcon></TableCell>
          <TableCell className={this.props.classes.status} align="center">{row.status}</TableCell>
          <TableCell className={this.props.classes.owner} align="center">{user.firstName + " " + user.lastName}</TableCell>
          <TableCell className={this.props.classes.last_contacted} align="center">{"-"}</TableCell>
          <TableCell className={this.props.classes.email_count} align="center">{0}</TableCell>
        </TableRow>
      ))
    ) : 
    (
      
        <Typography style= {{color: "black"}} className="this.props.empty_prospects"> No Prospects to show</Typography>
        
       
                           
        
      
      
    );
    return prospectList;
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };


  render() {
    const { prospects, user } = this.state;    
    return (
      
      <Route path="/home/prospects">
            <Grid className={this.props.classes.root} container xs={12} spacing={0}>
                <Grid item xs={3}>
                    <ProspectSidebar/>
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
                      <ProspectMainHeader/>
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
                            <div className={this.props.classes.list}>
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
                              {this.displayTable()}
                              </TableBody>
                              </Table>
                              </React.Fragment>
                            </div>
                            </Grid>
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
