import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, Add } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
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
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Clothes Type 1" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Clothes Type 2" />
        </ListItem>
      </List>
    </div>
  );
}
