import React from 'react';
import {
  CapColumn,
  CapHeader,
  CapHeading,
  CapIcon,
  CapLabel,
  CapRow,
  CapTooltipWithInfo,
  CapTooltip,
} from '@capillarytech/cap-ui-library';
import moment from 'moment';

// import { CAP_SPACE_04 } from '@capillarytech/cap-ui-library/styled/variables';

export const CapTags = ['7D', '1M', '3M', '6M'];

export const CAMPAIGNS_LIST = 'cap/CAMPAIGNS_LIST_REQUEST';
export const SEARCH_CAMPAIGNS = 'cap/SEARCH_CAMPAIGNS_LIST_REQUEST';
export const SAVE_NEW_CAMPAIGN = 'cap/SAVE_NEW_CAMPAIGN';

export const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';

export const CapTabsOptions = [
  {
    tab: 'Campaigns',
    key: 'campaignsTab',
  },
  {
    tab: 'Message Calender',
    key: 'messageCalender',
  },
];

const performanceChildrens = [
  {
    key: 'contactedCustomers',
    header: 'Contacted Customers',
    tooltip:
      'The total number of customers to whom a communication has been sent out to as part of the campaign',
  },
  {
    key: 'deliveryRate',
    header: 'Delivery Rate',
    tooltip:
      'The percentage of customers to whom a communication has been sent out and have successfully received them',
  },
  {
    key: 'hitRate',
    header: 'Hit Rate',
    tooltip:
      'The percentage of customers to whom the communication has been sent out to and have transacted in the campaign duration',
  },
  {
    key: 'responderSales',
    header: 'Responder Sales',
    tooltip:
      'Total sales from the targeted customers during the campaign duration',
  },
];

const CampaignStatus = (startDate, endDate) => {
  let statusMsg = '';
  if (moment().isBefore(moment(startDate))) {
    statusMsg = 'upcoming';
  } else if (moment().isAfter(moment(endDate))) {
    statusMsg = 'ended';
  } else if (moment().isBetween(moment(startDate), moment(endDate))) {
    statusMsg = 'live';
  }
  return statusMsg;
};

const performanceChildrensColumns = performanceChildrens.map(child => ({
  title: (
    <>
      <CapLabel
        type="label1"
        className="truncate-text"
        title={child.header}
        style={{ maxWidth: '82px', display: 'inline-block' }}
      >
        {child.header}
      </CapLabel>
      <CapTooltipWithInfo
        infoIconProps={{ style: { marginLeft: '2px', position: 'absolute' } }}
        title={child.tooltip}
      />
    </>
  ),
  dataIndex: 'performanceColumn',
  key: `performanceColumn_${child.header}`,
  width: '11%',
  render: () => <>-</>,
}));

export const TableColumns = handleCreateCampaign => [
  {
    title: (
      <CapHeader
        size="small"
        title="Campaign Name"
        description={
          <>
            Marketing objective
            <span style={{ padding: '0 8px' }}>|</span>
            Message count
          </>
        }
      />
    ),
    width: '30%',
    dataIndex: 'name',
    key: 'name',
    render: (text, campaign) => {
      const { messageStats } = campaign;
      const totalMsg = Object.values(messageStats).reduce((a, b) => a + b);
      return (
        <>
          <CapRow style={{ padding: '10px 0' }}>
            <CapColumn span={3}>
              <CapIcon type="megaphone" style={{ color: 'lightGrey' }} />
            </CapColumn>
            <CapColumn span={16}>
              <CapHeading type="h4">{text}</CapHeading>
            </CapColumn>
            <CapColumn>
              <CapLabel type="label3">Capillary Technologies</CapLabel>
            </CapColumn>
          </CapRow>
          <CapRow>
            <CapColumn span={3} />
            <CapLabel type="label3">{totalMsg} messages</CapLabel>
          </CapRow>
        </>
      );
    },
  },
  {
    title: (
      <CapHeader size="small" title="Duration" description={<>Status</>} />
    ),
    width: '19%',
    dataIndex: 'age',
    key: 'age',
    render: (text, campaign) => {
      const { startDate, endDate } = campaign;
      let duration = `${moment(startDate).format(
        DATE_DISPLAY_FORMAT,
      )} - ${moment(endDate).format(DATE_DISPLAY_FORMAT)}`;

      return (
        <>
          <CapHeading type="h5">{duration}</CapHeading>
          <CapLabel type="label1" style={{ marginTop: '5px' }}>
            Campaign duration details
          </CapLabel>
          <CapLabel type="label2" style={{ marginTop: '8px' }}>
            {CampaignStatus(startDate, endDate)}
          </CapLabel>
        </>
      );
    },
  },
  {
    title: <CapHeader size="small" title="Performance" />,
    dataIndex: 'address',
    key: '1',
    children: performanceChildrensColumns,
    className: 'table-parent',
  },
  {
    title: '',
    dataIndex: 'act',
    key: 'act',
    width: '7%',
    render: (text, campaign) => (
      <>
        <CapTooltip
          infoIconProps={{ style: { marginLeft: '2px', position: 'absolute' } }}
          title="Edit"
        >
          <CapIcon
            type="more"
            onClick={() =>
              handleCreateCampaign(
                'Edit',
                campaign.campaignId,
                campaign.name,
                campaign.startDate,
                campaign.endDate,
              )
            }
          />
        </CapTooltip>
      </>
    ),
  },
];

export const TableData = [
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1152880,
    name: 'independence referral',
    description: '',
    startDate: 1674557282225,
    endDate: 1675184399999,
    testControl: { type: 'ORG', testPercentage: 82 },
    objective: { objectiveName: 'Acquire' },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1150777,
    name: 'CampaignName_39',
    description: '',
    startDate: 1674061200000,
    endDate: 1674493199999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1150144,
    name: 'test1290318',
    description: '',
    startDate: 1671624314457,
    endDate: 1672505999999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1147777,
    name: 'tesoay2',
    description: '',
    startDate: 1669361447586,
    endDate: 1671469199999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1147309,
    name: 'sdadasd',
    description: '',
    startDate: 1669050000000,
    endDate: 1669827599999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1145965,
    name: 'test234',
    description: '',
    startDate: 1667793202186,
    endDate: 1667926799999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1142938,
    name: 'wqeeqwe',
    description: '',
    startDate: 1663747349691,
    endDate: 1672505999999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1142524,
    name: 'uks',
    description: '',
    startDate: 1663150780715,
    endDate: 1667235599999,
    testControl: { type: 'ORG', testPercentage: 82 },
    objective: { objectiveName: 'Acquire' },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1142403,
    name: 'Test0281',
    description: '',
    startDate: 1663693200000,
    endDate: 1666025999999,
    testControl: { type: 'ORG', testPercentage: 82 },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
  {
    gaEnabled: false,
    utmParams: { utmEnabled: false },
    campaignId: 1141563,
    name: 'Ashish test',
    description: '',
    startDate: 1663174800000,
    endDate: 1665161999999,
    testControl: { type: 'ORG', testPercentage: 82 },
    objective: { objectiveName: 'Boost_Sales' },
    messageStats: { approved: 0, created: 0, rejected: 0, stopped: 0 },
    orgUnitId: -1,
    totalMessagesCount: 0,
  },
];
