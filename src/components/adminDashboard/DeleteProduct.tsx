import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { adminActions } from '../../features/admin/adminSlice';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '50%',
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 44,
    textAlign: 'center',
    marginBottom: '40px',
  },
});

export interface RouteParams {
  product_id: string;
}

export function DeleteProduct(props: RouteComponentProps<RouteParams>) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleRedirectAdmin = () => {
    dispatch(adminActions.redirectAdmin());
  };

  const handleDeleteProduct = () => {
    dispatch(adminActions.deleteProduct(props.match.params.product_id));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Do you want to delete?
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={6}>
            <Button
              onClick={handleRedirectAdmin}
              size="large"
              className={classes.title}
              variant="contained"
            >
              Return
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleDeleteProduct}
              size="large"
              className={classes.title}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
