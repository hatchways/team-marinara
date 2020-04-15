import React, { useRef } from "react";
import { Editor, RichUtils, getDefaultKeyBinding } from "draft-js";
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
      // returning 'handled' stops the event being passed to any other handlers
      return "handled";
    }
    return "not-handled";
  };

  // Handles tab-key press in lists to indent rather than changing focus
  const handleKeyPress = e => {
    if (e.keyCode === 9) {
      e.preventDefault();

      const newState = RichUtils.onTab(e, editorState, 4);

      if (newState) {
        setEditorState(newState);
        return "handled";
      }
    }
    // If it's not a tab key press in a list, hand back to draft-js for regular handling
    return getDefaultKeyBinding(e);
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        className={classes.editor}
        // Clicking anywhere in Grid should put cursor in Editor
        onClick={e => {
          editorRef.current.focus();
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={editorRef}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={handleKeyPress}
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
