import { loadItem } from './services/localStorageApi';

export const initialState = {
  login_progress: false,
  fetching_userdata: false,
  token: loadItem('token') || '',
  orgID: loadItem('orgID') || '',
  user: loadItem('user') || '',
  menuData: {},
};
