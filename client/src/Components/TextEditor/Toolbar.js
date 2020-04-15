import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  IconButton,
  Select,
  MenuItem
} from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatSize
} from "@material-ui/icons";
import { RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const useStyles = makeStyles({
  iconContainer: {
    display: "inline-flex",
    flexDirection: "row"
  },
  button: {
    cursor: "pointer"
  }
});

const Toolbar = props => {
  const classes = useStyles();
  const { editorState, setEditorState, styles } = props;

  const handleClick = (e, category, textSize) => {
    e.preventDefault();
    if (category === "fontSize") {
      setFontSize(textSize);
    } else if (category === "style")
      setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const handleChange = e => {
    e.preventDefault();
    // setBlockSize(event.target.value);
    // setEditorState(RichUtils.toggleBlockType(editorState, event.target.value));
  };

  const styleButtons = [
    { icon: FormatBold, id: "BOLD", category: "style" },
    { icon: FormatItalic, id: "ITALIC", category: "style" },
    { icon: FormatUnderlined, id: "UNDERLINE", category: "style" },
    {
      icon: FormatSize,
      id: "LARGE",
      fontSize: "large",
      textSize: "24px",
      category: "fontSize"
    },
    {
      icon: FormatSize,
      id: "MEDIUM",
      fontSize: "",
      textSize: "16px",
      category: "fontSize"
    },
    {
      icon: FormatSize,
      id: "10px",
      fontSize: "small",
      textSize: "12px",
      category: "fontSize"
    }
  ];

  const BLOCK_TYPES = [
    {
      label: "Blockquote",
      style: "blockquote"
    },
    {
      label: "UL",
      style: "unordered-list-item"
    },
    {
      label: "OL",
      style: "ordered-list-item"
    },
    {
      label: "Code Block",
      style: "code-block"
    }
  ];

  const setFontSize = value => {
    //remove current font size at selection
    const newEditorState = styles.fontSize.remove(editorState);
    //set editorState to display new font size
    setEditorState(styles.fontSize.add(newEditorState, value));
  };

  return (
    <Grid container className={classes.iconContainer}>
      {styleButtons.map(btn => {
        const BtnComponent = btn.icon;
        return (
          <IconButton
            key={btn.id}
            onMouseDown={e => {
              handleClick(e, btn.category, btn.textSize);
            }}
          >
            <BtnComponent
              id={btn.id}
              className={classes.button}
              fontSize={btn.fontSize && btn.fontSize}
            />
          </IconButton>
        );
      })}
    </Grid>
  );
};

export default Toolbar;
