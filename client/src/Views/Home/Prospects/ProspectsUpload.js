import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Grid, Box, Typography, withStyles, Button } from "@material-ui/core";
import ProspectSidebar from "./ProspectSidebar";
import Paper from '@material-ui/core/Paper';
import colors from "Components/Styles/Colors";
import { uploadProspectCsv } from "Utils/api";
//import styles from "Components/Form/ProspectUploadStyles";

import { makeStyles} from "@material-ui/core";

const styles = (theme) => ({
    root: {
      flexGrow: 1
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      upload : {
        marginTop: theme.spacing(10),
      },
      uploadButton : {
        backgroundColor : `${colors.lightGreen}`,
        color : `${colors.white}`,
        '&:hover': {
            backgroundColor:`${colors.white}`,
            color : `${colors.lightGreen}`,

        }
      },
      fileMessage : {
        marginBottom: theme.spacing(5),
      }
  });


  class ProspectsUpload extends Component {
    
    state = {
        file : null,
        uploadSuccess: false,
        fileMessage : ''
    }

    onsubmit = async (e) => {
        console.log(this.state.file);
        let file = this.state.file;
        let formData = new FormData();
        formData.append('file', file);

        const res = await uploadProspectCsv(formData);

    }

    handleFileSelect =  (e) => {
        try{
            //const res = await uploadProspectCsv(file);
            let file = e.target.files[0];
            this.setState({file : file,
            fileMessage : '\"' + file.name + '\"' + ' selected.'});
        }catch (error) {
            console.log("Error")
        }
        
    }

    //classes = useStyles();
    render () {
        const { classes } = this.props;
        return (
            <Grid className={classes.root} container spacing={0}>
            <Grid item xs={3}>
                <ProspectSidebar
                //onChange={this.handleFieldChange}
                />
            </Grid>
            <Grid item xs={9}>
                        <Box className={classes.main}>
                        <Grid
                                className={classes.root}
                                container
                                direction="column"
                                alignItems="center"
                                wrap="nowrap"
                            >
                                <main className={classes.layout}>
                                <Paper className={classes.paper}>
                                    <Typography component="h1" variant="h4" align="center">
                                        Prospects Upload
                                    </Typography>
                                    
                                    <div className={classes.upload}
                                        align="center">
                                            {this.state.file ? 
                                                <Typography style= {{color: "black"}} className={classes.fileMessage}> {this.state.fileMessage}</Typography>
                                                : <p></p>}
                                        <form  encType="multipart/form-data">
                                        <Grid container spacing={3}>
                                                
                                            <Grid item xs={12} sm={6}>
                                                <label htmlFor="raised-button-file">
                                                <input
                                                accept="csv/*"
                                                className={classes.input}
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                                onChange={(e) => this.handleFileSelect(e)} 
                                                />
                                                <Button  component="span" className={classes.uploadButton}>
                                                    Upload file
                                                </Button>
                                                </label> 
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button className={classes.uploadButton} onClick={(e) => this.onsubmit(e)} type="button">Upload</Button>
                                            </Grid>
                                            </Grid>
                                            
                                        </form>
                                    </div>
                                   
                                </Paper>
                                </main>
                            </Grid>
                        </Box>
            </Grid>
            </Grid>
        );
    }
    
  }

  ProspectsUpload.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(ProspectsUpload);