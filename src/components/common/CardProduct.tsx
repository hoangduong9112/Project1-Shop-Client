import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'app/hooks';
import { StatusTypeEnum } from 'enums/status';
import { adminActions } from 'features/admin/adminSlice';
import { cartActions } from 'features/home/cartSlice';
import React, { useState } from 'react';

const useStyles = makeStyles({
  root: {},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  description: {
    marginBottom: 8,
    height: '48px',
  },
  price: {
    marginTop: 16,
    height: '48px',
  },
  media: {
    height: 0,
    paddingTop: '50%',
  },
});

export interface CardProps {
  key: string;
  name: string;
  price: number;
  description: string;
  image: string;
  status: StatusTypeEnum;
  _id: string;
}

export default function CardProduct(props: CardProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState('');

  const { name, price, description, status, _id, image } = props;

  const handleRedirectDeleteProduct = () => {
    dispatch(adminActions.redirectDeleteProduct(_id));
  };

  const handleRedirectUpdateProduct = () => {
    dispatch(adminActions.redirectUpdateProduct(_id || ''));
  };

  const handleAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        name,
        price,
        _id,
        description,
        image,
        quantity: +quantity,
      })
    );
    setQuantity('');
  };

  const handleChangeQuantity = (e: any) => {
    setQuantity(e.target.value);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          {name}
        </Typography>

        <CardMedia className={classes.media} image={image} />
        <Typography className={classes.price} color="textSecondary">
          Giá: {formatter.format(price)}
        </Typography>
        <Typography className={classes.description} color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {status === StatusTypeEnum.HOME && (
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography style={{ paddingLeft: '8px', margin: '16px 0' }} color="textSecondary">
                Số lượng
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                type="number"
                value={quantity}
                InputProps={{
                  inputProps: {
                    max: 500,
                    min: 1,
                  },
                }}
                onChange={handleChangeQuantity}
              />
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                color="primary"
                disableElevation
              >
                Mua
              </Button>
            </Grid>
          </Grid>
        )}
        {status === StatusTypeEnum.ADMIN && (
          <Button
            onClick={handleRedirectUpdateProduct}
            variant="contained"
            color="primary"
            disableElevation
          >
            Chỉnh sửa
          </Button>
        )}
        {status === StatusTypeEnum.ADMIN && (
          <Button
            onClick={handleRedirectDeleteProduct}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Xóa
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
