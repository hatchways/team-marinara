import React from "react";
import Editor from "draft-js-plugins-editor";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import { makeStyles } from "@material-ui/core/styles";

const toolbarPlugin = createToolbarPlugin();
const plugins = [toolbarPlugin];

const useStyles = makeStyles({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    padding: "1rem 0",
    width: "100%"
  },
  editor: {
    cursor: "text",
    minHeight: "30vh"
  }
});

const TextEditor = props => {
  const { editorState, setEditorState } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.editor}>
        <Editor
          editorState={editorState}
          onChange={editorState => {
            setEditorState(editorState);
          }}
          plugins={plugins}
        />
      </div>
    </div>
  );
};

export default TextEditor;
