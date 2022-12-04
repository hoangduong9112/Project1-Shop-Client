import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Dashboard, Add } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function SideBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="List Products" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/createProduct" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Create New Product" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/orderList" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Order List" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
