import React from 'react';
import TaskDnd from '../../hoc/task-dnd';
import { makeStyles } from '@material-ui/core/styles';
import ITask from '../../interfaces/ITask';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    paper: {
        width: 150,
        backgroundColor: "#333c57",
        color: "#878ea9",
        padding: theme.spacing(2),
        marginTop: theme.spacing(1)
    }
}));
export default function (task: ITask) {
    const { id, value } = task;
    const classes = useStyles();
    return (
        <TaskDnd>
            <Paper className={classes.paper}>
                {value}
            </Paper>
        </TaskDnd>
    )
}
