import React, { useContext, useState, useEffect } from "react";
import {
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  makeStyles,
  FormControl,
  Select,
  InputBase,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { EditorState, convertToRaw, Modifier, convertFromRaw } from "draft-js";

import ProspectSidebar from "../Prospects/ProspectSidebar";
import TemplatesHeader from "./TemplatesHeader";
import TemplatesTable from "./TemplatesTable";
import AuthUserContext from "Components/Session/AuthUserContext";
import { getTemplates } from "Utils/api";
import Modal from "./TemplateEditor";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Templates = props => {
    const context = useContext(AuthUserContext);
    const classes = useStyles();
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [recentlyFetched, setRecentlyFetched] = useState(false);
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [templateInFocus, setTemplateInFocus] = useState({});
    const [contentState, setContentState] = useState({});

    const headerColumns = [
      "name", "subject", "created", "author"
    ];

  useEffect( () => {
      
    setUser(context.user);

    const fetchTemplates = async () => {
        try {
            const res = await getTemplates();
            console.log(res);
            setTemplates(res.data);
            setFilteredTemplates(res.data);

        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    }
    if (!recentlyFetched) {
      fetchTemplates();
      setRecentlyFetched(true);
    }
}, [recentlyFetched]);

const onEnter = () => {
  console.log("Cheese");
}

const viewTemplate = (template) => {
  //setTemplateInFocus(template);
  setContentState(convertFromRaw(JSON.parse(template.content)));
  setModalOpen(true);

  /*setTitle(template.name);
  setSubject(template.subject);
  const DBEditorState = convertFromRaw(JSON.parse(template.content));
  setEditorState(EditorState.createWithContent(DBEditorState));*/
}

  return (
    <Grid item container className={classes.root}>
      <Grid item xs={3}>
            <ProspectSidebar />
        </Grid>
        
        <Grid item xs={9}>
          <TemplatesHeader modalOpen={modalOpen} setModalOpen={setModalOpen} templates={templates}/>
          <TemplatesTable 
            viewTemplate={viewTemplate}
            filteredTemplates={filteredTemplates}
            headerColumns={headerColumns}
            user={user}
            />
        </Grid>
        <Modal
            open={modalOpen}
            setModalOpen={setModalOpen}
            setRecentlyFetched={setRecentlyFetched}
            templates={templates}
          />
    </Grid>
  );
  }

Templates.contextType = AuthUserContext;


export default Templates;
