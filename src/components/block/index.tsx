import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IBlock from '../../interfaces/IBlock';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    paper: {
        width: 150,
        color: "#737d97",
        backgroundColor: "transparent",
        padding: theme.spacing(0.5)
    }
}));

export default function (block: IBlock) {
    const { id, name } = block;
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            {name}
        </Paper>
    )
}