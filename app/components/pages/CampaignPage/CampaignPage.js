import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import debounce from 'lodash/debounce';
import injectSaga from 'utils/injectSaga';
import { withRouter } from 'react-router';
import {
  CapBanner,
  CapLink,
  CapLabel,
  CapRow,
  CapColumn,
  CapHeader,
  CapIcon,
  CapTag,
  CapTab,
  CapInput,
  CapDateRangePicker,
  CapHeading,
  CapDivider,
  CapButton,
  CapTable,
  CapSpin,
} from '@capillarytech/cap-ui-library';
import {
  CAP_G06,
  CAP_G08,
  CAP_SPACE_04,
} from '@capillarytech/cap-ui-library/styled/variables';
import './style.scss';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import sagas from './saga';

import messages from './messages';
import { CapTags, CapTabsOptions, TableColumns } from './constants';
import NewEditCampaign from '../../organisms/NewEditCampaign.js/NewEditCampaign';

// Destructing
const { makeCampaignsList } = selectors;
const { CapLabelInline } = CapLabel;

const CampaignPage = ({
  actions,
  campaignsListData,
  intl: { formatMessage },
}) => {
  const [campaignList, updateCampaignsList] = useState([]);
  const [searchValue, updateSearchValue] = useState('');
  const [spinningState, toggleSpinning] = useState(true);
  const [redirectCreateCampaignPage, toggleCreateCampaignPage] = useState('');

  const { campaignsList, totalCount } = campaignsListData;

  //CDM
  useEffect(
    () => {
      actions.getCampaignsList(0);
    },
    [actions],
  );

  // Side-effects handling and updating the state
  useEffect(
    () => {
      if (campaignsList.length > 0) {
        updateCampaignsList(campaignsList);
        toggleSpinning(false);
      }
    },
    [campaignsListData],
  );
  const CapBannerSection = () => (
    <div className="cap-banner-wrapper">
      <CapBanner
        iconProps={{
          type: 'survey',
          size: 's',
          backgroundProps: {
            backgroundColor: CAP_G08,
            padding: `${CAP_SPACE_04} 7px 6px`,
          },
          withBackground: true,
        }}
        bannerContent={
          <CapLabel type="label1">
            <FormattedMessage {...messages.bannerContent} />
          </CapLabel>
        }
        actionContent={
          <CapLink
            href=""
            title={formatMessage(messages.bannerAction)}
            fontWeight="m"
          />
        }
      />
    </div>
  );

  const CapPerformanceSection = () => (
    <div className="cap-performance-wrapper">
      <CapRow>
        <CapColumn span={19}>
          <CapHeader
            title={formatMessage(messages.performanceTitle)}
            size="regular"
          />
          <CapIcon type="sync" />{' '}
          <CapLabelInline type="label3">
            {formatMessage(messages.performanceSubtitle)}
          </CapLabelInline>
          <CapRow className="timeline-row">
            {CapTags.map(tagValue => (
              <CapTag
                className={`time-tags ${tagValue === '1M' ? 'checked' : ''}`}
              >
                {tagValue}
              </CapTag>
            ))}
          </CapRow>
        </CapColumn>
        <CapDivider
          type="vertical"
          style={{
            height: '32px',
            marginTop: CAP_SPACE_04,
            position: 'absolute',
            color: CAP_G06,
            left: '800px',
          }}
        />
        <CapColumn>
          <CapHeading type="h6">
            {formatMessage(messages.creditsHeading)}
          </CapHeading>
          <CapHeading type="h3">
            {formatMessage(messages.creditBalance)}
            <CapIcon className="credit-icon" type="open-in-new-light" />
          </CapHeading>
        </CapColumn>
      </CapRow>
    </div>
  );

  const CapTabSection = () => (
    <div className="cap-tab-wrapper">
      <CapTab panes={CapTabsOptions} />
    </div>
  );

  // Function to handle only the Campaign Search related functionalities
  const searchListener = debounce(() => {
    if (searchValue.length >= 3) {
      toggleSpinning(true);
      actions.searchCampaignList(searchValue);
    }
  }, 1000);

  const clearSearchValue = () => {
    updateSearchValue('');
  };

  const handleSearchCampaign = e => {
    updateSearchValue(e.target.value);
    searchListener();
  };

  const CapSearchSection = () => (
    <div className="cap-search-wrapper">
      <CapHeading type="h2">{formatMessage(messages.searchHeading)}</CapHeading>
      <CapRow className="cam-filter-row" gutter={24}>
        <CapColumn span={6}>
          <CapInput.Search
            value={searchValue}
            placeholder="Search Campaigns"
            size="large"
            allowClear
            onChange={handleSearchCampaign}
            onClear={clearSearchValue}
          />
        </CapColumn>
        <CapColumn span={7}>
          <CapDateRangePicker />
        </CapColumn>
        <CapDivider
          type="vertical"
          style={{
            height: '32px',
            marginTop: CAP_SPACE_04,
            position: 'absolute',
            color: CAP_G06,
            left: '800px',
          }}
        />
        <CapButton
          className="cap-newcamp-btn"
          onClick={() => handleCreateCampaign('New')}
        >
          {formatMessage(messages.newCampaignBtn)}
        </CapButton>
      </CapRow>
    </div>
  );

  // Function to handle only the Cap Table related data
  const CapTableSection = () => (
    <CapSpin spinning={spinningState}>
      {totalCount && (
        <CapLabel type="label7" style={{ margin: '20px 0 15px' }}>
          {totalCount} matching results
        </CapLabel>
      )}
      <div className="campaign-table">
        <CapTable
          columns={TableColumns}
          dataSource={campaignList}
          infinteScroll
          scroll={{ y: 645 }}
        />
      </div>
    </CapSpin>
  );

  const handleCreateCampaign = type => {
    switch (type) {
      case 'New' || 'Edit':
        toggleCreateCampaignPage(type);
        break;
      default:
        toggleCreateCampaignPage('');
    }
  };

  if (redirectCreateCampaignPage === 'New') {
    return (
      <NewEditCampaign
        type="New"
        handleCreateCampaign={handleCreateCampaign}
        saveCampaignAction={actions.saveNewCampaign}
      />
    );
  }

  return (
    <>
      <CapBannerSection />
      <CapPerformanceSection />
      <CapTabSection />
      <CapSearchSection />
      <CapTableSection />
    </>
  );
};

CampaignPage.propTypes = {
  campaignsListData: PropTypes.object,
  actions: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  campaignsListData: makeCampaignsList(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

export default compose.apply(null, [...withSaga, withConnect])(
  withRouter(injectIntl(CampaignPage)),
);
