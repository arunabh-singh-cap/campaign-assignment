import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectCapCampaign = (state = fromJS({})) => state.get('campaignCap');

const makeCampaignsList = () =>
  createSelector(selectCapCampaign, (substate = fromJS({})) => ({
    campaignsList: substate.get('campaignsList'),
    totalCount: substate.get('totalCount'),
  }));

export { makeCampaignsList };
