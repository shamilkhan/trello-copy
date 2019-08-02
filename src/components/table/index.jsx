import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#21273a',
        height: '100vh',
        width: '100vw',
        padding: theme.spacing(4),
        flexGrow: 1,
        flexDirection: "row"
    }
}));

export default function Table(props) {
    const styled = useStyles();
    return (
        <Grid 
            className={styled.container}
        >
            {props.children}
        </Grid>
    )
}