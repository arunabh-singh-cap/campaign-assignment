import React from 'react';
import { FormattedMessage } from 'react-intl';
import globalMessages from '../Cap/messages';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const COMPLETE = 'COMPLETE';
export const SMS = 'SMS';
export const EMAIL = 'EMAIL';
export const WECHAT = 'WECHAT';
export const MOBILEPUSH = 'MOBILEPUSH';
export const EDIT = 'EDIT';
export const ANDROID = 'ANDROID';
export const IOS = 'IOS';

export const VIEW_COUPON_SERIES = 'viewCouponSeries';
export const COUPON = 'COUPON';
export const CREATIVES = 'CREATIVES';
export const LOYALTY = 'LOYALTY';

export const TIERS_CONNECTION_LINE_COLOR = 'gray';
export const TIERS_CONNECTION_LINE_WIDTH = '1px';
export const TIER_CARD_DIMENSION = {
  DEFAULT_WIDTH: '208px',
  DEFAULT_HEIGHT: '66px',
  WITH_BODY_HEIGHT: '466px',
  WITH_DOWNGRADE_HEIGHT: '143px',
};

export const getSettingsMenuData = () => [
  {
    title: <FormattedMessage {...globalMessages.message} />,
    key: 'message',
    link: `/loyalty/ui/settings/message`,
  },
  {
    title: <FormattedMessage {...globalMessages.reports} />,
    key: 'reports',
    link: `/loyalty/ui/settings/report-settings`,
  },
  {
    title: <FormattedMessage {...globalMessages.alerts} />,
    key: 'alerts',
    link: `/loyalty/ui/settings/alerts`,
  },
];

export const getTopbarMenuDataValue = () => [
  {
    label: <FormattedMessage {...globalMessages.campaignPage} />,
    link: '/campaigns',
    key: 'campaigns',
  },
  {
    label: <FormattedMessage {...globalMessages.tab1} />,
    link: '/',
    key: 'programs',
  },
  {
    label: <FormattedMessage {...globalMessages.tab2} />,
    link: '/tab2/',
    key: 'tab2',
  },
  {
    label: <FormattedMessage {...globalMessages.tab3} />,
    link: '/tab2/',
    key: 'tab3',
  },
];

export const STRATEGY_NAME = 'STRATEGY_NAME';
export const WORKFLOW = 'WORKFLOW';
export const TIER = 'TIER';
export const SLAB_INDEPENDENT = 'SLAB_INDEPENDENT';
export const SLAB_DEPENDENT = 'SLAB_DEPENDENT';
export const NEVER = 'NEVER';
export const FIXED_DATE = 'FIXED_DATE';
export const NUM_DAYS = 'NUM_DAYS';
export const NUM_MONTHS_END = 'NUM_MONTHS_END';
export const POINTS_EXPIRY_PERIOD = 'POINTS_EXPIRY_PERIOD';

export const MODE_VIEW = 'view';
export const MODE_CONFIGURE = 'configure';
export const EXPIRY_FROM = 'EXPIRY_FROM';

export const EXPIRY_TYPE_MAP = {
  CURRENT_DATE: 'eventDate',
  ACTIVITY_BASED_EXTENSION: 'rollingFromEventDate',
  MEMBERSHIP_DATE: 'membershipExpiryDate',
  EXPIRY_DATE_BEFORE_REDEMPTION_REVERSAL: 'expiryDateBeforeRedemptionReversal',
  FARTHEST_POINTS_TRANSFERRED_EXPIRY_DATE: 'farthestPointsTransferedExpiryDate',
  EXPIRY_DATE_BEFORE_POINTS_CONTRIBUTION_TO_GROUP:
    'expiryDateBeforePointsContributionToGroup',
};

export const WINDOW_TYPE_MAP = {
  MOVING_WINDOW: 'modeMovingWindow',
  CYCLIC_WINDOW: 'modeCyclicWindow',
  CALENDAR_BASED_CYCLIC_WINDOW: 'modeCalendarBasedCyclicWindow',
  TIER_CHANGE_WINDOW: 'modeTierChangeWindow',
};

export const POSSIBLE_OPERATION_MAP = {
  SUM: 'sum',
  COUNT: 'count',
};

export const MODULE_MAP = {
  LOYALTY: 'loyalty',
  CAMPAIGNS: 'campaigns',
};

export const POSSIBLE_OPERATORS_MAP = {
  OP_EQUAL: 'operationEqualTo',
  OP_GT: 'operationGreaterThan',
  OP_LT: 'operationLessThan',
  OP_GTEQ: 'operationGreaterThanEqualTo',
  OP_LTEQ: 'operationLessThanEqualTo',
  OP_MOD: 'operationModOf',
  OP_BETWEEN: 'operationBetween',
};

export const TRACKER_TYPE_MAP = {
  BILL_AMOUNT: 'billAmount',
  BILL_DISCOUNT: 'billDiscount',
  BILL_GROSS_AMOUNT: 'billGrossAmount',
  BILL_TOTAL_QTY: 'billTotalQuantity',
  LINEITEM_AMOUNT: 'lineitemAmount',
  LINEITEM_COUNT: 'lineitemCount',
  LINEITEM_QTY: 'lineitemQuantity',
  CUSTOMER_VISITS: 'customerVisits',
  POINTS: 'points',
  BILL_EXTENDED_FIELD: 'billExtendedField',
  LINEITEM_EXTENDED_FIELD: 'lineitemExtendedField',
};

export const EXPIRY_TIME_MAP = {
  NUM_DAYS: 'days',
  NUM_MONTHS_END: 'months',
  FIXED_DATE: 'date',
  NEVER: 'never',
};

export const POINTS_RETURN_MODE_MAP = {
  points_tender_mode: 'pointsTenderMode',
  redemption_reference: 'redemptionReference',
  redemption_reference_bill_number: 'redemptionReferenceBillNo',
};
