import React from "react";
import MUIRichTextEditor from "mui-rte";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20
      },
      editor: {},
      editorContainer: {
        height: "30vh"
      }
    }
  }
});

const TextEditor = props => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <MUIRichTextEditor />
    </MuiThemeProvider>
  );
};

export default TextEditor;
