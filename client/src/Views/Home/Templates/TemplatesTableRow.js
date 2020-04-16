import React from "react";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";


const useStyles = makeStyles ({

    row : {
        height: "3rem",
    },
    cell : {
        width : "75px",
        textAlign: "left",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    centerCell : {
        textAlign: "center",
        maxWidth: "100px",
    },
    boldCell : {
        width : "75px",
        textAlign: "left",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontWeight: "bolder"
    }
    
});

const TemplatesTableRow = props => {
    const classes = useStyles();

    const formatDate = dateString => {
        let date = new Date(dateString);
        date = date.toDateString().split(" ");
        const month = date[1];
        const day = Number.parseInt(date[2]);
        return `${month} ${day}`;
      };

    return (
        <TableRow hover onClick={e => props.viewTemplate(props.template)} className={classes.row}>
            <TableCell align="center" className={classes.boldCell}>
                {props.template.name}
            </TableCell>
            <TableCell align="left" className={classes.cell}>
                {props.template.subject}
            </TableCell>
            <TableCell className={classes.centerCell}>
                {formatDate(props.template.created)}
            </TableCell>
            <TableCell className={classes.centerCell}>
                {props.user.firstName + " " + props.user.lastName}
            </TableCell>
        </TableRow>
    )
}

export default TemplatesTableRow;