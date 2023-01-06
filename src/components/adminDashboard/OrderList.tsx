import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cartActions } from 'features/home/cartSlice';
import moment from 'moment';
import { Package } from 'types/order';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
export interface Production {
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface RowProps {
  key: string;
  row: {
    _id: string;
    time: string;
    name: string;
    phone: string;
    address: string;
    productions: Production[];
    orderPrice: number;
  };
}

function Row(props: RowProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(row.time.toString()).format('MMMM Do YYYY, h:mm:ss a')}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productions.map((production) => (
                    <TableRow key={production.name}>
                      <TableCell component="th" scope="row">
                        {production.name}
                      </TableCell>
                      <TableCell align="right">x&nbsp;{production.quantity}</TableCell>
                      <TableCell align="right">{formatter.format(production.price)}</TableCell>
                      <TableCell align="right">{formatter.format(production.totalPrice)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {formatter.format(row.orderPrice)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function OrderList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cartActions.fetchOrderList());
  }, [dispatch]);
  const orderList = useAppSelector((state) => state.cart.orderList);

  const generalOrderInfo = orderList.map((order) => {
    return {
      _id: order.order_id || '',
      time: order.created_at || new Date().toString(),
      name: order.user_name,
      address: order.address,
      phone: order.phone,
      productions: order.products.map((pack: Package) => {
        return {
          name: pack.name,
          quantity: pack.quantity,
          price: pack.price,
          totalPrice: pack.price * pack.quantity,
        };
      }),
      orderPrice: order.products.reduce((total, current) => {
        return (total += current.price * current.quantity);
      }, 0),
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generalOrderInfo.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
