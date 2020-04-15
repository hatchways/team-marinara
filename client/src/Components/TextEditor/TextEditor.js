import React, { useRef } from "react";
import { Editor, RichUtils } from "draft-js";
import createStyles from "draft-js-custom-styles";
import { Grid, makeStyles } from "@material-ui/core";
import Toolbar from "Components/TextEditor/Toolbar";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    padding: "1rem 0",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  editor: {
    cursor: "text",
    minHeight: "30vh",
    alignSelf: "flex-start"
  },
  toolbarContainer: {
    alignSelf: "flex-end"
  }
});

// For editing font-size in Text Editor
const { styles, customStyleFn } = createStyles(["font-size"]);

const TextEditor = props => {
  const { editorState, setEditorState } = props;
  const classes = useStyles();
  const editorRef = useRef();

  // Handles format short-cuts e.g. ctrl-b to bold
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const focus = () => {
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        className={classes.editor}
        onClick={e => {
          editorRef.current.focus();
        }}
        onFocus={focus}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          customStyleFn={customStyleFn}
        />
        <Grid container item className={classes.toolbarContainer}>
          <Toolbar
            editorState={editorState}
            setEditorState={setEditorState}
            styles={styles}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TextEditor;
