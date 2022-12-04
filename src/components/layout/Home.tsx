import { Box, makeStyles } from '@material-ui/core';
import { Header } from 'components/common';
import { SideBar } from 'components/homeDashboard/SideBar';
import { Dashboard } from 'components/homeDashboard';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StatusTypeEnum } from 'enums/status';
import { Cart } from 'components/homeDashboard/Cart';

const useStyles = makeStyles((theme: any) => ({
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

export function Home() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header status={StatusTypeEnum.HOME} />
      </Box>

      <Box className={classes.sidebar}>
        <SideBar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Box>
    </Box>
  );
}
