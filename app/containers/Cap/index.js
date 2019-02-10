/**
 *
 * Cap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import styled from 'styled-components';
import injectReducer from 'utils/injectReducer';
import { isEqual, find, forEach, isEmpty } from 'lodash';
import { injectIntl } from 'react-intl';
import CapSpinner from '@capillarytech/cap-react-ui-library/CapSpinner';
import injectSaga from '../../utils/injectSaga';
import { makeSelectCap } from './selectors';
import reducer from './reducer';
import sagas from './saga';
import messages from './messages';
import TopBar from '../../components/TopBar';
import * as actions from './actions';
import config from '../../config/app';
const gtm = window.dataLayer || [];

/* eslint-disable react/prefer-stateless-function */
const CapWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  width: calc(100% - 280px);
  padding: 0;
  flex-direction: column;
`;

export class Cap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          title: 'Campaigns',
          link: `${this.props.match.path}/list`,
          key: 'campaigns-list',
        },
      ],
      routes: [],
    };
  }

  componentDidMount() {
    if (!this.props.Global.fetching_userdata) {
      this.props.actions.getUserData();
    }
    if (this.props.Global.user) {
      const userGtmData = this.getUserGtmData(this.props);
      gtm.push(userGtmData);
    }
    if (this.props.Global.orgID !== undefined) {
      gtm.push({ orgId: this.props.Global.orgID });
    }
    if (this.props.Global.isLoggedIn) {
      if (
        this.props.Global.user &&
        Object.keys(this.props.Global.user).length
      ) {
        // gtm.push({userId: this.props.Global.user.id});
        // this.props.appActions.getSidebar();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.Global.settingProxyOrg &&
      nextProps.Global.changeProxyOrgSuccess &&
      !isEqual(
        nextProps.Global.changeProxyOrgSuccess,
        this.props.Global.changeProxyOrgSuccess,
      ) &&
      !this.state.switchedOrg
    ) {
      this.navigateToDashboard();
    }
    if (
      nextProps.Global.user &&
      this.props.Global.user &&
      nextProps.Global.user.refID !== this.props.Global.user.refID
    ) {
      const userGtmData = this.getUserGtmData(nextProps);
      gtm.push(userGtmData);
    }

    if (
      nextProps.Global.isLoggedIn &&
      nextProps.Global.isLoggedIn !== this.props.Global.isLoggedIn
    ) {
      if (
        nextProps.Global.orgID !== undefined &&
        !isEqual(nextProps.Global.orgID, this.props.Global.orgID)
      ) {
        const userGtmData = this.getUserGtmData(nextProps);
        gtm.push(userGtmData);
      }
    }
  }

  getUserGtmData = props => {
    const { user: userData } = props.Global;
    const userName = userData.attributes.USERNAME;
    const userEmail = userData.attributes.EMAIL;
    const orgObj = find(userData.proxyOrgList, { orgID: props.Global.orgID });
    const gtmData = {
      orgId: props.Global.orgID,
      orgName: orgObj && orgObj.orgName,
      userId: userData.refID,
      userName: userName && userName.value,
      userEmail: userEmail && userEmail.value,
      isCapUser: userData.isCapUser,
    };
    return gtmData;
  };

  componentWillUnmount() {
    this.setState({ switchedOrg: false });
  }

  handleRemoveMessage = messageIndex => {
    this.props.actions.removeMessageFromQueue(messageIndex);
  };

  updateMenu = id => {
    this.props.actions.updateMenu(id);
  };

  navigateToDashboard = () => {
    const defaultPage =
      process.env.NODE_ENV === 'production'
        ? config.production.dashboard_url
        : config.development.dashboard_url;
    this.props.history.push(defaultPage);
  };

  logout = () => {
    if (process.env.NODE_ENV === 'production') {
      const originUrl = window.location.origin;
      const logoutpage = `${originUrl}/logout`;
      localStorage.removeItem('token');
      localStorage.removeItem('orgID');
      localStorage.removeItem('ouId');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('lastReport');
      window.location.href = logoutpage;
    } else {
      this.props.actions.logout();
    }
  };

  changeOrg = orgId => {
    this.props.actions.changeOrg(orgId);
  };

  changeOu = ouId => {
    this.props.actions.changeOu(ouId);
  };

  render() {
    const userData = this.props.Global;
    const query = new URLSearchParams(this.props.location.search);
    const type = query.get('type');
    const proxyOrgList = [];
    let defaultOrgName = '';
    let defaultOrgId = '';
    let userName = '';
    const { navigateToDashboard } = this;
    if (userData && userData.user && userData.user !== '') {
      defaultOrgName = userData.user.orgName;
      defaultOrgId = userData.user.orgID;
      proxyOrgList.push({ text: defaultOrgName, value: defaultOrgId });
      const orgList = userData.user.proxyOrgList;
      if (!isEmpty(orgList)) {
        forEach(orgList, item => {
          const id = item.orgID;
          let name = item.orgName;
          if (id === 486) {
            name = 'Demo Org';
          }
          proxyOrgList.push({ key: id, text: name, value: id });
        });
      }
      userName = userData.user.firstName;
    }
    const loggedIn = !!this.props.Global.token;

    const productMenuData = [];
    if (this.props.Global.currentOrgDetails) {
      forEach(this.props.Global.currentOrgDetails.module_details, module => {
        if (module.display_order > 0) {
          productMenuData.push({
            text: messages[module.name]
              ? this.props.intl.formatMessage(messages[module.name])
              : module.name,
            value: module.name.toLowerCase(),
            url: module.url,
          });
        }
      });
    }

    const RenderRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => <Component {...props} />} />
    );
    return (
      <CapSpinner spinning={this.props.Global.fetching_userdata}>
        <Helmet>
          <title>Cap</title>
          <meta name="description" content="Description of Cap" />
        </Helmet>
        <div className="wrapper">
          {loggedIn && type !== 'embedded' ? (
            <TopBar
              proxyOrgList={proxyOrgList}
              userName={userName}
              orgName={defaultOrgName}
              orgID={defaultOrgId.toString()}
              changeOrg={this.changeOrg}
              navigateToDashboard={navigateToDashboard}
              logout={this.logout}
              menus={this.state.menus}
              baseUrl={this.props.match.path}
            />
          ) : (
            ''
          )}
          <div className="main">
            <CapWrapper>
              <Switch>
                {/* <Route path={`${this.props.match.path}/`} component={Main} /> */}
                {this.state.routes.map(routeProps => (
                  <RenderRoute {...routeProps} key={routeProps.path} />
                ))}
              </Switch>
            </CapWrapper>
          </div>
        </div>
      </CapSpinner>
    );
  }
}

Cap.propTypes = {
  Global: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  actions: PropTypes.object,
  location: PropTypes.object,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  Global: makeSelectCap(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cap', reducer });
// const withSaga = sagas.map((saga, index) => injectSaga({ key: `cap-${index}`, saga }));
const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

export default compose.apply(null, [withReducer, ...withSaga, withConnect])(
  injectIntl(withRouter(Cap)),
);
