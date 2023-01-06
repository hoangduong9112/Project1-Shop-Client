import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/formField/InputField';
import { cartActions } from 'features/home/cartSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CustomerInformation, OrderedItem } from 'types/order';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },

  paperStyle: {
    padding: 20,
    margin: '20px auto',
  },

  style: {
    width: '100%',
    bgcolor: 'background.paper',
  },
}));

export function Cart() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  const isOrdering = useAppSelector((state) => state.cart.isOrdering);
  const orderedItems = useAppSelector((state) => state.cart.orderedItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const handleRedirectHome = (e: any) => {
    dispatch(cartActions.redirectHome());
  };
  const handleRemoveItem = (item: OrderedItem) => {
    dispatch(cartActions.removeItem(item));
  };

  const handleSubmitForm = (formValue: CustomerInformation) => {
    dispatch(
      cartActions.order({
        ...formValue,
        packages: orderedItems.map((item) => {
          return {
            product_id: item.product_id,
            quantity: item.quantity,
          };
        }),
      })
    );
  };

  const initialValue: CustomerInformation = {
    user_name: '',
    address: '',
    phone: '',
  };

  const schema = yup
    .object({
      user_name: yup.string().required('Please enter name.'),
      address: yup.string().required('Please enter address.'),
      phone: yup
        .string()
        .required('Please enter phone.')
        .max(11, 'Phone must be at most 11 numbers')
        .test('phone number', 'Please enter a phone number', (value) => {
          return Boolean(+(value || ''));
        }),
    })
    .required();

  const { control, handleSubmit } = useForm<CustomerInformation>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  return (
    <Grid>
      <Grid container>
        <Grid item xs={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ margin: '24px 0' }}
            fullWidth
            onClick={handleRedirectHome}
          >
            <KeyboardReturnIcon />
            Return Home
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Typography align="center" variant="h3">
          My Order
        </Typography>

        <List className={classes.style} component="nav" aria-label="mailbox folders">
          <ListItem divider>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ListItemText>Name</ListItemText>
              </Grid>
              <Grid item xs={3}>
                <ListItemText>Price</ListItemText>
              </Grid>
              <Grid item xs={4}>
                <ListItemText>Quantity</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          {orderedItems.map((item) => (
            <ListItem divider>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <ListItemText>{item.name}</ListItemText>
                </Grid>
                <Grid item xs={3}>
                  <ListItemText>{formatter.format(item.price)}</ListItemText>
                </Grid>
                <Grid item xs={3}>
                  <ListItemText>x{item.quantity}</ListItemText>
                </Grid>
                <Grid item xs={2}>
                  <HighlightOffSharpIcon color="error" onClick={() => handleRemoveItem(item)} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>

        <Typography style={{ margin: '8px 0' }} align="center" color="textSecondary">
          Total Money &nbsp; {formatter.format(totalPrice)}
        </Typography>

        <Divider />

        <Typography style={{ marginTop: '32px' }} align="center" variant="h3">
          Please fill your information
        </Typography>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputField name="user_name" control={control} label="Name" />
          <InputField name="address" control={control} label="Address" />
          <InputField name="phone" control={control} label="Phone" />
          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              {isOrdering && <CircularProgress size={16} color="secondary" />}&nbsp;Order
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
