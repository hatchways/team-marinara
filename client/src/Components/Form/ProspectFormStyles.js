const ProspectFormStyles = () => ({
    root: {
        height: "100vh",
        width: "100%",
        backgroundColor: "#F4F6FC",
        overflow: "auto"
      },
      
      sidebar: {
          backgroundColor : "#ffffff",
          height: "100vh",
          width: "100%",
      },
      main: {
          backgroundColor : "#4FBE75",
          height: "100vh",
          width: "100%",
      },
      list_entire: {
        width: 'auto',
        height: "auto",
        fontSize: '10px',
        color: 'white',
        backgroundColor: "#ffffff",
        borderRadius: 7,
        margin: "25px 0px 75px 0px"
      },
      table : {
        borderRadius: 7,
      },
      table_header_cell : {
        backgroundColor: "#4FBE75",
        color : "white",
      },
      table_header : {
        borderRadius: 7,
      },
      no_prospect_message: {
        textAlign: 'center'
      },
      cloud_icon : {
          color : "#F4F6FC"
      },
      cloud_icon_table : {
        color : "#A9A9A9"
      },
      table_checkbox_unchecked : {
        color: "#000000",
        '&$checked': {
        color: "#ffffff",
        }
      },
      table_checkbox_checked : {
        color: "#ffffff",
        '&$checked': {
        color: "#000000",
      },
      checked: {}
      },
      empty_prospects : {
          color: 'black'
      }
      
  });
  
  export default ProspectFormStyles;
  