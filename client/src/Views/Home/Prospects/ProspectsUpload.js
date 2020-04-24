import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, withStyles, Button } from "@material-ui/core";
import ProspectSidebar from "./ProspectSidebar";
import Paper from "@material-ui/core/Paper";
import colors from "Components/Styles/Colors";
import { uploadProspectCsv } from "Utils/api";
import Dropzone from "react-dropzone";
import ProspectUploadForm from "./ProspectUploadForm";
import Papa from "papaparse";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
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
    uploadResultMessage: "",
    importedHeaders: [],
    importedData: [],
    requestHeaders: ["firstName", "lastName", "email", "status"],
    selectErrors: ["", "", "", ""]
  };

  onsubmit = async e => {
    let file = this.state.file;
    let formData = new FormData();
    formData.append("file", file);
    const headers = this.state.requestHeaders;
    if (this.findDuplicates(headers)) {
      formData.append("clientHeaders", headers);
      try {
        const res = await uploadProspectCsv(formData);
        if (res.status === 200) {
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
    }
  };

  findDuplicates = headerArray => {
    for (let i = 0; i < headerArray.length - 1; i++) {
      for (let n = i + 1; n < headerArray.length; n++) {
        if (headerArray[i] === headerArray[n]) {
          let errors = this.state.selectErrors;
          errors[i] = "error";
          errors[n] = "error";
          this.setState({ selectErrors: errors });
          return false;
        }
      }
    }
    return true;
  };

  handleHeaderChange = async () => {};

  handleFileSelect = e => {
    this.setState({
      uploadResultMessage: ""
    });
    let file = e[0];
    if (!this.checkFileType(file.name)) {
      this.setState({
        uploadResultMessage: "File must be of type *.csv"
      });
    }
    try {
      this.setState({
        file: file,
        fileMessage: file.name + " selected."
      });
      this.parseCsvMinimalData();
    } catch (error) {
      this.setState({
        uploadResultMessage: "Error occured. File not uploaded."
      });
    }
  };

  checkFileType(filename) {
    const parts = filename.split(".");
    const ext = parts[parts.length - 1];
    if (ext.toLowerCase() === "csv") {
      return true;
    }
    return false;
  }

  parseCsvMinimalData() {
    Papa.parse(this.state.file, {
      complete: function (results) {
        if (results.data.length > 0) {
          const headerArray = results.data[0];
          this.setState({
            importedHeaders: headerArray
          });
          let i = 4;
          if (results.data.length < 4) {
            i = results.data.length;
          }
          let bigArray = [];
          for (let n = 0; n < i; n++) {
            let particularArray = [];
            for (let k = 1; k < i; k++) {
              particularArray.push(results.data[k][n] + ", ");
            }
            bigArray.push(particularArray);
          }
          this.setState({
            importedData: bigArray
          });
        } else {
          console.log("Empty csv");
        }
      }.bind(this)
    });
  }

  handleSelectChange = e => {
    let headerArray = this.state.requestHeaders;
    headerArray[e.target.name] = e.target.value;
    this.setState({
      requestHeaders: headerArray,
      selectErrors: ["", "", "", ""]
    });
  };

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
                  {!this.state.file ? (
                    <Typography component="h1" variant="h4" align="center">
                      Prospects Upload
                    </Typography>
                  ) : (
                    <Typography component="h4" variant="h4" align="center">
                      {'"' + this.state.file.name + '"'} selected
                    </Typography>
                  )}

                  {this.state.file ? (
                    <ProspectUploadForm
                      importedHeaders={this.state.importedHeaders}
                      importedData={this.state.importedData}
                      file={this.state.file}
                      selectErrors={this.state.selectErrors}
                      requestHeaders={this.state.requestHeaders}
                      handleSelectChange={this.handleSelectChange}
                    />
                  ) : (
                    ""
                  )}
                  <div className={classes.upload} align="center">
                    <form encType="multipart/form-data">
                      {this.state.file ? (
                        ""
                      ) : (
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
                                    Click here to select a file. Or Drag and
                                    Drop.
                                  </Typography>
                                )}
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      )}
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
