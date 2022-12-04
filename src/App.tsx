import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageNotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layout/AdminLayout';
import { Home } from 'components/layout/Home';
import { authActions } from 'features/auth/authSlice';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/auth/LoginForm';

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  // if user logged in and reload page, auto check accessToken to set isLoggedIn again
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken && !isLoggedIn) dispatch(authActions.resetLoggedInStatus());
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route path="/notFound">
          <PageNotFound />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
