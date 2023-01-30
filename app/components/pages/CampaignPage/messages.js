import { defineMessages } from 'react-intl';

const prefix = 'campaign.app.components.pages.CampaignPage';

export default defineMessages({
  bannerContent: {
    id: `${prefix}.bannerContent`,
    defaultMessage:
      'For bounceback, referral, survey and timeline campaigns, please continue to use the old campaign manager.',
  },
  bannerAction: {
    id: `${prefix}.bannerAction`,
    defaultMessage: 'Open old campaign manager',
  },
  campaignsTab: {
    id: `${prefix}.campaignsTab`,
    defaultMessage: 'Campaigns',
  },
  messageCalender: {
    id: `${prefix}.messageCalender`,
    defaultMessage: 'Message Calender',
  },
  performanceTitle: {
    id: `${prefix}.overallPerf`,
    defaultMessage: 'Overall performance',
  },
  performanceSubtitle: {
    id: `${prefix}.perfSubtitle`,
    defaultMessage: '2 years ago',
  },
  creditsHeading: {
    id: `${prefix}.creitsHead`,
    defaultMessage: 'Credits remaining',
  },
  creditBalance: {
    id: `${prefix}.creditsCount`,
    defaultMessage: '3,12,31,07,958',
  },
  searchHeading: {
    id: `${prefix}.CampiagnsHead`,
    defaultMessage: 'Campaigns',
  },
  newCampaignBtn: {
    id: `${prefix}.newCampBtn`,
    defaultMessage: 'New Campaign',
  },
});
