import * as types from './constants';

export const getCampaignsList = sheetNumber => ({
  type: types.CAMPAIGNS_LIST,
  sheetNumber: sheetNumber,
});

export const searchCampaignList = (searchType, value, startDate, endDate) => ({
  type: types.SEARCH_CAMPAIGNS,
  searchType,
  searchValue: value,
  startDate,
  endDate,
});

export const saveNewCampaign = params => {
  const { campaignId, campaignName, startDate, endDate } = params;
  return {
    type: types.SAVE_NEW_CAMPAIGN,
    campaignId,
    campaignName,
    startDate,
    endDate,
  };
};
