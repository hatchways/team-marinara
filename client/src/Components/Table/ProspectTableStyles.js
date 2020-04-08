import colors from "Components/Styles/Colors";

const ProspectTableStyles = () => ({
    root: {
        height: "100vh",
        width: "100%",
        backgroundColor: `${colors.gray}`,
        overflow: "auto"
      },
      
      sidebar: {
          backgroundColor : `${colors.white}`,
          height: "100vh",
          width: "100%",
      },
      main: {
          backgroundColor : `${colors.lightGreen}`,
          height: "100vh",
          width: "100%",
      },
      list_entire: {
        width: 'auto',
        height: "auto",
        fontSize: '10px',
        color: `${colors.white}`,
        backgroundColor: `${colors.white}`,
        borderRadius: 7,
        margin: "25px 0px 75px 0px"
      },
      table : {
        borderRadius: 7,
      },
      table_header_cell : {
        backgroundColor: `${colors.lightGreen}`,
        color : `${colors.white}`,
      },
      table_header : {
        borderRadius: 7,
      },
      no_prospect_message: {
        textAlign: 'center'
      },
      cloud_icon : {
          color : `${colors.gray}`
      },
      cloud_icon_table : {
        color : "#A9A9A9"
      },
      table_checkbox_checked : {
        color: `${colors.white}`,
        '&$checked': {
        color: `${colors.black}`,
      },
      checked: {}
      },
      empty_prospects : {
          color: `${colors.black}`
      }
      
  });
  
  export default ProspectTableStyles;
  