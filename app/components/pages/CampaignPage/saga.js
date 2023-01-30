import {
  take,
  call,
  put,
  takeLatest,
  select,
  cancel,
} from 'redux-saga/effects';
import get from 'lodash/get';
import { LOCATION_CHANGE } from 'connected-react-router';
import * as Api from '../../../services/api';

import * as types from './constants';

export function* getCampaignsListMethod({ sheetNumber }) {
  try {
    const payload = {
      limit: 10,
      offset: sheetNumber * 10,
      messageStatsRequired: true,
    };
    const res = yield call(Api.getCampaignsList, payload);
    const { campaignsResponses = [], totalCount } = get(res, 'entity', {});
    yield put({
      type: 'UPDATE_CAMPAIGN_LIST',
      campaignsResponses,
      totalCount,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* searchCampaignListMethod({ searchValue }) {
  try {
    const payload = {
      limit: 10,
      offset: 0,
      messageStatsRequired: true,
      search: searchValue,
    };
    const res = yield call(Api.getCampaignsList, payload);
    const { campaignsResponses = [], totalCount } = get(res, 'entity', {});
    yield put({ type: 'UPDATE_CAMPAIGN_LIST', campaignsResponses, totalCount });
  } catch (error) {
    console.log(error);
  }
}

export function* saveCampaign({ campaignName, startDate, endDate }) {
  try {
    const payload = {
      endDate,
      startDate,
      description: '',
      testControl: { type: 'ORG' },
      name: campaignName,
      campaignsAttached: [],
      gaEnabled: false,
    };
    const res = yield call(Api.saveCampaign, payload);
    if (res.entity.campaignId) {
      getCampaignsListMethod({ sheetNumber: 0 });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetCampaignsList() {
  const watcher = yield takeLatest(
    types.CAMPAIGNS_LIST,
    getCampaignsListMethod,
  );
  yield take(LOCATION_CHANGE);
  const store = yield select();
  if (
    !store
      .getIn(['router', 'location', 'pathname'])
      .includes('/campaigns/ui/list')
  ) {
    yield cancel(watcher);
  }
}

export function* watchSearchCampaignsList() {
  const watcher = yield takeLatest(
    types.SEARCH_CAMPAIGNS,
    searchCampaignListMethod,
  );
  yield take(LOCATION_CHANGE);
  const store = yield select();
  if (
    !store
      .getIn(['router', 'location', 'pathname'])
      .includes('/campaigns/ui/list')
  ) {
    yield cancel(watcher);
  }
}

export function* watchSaveCampaignsList() {
  const watcher = yield takeLatest(types.SAVE_NEW_CAMPAIGN, saveCampaign);
  yield take(LOCATION_CHANGE);
  const store = yield select();
  if (
    !store
      .getIn(['router', 'location', 'pathname'])
      .includes('/campaigns/ui/list')
  ) {
    yield cancel(watcher);
  }
}

export default [
  watchGetCampaignsList,
  watchSearchCampaignsList,
  watchSaveCampaignsList,
];
