import React, { useContext, useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import DashboardSidebar from "Components/Sidebar/DashboardSidebar";

import TemplatesHeader from "./TemplatesHeader";
import TemplatesTable from "./TemplatesTable";
import AuthUserContext from "Components/Session/AuthUserContext";
import { getTemplates } from "Utils/api";
import Modal from "./TemplateEditor";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "auto"
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
  const [template, setTemplate] = useState();

  const sidebarCheckboxes = [];

  const headerColumns = ["Title", "Subject", "Created", "Author"];

  useEffect(() => {
    setUser(context.user);

    const fetchTemplates = async () => {
      try {
        const res = await getTemplates();
        setTemplates(res.data);
        setFilteredTemplates(res.data);
      } catch (error) {
        setErrors(error);
        console.log(errors);
      }
    };
    if (!recentlyFetched) {
      fetchTemplates();
      setRecentlyFetched(true);
    }
  }, [recentlyFetched, context.user, errors]);

  const handleFieldChange = (elementId, value) => {
    const newFilteredTemplateList = templates.filter(t =>
      t.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTemplates(newFilteredTemplateList);
  };

  const viewTemplate = template => {
    setModalOpen(true);
    setTemplate(template);
  };

  return (
    <Grid item container className={classes.root}>
      <Grid item xs={3}>
        <DashboardSidebar
          handleFieldChange={handleFieldChange}
          sidebarCheckboxes={sidebarCheckboxes}
        />
      </Grid>

      <Grid item xs={9}>
        <TemplatesHeader
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          templates={templates}
          setRecentlyFetched={setRecentlyFetched}
        />
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
        template={template}
        setTemplate={setTemplate}
        setRecentlyFetched={setRecentlyFetched}
      />
    </Grid>
  );
};

export default Templates;
