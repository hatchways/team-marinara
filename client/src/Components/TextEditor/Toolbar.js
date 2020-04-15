import React from "react";
import { Grid, makeStyles, IconButton } from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatSize,
  FormatListBulleted,
  FormatListNumbered
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

  const styleButtons = [
    { icon: FormatBold, id: "BOLD", category: "style", fontSize: "default" },
    {
      icon: FormatItalic,
      id: "ITALIC",
      category: "style",
      fontSize: "default"
    },
    {
      icon: FormatUnderlined,
      id: "UNDERLINE",
      category: "style",
      fontSize: "default"
    },
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
      fontSize: "default",
      textSize: "16px",
      category: "fontSize"
    },
    {
      icon: FormatSize,
      id: "SMALL",
      fontSize: "small",
      textSize: "12px",
      category: "fontSize"
    }
  ];

  const handleMouseDown = (e, category, textSize) => {
    e.preventDefault();
    if (category === "fontSize") {
      setFontSize(textSize);
    } else if (category === "style")
      // toggles Bold, Italic and Underline
      setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.id));
  };

  const toggleBlockType = (e, type) => {
    // prevent Editor from losing focus so RichUtils knows what text to change
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

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
              handleMouseDown(e, btn.category, btn.textSize);
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
      <IconButton>
        <FormatListBulleted
          onMouseDown={e => {
            toggleBlockType(e, "unordered-list-item");
          }}
        />
      </IconButton>
      <IconButton>
        <FormatListNumbered
          onMouseDown={e => {
            toggleBlockType(e, "ordered-list-item");
          }}
        />
      </IconButton>
    </Grid>
  );
};

export default Toolbar;
