import { Box, makeStyles } from '@material-ui/core';
import { Dashboard } from 'components/adminDashboard';
import { CreateProduct } from 'components/adminDashboard/CreateProduct';
import { DeleteProduct } from 'components/adminDashboard/DeleteProduct';
import { OrderList } from 'components/adminDashboard/OrderList';
import { SideBar } from 'components/adminDashboard/SideBar';
import { UpdateProduct } from 'components/adminDashboard/UpdateProduct';
import { Header } from 'components/common';
import { StatusTypeEnum } from 'enums/status';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header status={StatusTypeEnum.ADMIN} />
      </Box>

      <Box className={classes.sidebar}>
        <SideBar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/createProduct" component={CreateProduct} />
          <Route path="/admin/orderList" component={OrderList} />
          <Route path="/admin/updateProduct/:_id" component={UpdateProduct} />
          <Route path="/admin/deleteProduct/:_id" component={DeleteProduct} />
          <Route path="/admin" component={Dashboard} />
        </Switch>
      </Box>
    </Box>
  );
}
