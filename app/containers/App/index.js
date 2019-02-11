/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react'; // eslint-disable-line no-unused-vars
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import history from 'utils/history';

import Cap from '../Cap';
import Login from '../Login';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import { publicPath } from '../../config/path';

import { userIsAuthenticatedRedir } from '../../utils/authWrapper';
const Protected = userIsAuthenticatedRedir(Cap);
const RenderRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);
export default function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <RenderRoute exact path="/login" component={Login} />
          <RenderRoute
            path={publicPath}
            component={Protected}
            key={publicPath}
          />
          <Redirect exact from="/" to={`${publicPath}/index`} push />
          <RenderRoute component={NotFoundPage} />
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  );
}
