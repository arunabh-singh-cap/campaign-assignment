import * as types from './constants';

export const getCampaignsList = sheetNumber => ({
  type: types.CAMPAIGNS_LIST,
  sheetNumber: sheetNumber,
});

export const searchCampaignList = value => ({
  type: types.SEARCH_CAMPAIGNS,
  searchValue: value,
});

export const saveNewCampaign = params => {
  const { campaignName, startDate, endDate } = params;
  return {
    type: types.SAVE_NEW_CAMPAIGN,
    campaignName,
    startDate,
    endDate,
  };
};
