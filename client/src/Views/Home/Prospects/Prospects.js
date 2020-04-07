import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Navbar from "../../Landing/LandingNavbar";
import ProspectMain from "./ProspectMain";
import ProspectSidebar from "./ProspectSidebar";
import Paper from '@material-ui/core/Paper';
import ProspectMainHeader from "./ProspectMainHeader";
import ProspectList from "./ProspectList";
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import { getProspectData } from "Utils/api";

import Checkbox from '@material-ui/core/Checkbox';

const styles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#F4F6FC",
    overflow: "auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sidebar: {
      backgroundColor : "#ffffff",
      height: "100vh",
      width: "100%",
  },
  main: {
      backgroundColor : "#F4F6FC",
      height: "100vh",
      width: "100%",
  },
  list: {
    width: '90%',
    fontSize: '10px',
    color: 'white',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 7,
  }
}));

class Prospects extends Component {

  state = {
    prospects : [],
    errors: {},
    loggedIn: localStorage.getItem("token") ? true : false
  };

  onChange = e => {
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
      console.log("Getting prospects....");
      const res = await getProspectData();
      this.setState({
        prospects: res.data
      });
      console.log(this.state.prospects);
      //console.log(context.user);
      let token = localStorage.getItem("token")
      console.log(token);
    } catch(error) {
      console.log(error);
      this.setState({
        errors: { ...error.response.data }
      });
    }
  }

  render() {
    const { prospects } = this.state;
    return (
      
      <Route path="/prospects">
        
        <div className={this.props.classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Navbar/>
                </Grid>
                <Divider/>
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
                          >
                            <div className={this.props.classes.list}>
                            <List component="nav" >
                            <React.Fragment>
                                <Table size="small" className={this.props.classes.table}>
                                  <TableHead >
                                    <TableRow className={this.props.classes.table_header}>
                                      <TableCell className={this.props.classes.table_header} align="center"><Checkbox inputProps={{ 'aria-label': 'checkbox' }} /></TableCell>
                                      <TableCell className={this.props.classes.table_header}>Email</TableCell>
                                      <TableCell className={this.props.classes.table_header}align="center">Status</TableCell>
                                      <TableCell className={this.props.classes.table_header}align="center">Owner</TableCell>
                                      <TableCell className={this.props.classes.table_header}align="center">Campaigns</TableCell>
                                      <TableCell className={this.props.classes.table_header}align="center">Last Contacted</TableCell>
                                      <TableCell className={this.props.classes.table_header}align="right">Emails</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                  
                                    {prospects.map((row, index) => (
                                      <TableRow key={index} hover
                                      onClick={event => this.handleClick(event, index)}>
                                        <TableCell className={this.props.classes.prospect_id} align="center">{index + 1}</TableCell>
                                        <TableCell className={this.props.classes.email}>{row.email}</TableCell>
                                        <TableCell className={this.props.classes.status} align="center">{row.status}</TableCell>
                                        <TableCell className={this.props.classes.owner} align="center">{row.ownedBy}</TableCell>
                                        <TableCell className={this.props.classes.campaign}align="center">{row.campaigns}</TableCell>
                                        <TableCell className={this.props.classes.last_contacted} align="center">{row.last_contacted}</TableCell>
                                        <TableCell className={this.props.classes.email_count} align="center">{row.email_count}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <div className={this.props.classes.seeMore}>
                                  <Link color="primary" href="#" onClick={this.preventDefault}>
                                    See more orders
                                  </Link>
                                </div>
                              </React.Fragment>
                              </List>
                              </div>
                            </Grid>
                            </Grid>
                      </Grid>
                  </Box>
                </Grid>
            </Grid>
        </div>
      </Route>
    )
  }
}



export default withStyles(styles)(Prospects);
