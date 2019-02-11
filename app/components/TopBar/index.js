import React from 'react';
import PropTypes from 'prop-types';
import { CapTopBar } from '@capillarytech/cap-ui-library';
import { withRouter } from 'react-router-dom';
import { loadItem } from 'services/localStorageApi';

class TopBar extends React.Component {
  handleOrgChange = orgId => {
    const selectedOrg = loadItem('orgID');
    if (selectedOrg !== orgId) {
      this.props.changeOrg(orgId);
    }
  };

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const {
      proxyOrgList,
      userName,
      productMenuData,
      selectedProduct,
      handleProductChange,
    } = this.props;
    const selectedOrg = loadItem('orgID');
    return (
      <CapTopBar
        primarySelectProps={{
          items: proxyOrgList,
          selectedItem: selectedOrg,
          handleItemChange: this.handleOrgChange,
          selectPlaceholder: 'Select Organization',
        }}
        secondarySelectProps={{
          items: productMenuData,
          selectedItem: selectedProduct,
          handleItemChange: handleProductChange,
          selectPlaceholder: 'Select Product',
        }}
        userName={userName}
        onLogoutClick={this.logout}
      />
    );
  }
}

TopBar.propTypes = {
  userName: PropTypes.string,
  proxyOrgList: PropTypes.array,
  productMenuData: PropTypes.array,
  handleProductChange: PropTypes.func,
  selectedProduct: PropTypes.string,
  changeOrg: PropTypes.func,
  logout: PropTypes.func,
};

export default withRouter(TopBar);
