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
      container: {
        display: "flex",
        flexDirection: "column-reverse"
      },
      editorContainer: {
        height: "30vh"
      }
    }
  }
});

const TextEditor = props => {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <MUIRichTextEditor
        controls={[
          "title",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "highlight",
          "undo",
          "redo",
          "link",
          "media",
          "numberList",
          "bulletList",
          "quote",
          "code",
          "clear"
        ]}
      />
    </MuiThemeProvider>
  );
};

export default TextEditor;
