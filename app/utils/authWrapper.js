/**
 * Created by Meharaj on 22/jan/2019
 */
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import React from 'react';
import { CapSpin as Loader } from '@capillarytech/cap-ui-library';
import {
  makeSelectUser,
  // makeSelectUserLoading,
} from '../containers/Cap/selectors';
// const orginUrl = window.location.origin;
import config from '../config/app';
const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: makeSelectUser(),
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults,
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: <Loader spinning />,
  redirectPath: '/login',
  // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/campaigns',
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: makeSelectUser(),
  wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults,
);

const redirectUrl =
  process.env.NODE_ENV === 'production'
    ? config.production.dashboard_url
    : config.development.dashboard_url;

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || redirectUrl,
  allowRedirectBack: false,
});

// Take the regular authentication & redirect to login from before
// export const UserIsAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: makeSelectUser(),
//   authenticatingSelector: makeSelectUserLoading(),
//   allowRedirectBack: false,
//   predicate: () => getIsLoggedIn(),
//   wrapperDisplayName: 'UserIsAuthenticated',
//   redirectPath: `${orginUrl}/login`,
// });
//
// export const UserIsNotAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: makeSelectUser(),//makeSelectCap(),
//   wrapperDisplayName: 'UserIsNotAuthenticated',
//   predicate: () => !getIsLoggedIn(),
//   redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/campaigns',
//   allowRedirectBack: false,
// });
