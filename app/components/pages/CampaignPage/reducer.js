import { fromJS } from 'immutable';

const initialState = fromJS({
  campaignsList: [],
  totalCount: 0,
});

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CAMPAIGN_LIST': {
      const { campaignsResponses = [], totalCount } = action;
      return state
        .set('campaignsList', campaignsResponses)
        .set('totalCount', totalCount);
    }
    default:
      return state;
  }
};

export default campaignReducer;
