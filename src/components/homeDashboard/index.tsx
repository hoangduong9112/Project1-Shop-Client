import { Box, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { StatusTypeEnum } from 'enums/status';
import { adminActions } from 'features/admin/adminSlice';
import { useEffect } from 'react';
import CardProduct from '../common/CardProduct';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    rowGap: 24,
    columnGap: 16,
    marginLeft: '16px',
  },
  card: {},
}));

export function Dashboard() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminActions.fetchProductList());
  }, [dispatch]);

  const productList = useAppSelector((state) => state.admin.productList);
  return (
    <Box className={classes.root}>
      {productList.map((product) => (
        <CardProduct
          key={product.product_id}
          name={product.name}
          price={product.price}
          description={product.description}
          status={StatusTypeEnum.HOME}
          image={product.image}
          product_id={product.product_id}
        />
      ))}
    </Box>
  );
}
