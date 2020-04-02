import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { postCode } from "./gmailAuth";

class ProcessToken extends Component {
  state = {
    tokenSaved: false,
  };

  async componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const x = await postCode(query);
  }

  render() {
    return <CircularProgress />;
  }
}

export default ProcessToken;
