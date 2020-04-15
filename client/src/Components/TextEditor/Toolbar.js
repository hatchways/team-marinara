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
  Code
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
  const { editorState, setEditorState } = props;
  const [blockSize, setBlockSize] = useState("");

  const handleClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, event.target.id));
  };

  const handleChange = event => {
    event.preventDefault();
    setBlockSize(event.target.value);
    setEditorState(RichUtils.toggleBlockType(editorState, event.target.value));
  };

  const styleButtons = [
    { icon: FormatBold, id: "BOLD" },
    { icon: FormatItalic, id: "ITALIC" },
    { icon: FormatUnderlined, id: "UNDERLINE" },
    { icon: Code, id: "CODE" }
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

  return (
    <Grid container className={classes.iconContainer}>
      {styleButtons.map(btn => {
        const BtnComponent = btn.icon;
        return (
          <IconButton key={btn.id} onMouseDown={handleClick}>
            <BtnComponent id={btn.id} className={classes.button} />
          </IconButton>
        );
      })}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={blockSize}
        onMouseDown={e => {
          e.preventDefault();
          handleChange(e);
        }}
        onChange={handleChange}
      >
        <MenuItem value={"header-one"}>H1</MenuItem>
        <MenuItem value={"header-two"}>H2</MenuItem>
        <MenuItem value={"header-three"}>H3</MenuItem>
        <MenuItem value={""}>Normal</MenuItem>
      </Select>
    </Grid>
  );
};

export default Toolbar;
