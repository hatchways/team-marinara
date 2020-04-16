import React from "react";
import { Checkbox, TableRow, TableCell, makeStyles } from "@material-ui/core";
import CloudIcon from "@material-ui/icons/Cloud";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles ({

    row : {
        margin: "10px",
    },
    cell : {
        padding : "7px 0px",
        width : "50px",
    },
    cloudIcon : {
        color : "#A9A9A9",
    },
    checkbox : {
        padding: "0px 0px 0px 15px",
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
            <TableCell align="center" className={classes.cell}>
                {props.template.name}
            </TableCell>
            <TableCell align="left" className={classes.cell}>
                {props.template.subject}
            </TableCell>
            <TableCell align="center" className={classes.cell}>
                {formatDate(props.template.created)}
            </TableCell>
            <TableCell align="center" className={classes.cell}>
                {props.template.ownedBy}
            </TableCell>
        </TableRow>
    )
}

export default TemplatesTableRow;