/**
 *
 * NavigationBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CapSideBar } from '@capillarytech/cap-ui-library';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { isEmpty, forEach } from 'lodash';
import NotFoundPage from '../../containers/NotFoundPage';
import TopBar from '../TopBar';

const CapWrapper = styled.div`
  display: flex;
  padding: 0;
  background-color: #ffffff;
`;

const ComponentWrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

const RenderRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: '',
    };
  }

  onSideBarLinkClick = item => {
    const { history } = this.props;
    this.setState({ selectedMenuItem: item.key });
    history.push(item.link, { code: item.key });
  };

  handleProductChange = (value, option) => {
    const { match } = this.props;
    const { path } = match;
    if (option.url !== `${path}/index`) {
      window.location.pathname = option.url;
    }
  };

  getTopBarData = () => {
    const { userData } = this.props;
    const proxyOrgList = [];
    let userName = '';
    if (userData && userData.user && userData.user !== '') {
      const defaultOrgName = userData.user.orgName;
      const defaultOrgId = userData.user.orgID;
      proxyOrgList.push({ label: defaultOrgName, value: defaultOrgId });
      const orgList = userData.user.proxyOrgList;
      if (!isEmpty(orgList)) {
        forEach(orgList, item => {
          const id = item.orgID;
          let name = item.orgName;
          if (id === 486) {
            name = 'Demo Org';
          }
          if (id !== defaultOrgId) {
            proxyOrgList.push({ label: name, value: id });
          }
        });
      }
      userName = userData.user.firstName;
    }
    return { userName, proxyOrgList };
  };

  getProductMenuData = () => {
    const { currentOrgDetails } = this.props.userData;
    const productMenuData = [];
    if (currentOrgDetails) {
      forEach(currentOrgDetails.module_details, module => {
        productMenuData.push({
          label: module.name,
          value: module.name.toLowerCase(),
          url: module.url,
        });
      });
    }
    return productMenuData;
  };

  onSettingsClick = () => {
    const { settingsUrl } = this.props;
    if (settingsUrl) {
      window.location.pathname = settingsUrl;
    }
  };

  onTopMenuClick = item => {
    const { history } = this.props;
    history.push(item.link, { code: item.key });
  };

  render() {
    const {
      componentRoutes,
      menuData,
      menuItemsPosition,
      logout,
      changeOrg,
    } = this.props;
    const { userName, proxyOrgList } = this.getTopBarData();
    const productMenuData = this.getProductMenuData();
    const { selectedMenuItem } = this.state;
    let customTopBarProps = {};
    if (menuItemsPosition === 'top') {
      customTopBarProps = {
        menuProps: {
          items: menuData,
          selectedItem: '',
          onMenuItemClick: this.onTopMenuClick,
        },
      };
    }
    return (
      <React.Fragment>
        <TopBar
          proxyOrgList={proxyOrgList}
          userName={userName}
          changeOrg={changeOrg}
          logout={logout}
          onSettingsClick={this.onSettingsClick}
          productMenuData={productMenuData}
          selectedProduct="campaigns"
          handleProductChange={this.handleProductChange}
          {...customTopBarProps}
        />
        <CapWrapper>
          {menuData.length > 0 && menuItemsPosition === 'left' ? (
            <CapSideBar
              sidebarItems={menuData}
              onLinkClick={this.onSideBarLinkClick}
              selectedMenuItem={selectedMenuItem}
              defaultActiveKey=""
            />
          ) : (
            ''
          )}
          <ComponentWrapper>
            <Switch>
              {componentRoutes.map(routeProps => (
                <RenderRoute {...routeProps} key={routeProps.path} />
              ))}
              <RenderRoute component={NotFoundPage} />
            </Switch>
          </ComponentWrapper>
        </CapWrapper>
      </React.Fragment>
    );
  }
}

NavigationBar.propTypes = {
  componentRoutes: PropTypes.array,
  userData: PropTypes.object,
  menuData: PropTypes.array,
  menuItemsPosition: PropTypes.string,
  logout: PropTypes.func,
  changeOrg: PropTypes.func,
  settingsUrl: PropTypes.string,
};

export default withRouter(NavigationBar);
