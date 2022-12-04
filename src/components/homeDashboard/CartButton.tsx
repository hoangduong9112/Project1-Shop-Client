import { Button, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { cartActions } from 'features/home/cartSlice';

export function CartButton() {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  const handleOpenCart = () => {
    dispatch(cartActions.openCart());
  };

  return (
    <Button
      variant="contained"
      style={{
        borderRadius: 35,
        backgroundColor: '#21b6ae',
        padding: '4px 24px',
        fontSize: '8px',
      }}
      onClick={handleOpenCart}
    >
      <AddShoppingCartIcon />
      <Typography
        style={{
          marginLeft: '8px',
        }}
      >
        My Cart
      </Typography>

      <Button
        variant="contained"
        style={{
          marginLeft: '8px',
          borderRadius: '50%',
          backgroundColor: '#da8b8b',
          fontSize: '16px',
        }}
      >
        {totalQuantity}
      </Button>
    </Button>
  );
}
