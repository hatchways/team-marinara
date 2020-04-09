import colors from "Components/Styles/Colors";
import { makeStyles} from "@material-ui/core";

const ProspectUploadStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      upload : {
        marginTop: theme.spacing(3),
      },
      uploadButton : {
        backgroundColor : `${colors.lightGreen}`,
        color : `${colors.white}`,
        '&:hover': {
            backgroundColor:`${colors.white}`,
            color : `${colors.lightGreen}`,

        }
      },
  }));

  export default ProspectUploadStyles;