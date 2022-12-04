import * as React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  const accessToken = sessionStorage.getItem('accessToken');

  if (!accessToken) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}
