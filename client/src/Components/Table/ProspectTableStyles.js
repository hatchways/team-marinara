import colors from "Components/Styles/Colors";

const ProspectTableStyles = () => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: `${colors.gray}`,
    overflow: "auto"
  },

  sidebar: {
    backgroundColor: `${colors.white}`,
    height: "100vh",
    width: "100%"
  },
  main: {
    backgroundColor: `${colors.lightGreen}`,
    height: "100vh",
    width: "100%"
  },
  tableContainer: {
    padding: "0rem 3rem"
  },
  list_entire: {
    width: "100%",
    height: "auto",
    fontSize: "10px",
    color: `${colors.white}`,
    backgroundColor: `${colors.white}`,
    borderRadius: 7,
    margin: "25px 100px 75px 100px",
    padding: "1rem"
  },
  table: {
    borderCollapse: "separate",
    borderRadius: 7,
    width: "100%",
    overflow: "auto"
  },
  table_header_cell: {
    backgroundColor: `${colors.lightGreen}`,
    color: `${colors.white}`,
    width: "50px",
    "&:first-child": {
      borderRadius: "7px 0 0 7px"
    },
    "&:last-child": {
      borderRadius: "0 7px 7px 0"
    }
  },
  table_header: {
    borderRadius: 7
  },
  no_prospect_message: {
    textAlign: "center"
  },
  cloud_icon: {
    color: `${colors.gray}`
  },
  cloud_icon_table: {
    color: "#A9A9A9",
    width: "50px"
  },
  table_checkbox_checked: {
    color: `${colors.white}`
  },
  empty_prospects: {
    color: `${colors.black}`
  },
  prospect_id_cell: {
    width: "50px"
  },
  email_cell: {
    width: "50px"
  },
  cloud_cell: {
    width: "50px"
  },
  status_cell: {
    width: "50px"
  },
  owner_cell: {
    width: "50px"
  },
  last_contacted_cell: {
    width: "50px"
  },
  email_count_cell: {
    width: "50px"
  }
});

export default ProspectTableStyles;
