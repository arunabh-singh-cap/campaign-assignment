import React, { useState, useEffect } from 'react';
import {
  CapRow,
  CapHeading,
  CapIcon,
  CapLabel,
  CapSpin,
  CapButton,
  CapColumn,
  CapInput,
  CapDateRangePicker,
  CapImage,
  CapDivider,
} from '@capillarytech/cap-ui-library';
import { FormattedMessage } from 'react-intl';
import './style.scss';
import moment from 'moment';
import messages from './messages';
import { getEpochTimeStamp } from '../../../utils/commonUtils';

const orgTimeZone = 'Asia/Jakarta';

const NewEditCampaign = ({
  type,
  handleCreateCampaign,
  saveCampaignAction,
  editCampaignData,
  getCampaignsList,
}) => {
  const [spinningState, toggleSpinning] = useState(false);
  const [campaignId, setCampaignId] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    if (type === 'Edit') {
      const { campaignId, campaignName, startDate, endDate } = editCampaignData;
      setCampaignId(campaignId);
      setCampaignName(campaignName);
      setDateRange([moment(startDate), moment(endDate)]);
    }
  }, []);

  const saveCampaign = () => {
    toggleSpinning(true);
    saveCampaignAction({
      campaignId: campaignId,
      campaignName: campaignName,
      startDate: getEpochTimeStamp({
        timezone: orgTimeZone,
        date: dateRange[0],
      }),
      endDate: getEpochTimeStamp({
        timezone: orgTimeZone,
        date: dateRange[1],
      }),
    });
    getCampaignsList(0);
    setTimeout(() => {
      toggleSpinning(false);
      handleCreateCampaign('Save');
    }, 500);
  };

  return (
    <>
      <CapSpin spinning={spinningState}>
        <CapHeading
          type="h1"
          className="page-heading"
          onClick={() => {
            handleCreateCampaign();
          }}
        >
          <CapIcon type="back" className="back-btn" />
          <FormattedMessage {...messages[type].heading} />
        </CapHeading>
        <CapRow className="select-org-desp">
          <CapHeading
            type="h3"
            style={{
              color: messages[type].orgHeading.disabled ? '#b3bac5' : '',
            }}
          >
            <FormattedMessage {...messages[type].orgHeading} />
          </CapHeading>
          <CapLabel
            type="label3"
            style={{ color: messages[type].orgDesp.disabled ? '#b3bac5' : '' }}
          >
            <FormattedMessage {...messages[type].orgDesp} />
          </CapLabel>
        </CapRow>
        <CapRow className="org-change-sec">
          {/* <CapShape shape="square" style={{ display: 'flex' }} /> */}
          <CapHeading type="h3" style={{ display: 'inline', padding: '5px' }}>
            <FormattedMessage {...messages[type].orgName} />
          </CapHeading>
          {messages[type].changeOrg.show && (
            <CapButton type="flat" style={{ color: '#2466ea' }}>
              <FormattedMessage {...messages[type].changeOrg} />
            </CapButton>
          )}
        </CapRow>
        <CapRow>
          <CapColumn span={7} style={{ marginRight: '50px' }}>
            <CapHeading type="h3" style={{ marginBottom: '10px' }}>
              <FormattedMessage {...messages[type].campaignNameHeading} />
            </CapHeading>
            <CapLabel type="label3" style={{ marginBottom: '10px' }}>
              <FormattedMessage {...messages[type].campaignNameDesp} />
            </CapLabel>
            <CapInput.Search
              value={campaignName}
              onChange={e => {
                setCampaignName(e.target.value);
              }}
              placeholder="Enter Campaign Name"
            />
          </CapColumn>
          <CapColumn span={7}>
            <CapHeading type="h3" style={{ marginBottom: '10px' }}>
              <FormattedMessage {...messages[type].campaignDurationHeading} />
            </CapHeading>
            <CapLabel type="label3" style={{ marginBottom: '10px' }}>
              <FormattedMessage {...messages[type].campaignDurationDesp} />
            </CapLabel>
            <CapDateRangePicker
              startDateId="campaignFiltersStart"
              endDateId="campaignFiltersEnd"
              startDate={dateRange.length > 0 ? dateRange[0] : ''}
              endDate={dateRange.length > 0 ? dateRange[1] : ''}
              onChange={e => {
                setDateRange(e);
              }}
            />
          </CapColumn>
        </CapRow>
        <CapRow
          style={{
            marginTop: '30px',
            padding: '30px',
            border: 'solid 1px lightgrey',
          }}
        >
          <CapColumn span={4}>
            <CapImage src="https://crm-nightly-new.cc.capillarytech.com/campaigns/ui/e7227499c8040ae404f032a111a1b39e.png" />
          </CapColumn>
          <CapColumn>
            <CapHeading type="h3">
              <FormattedMessage {...messages[type].smarterCampaignHeading} />
            </CapHeading>
            <CapLabel>
              <FormattedMessage {...messages[type].smarterCampaignDesp} />
            </CapLabel>
            <CapButton
              type="flat"
              className="marketing-obj-btn"
              style={{ color: '#2466ea', border: 'solid 1px #2466ea' }}
            >
              <FormattedMessage {...messages[type].addObjective} />
            </CapButton>
          </CapColumn>
        </CapRow>
        <CapDivider />
        <CapRow style={{ marginBottom: '75px' }}>
          <CapHeading type="h3">
            <FormattedMessage {...messages[type].advanceSetting} />
          </CapHeading>
          <CapLabel type="label3">
            <FormattedMessage {...messages[type].testControl} />
          </CapLabel>
        </CapRow>
        <CapButton
          disabled={campaignName === '' && dateRange.length < 2}
          onClick={saveCampaign}
        >
          <FormattedMessage {...messages[type].saveCampaignBtn} />
        </CapButton>
      </CapSpin>
    </>
  );
};

export default NewEditCampaign;
