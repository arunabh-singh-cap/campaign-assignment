import { loadItem } from './services/localStorageApi';

export default {
  cap: {
    login_progress: false,
    fetching_userdata: false,
    token: loadItem('token') || '',
    orgID: loadItem('orgID') || '',
    user: loadItem('user') || '',
    menuData: {},
  },
};
