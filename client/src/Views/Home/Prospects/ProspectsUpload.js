import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, withStyles, Button } from "@material-ui/core";
import ProspectSidebar from "./ProspectSidebar";
import Paper from "@material-ui/core/Paper";
import colors from "Components/Styles/Colors";
import { uploadProspectCsv } from "Utils/api";
import Dropzone from "react-dropzone";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  upload: {
    marginTop: theme.spacing(5)
  },
  uploadButton: {
    backgroundColor: `${colors.lightGreen}`,
    padding: theme.spacing(2),

    color: `${colors.white}`,
    "&:hover": {
      backgroundColor: `${colors.white}`,
      color: `${colors.lightGreen}`,
      border: "1px solid #4FBE75"
    }
  },

  dropzone: {
    backgroundColor: `${colors.gray}`,
    borderRadius: 7,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(5),
    border: "1px dashed #bbbaba",
    width: "70%",
    "&:hover": {
      backgroundColor: "#bbbaba"
    }
  },
  resultMessage: {
    paddingTop: theme.spacing(3)
  }
});

class ProspectsUpload extends Component {
  state = {
    file: null,
    uploadSuccess: false,
    fileMessage: "",
    uploadResultMessage: ""
  };

  onsubmit = async e => {
    console.log(this.state.file);
    let file = this.state.file;
    let formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadProspectCsv(formData);
      if (res.status == 200) {
        this.setState({
          uploadResultMessage:
            "Successfully uploaded " +
            res.data.successCount +
            " records. \n\n" +
            "Skipped " +
            res.data.skippedCount +
            " records."
        });
      }
    } catch (error) {
      this.setState({
        uploadResultMessage: "Error occured. File not uploaded."
      });
      console.log(error);
    }
  };

  handleFileSelect = e => {
    this.setState({
      uploadResultMessage: ""
    });
    let file = e[0];
    if (file.type !== "text/csv") {
      console.log(file);
      this.setState({
        uploadResultMessage: "File must be of type *.csv"
      });
    }
    try {
      this.setState({
        file: file,
        fileMessage: '"' + file.name + '"' + " selected."
      });
    } catch (error) {
      this.setState({
        uploadResultMessage: "Error occured. File not uploaded."
      });
    }
  };

  //classes = useStyles();
  render() {
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

                  <div className={classes.upload} align="center">
                    <form encType="multipart/form-data">
                      <Dropzone onDrop={e => this.handleFileSelect(e)}>
                        {({ getRootProps, getInputProps }) => (
                          <section className={classes.dropzone}>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />

                              {this.state.file ? (
                                <Typography
                                  style={{ color: "black" }}
                                  className={classes.fileMessage}
                                >
                                  {" "}
                                  {this.state.fileMessage}
                                </Typography>
                              ) : (
                                <Typography
                                  style={{ color: "black" }}
                                  className={classes.fileMessage}
                                >
                                  Click here to select a file. Or Drag and Drop.
                                </Typography>
                              )}
                            </div>
                          </section>
                        )}
                      </Dropzone>

                      <Grid item xs={12} sm={6}>
                        <Button
                          className={classes.uploadButton}
                          onClick={e => this.onsubmit(e)}
                          type="button"
                        >
                          Import Data
                        </Button>
                      </Grid>
                      <div>
                        {this.state.uploadResultMessage ? (
                          <Typography
                            style={{ color: "black" }}
                            className={classes.resultMessage}
                          >
                            {" "}
                            {this.state.uploadResultMessage}
                          </Typography>
                        ) : (
                          <Typography
                            style={{ color: "black" }}
                            className={classes.resultMessage}
                          ></Typography>
                        )}
                      </div>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProspectsUpload);
