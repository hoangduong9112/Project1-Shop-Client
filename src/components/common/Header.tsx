import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { adminActions } from 'features/admin/adminSlice';

import React from 'react';
import { StatusTypeEnum } from 'enums/status';
import { CartButton } from 'components/homeDashboard/CartButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: '20px',
  },
}));

export interface HeaderProps {
  status: StatusTypeEnum;
}

export function Header(props: HeaderProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const redirectHome = () => {
    dispatch(adminActions.redirectHome());
  };
  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };
  const redirectLoginPage = () => {
    dispatch(authActions.redirectLoginPage());
  };
  const redirectAdmin = () => {
    dispatch(adminActions.redirectAdmin());
  };
  const handleRedirect = isLoggedIn ? redirectAdmin : redirectLoginPage;
  const handleClick =
    `${props.status}` === StatusTypeEnum.ADMIN ? handleLogoutClick : handleRedirect;

  const title = `${props.status}` === StatusTypeEnum.ADMIN ? 'Product Management' : 'Welcome';
  const nameButtonForHome = isLoggedIn ? 'Admin' : 'Login (only for admin)';
  const nameButton =
    `${props.status}` === StatusTypeEnum.ADMIN ? 'Log out' : `${nameButtonForHome}`;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>

          {props.status === StatusTypeEnum.ADMIN && (
            <Button color="inherit" onClick={redirectHome}>
              Home
            </Button>
          )}

          <Button className={classes.button} color="inherit" onClick={handleClick}>
            {nameButton}
          </Button>

          {props.status === StatusTypeEnum.HOME && <CartButton />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
