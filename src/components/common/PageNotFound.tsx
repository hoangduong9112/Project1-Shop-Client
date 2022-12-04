import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCode: {
    fontSize: 200,
    color: '#808080',
    lineHeight: 'normal',
    marginBottom: theme.spacing(0),
  },
  btn: {
    marginTop: theme.spacing(2),
    height: 40,
  },
}));
export function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.statusCode}>
        404
      </Typography>
      <Typography variant="subtitle2">
        The page you&apos;re not looking for could not be found
      </Typography>
      <Button
        className={classes.btn}
        component={Link}
        to={'/login'}
        variant="contained"
        color="secondary"
      >
        GO TO HOME
      </Button>
    </div>
  );
}
