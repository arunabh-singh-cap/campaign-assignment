/**
 * Created by vivek on 22/5/17.
 */
import { loadItem } from './services/localStorageApi';

// const isLoggedIn = loadItem('isLoggedIn') || false;

export default {
  cap: {
    login_progress: false,
    fetching_userdata: false,
    token: loadItem('token') || '',
    orgID: loadItem('orgID') || '',
    user: loadItem('user') || '',
    messages: [],
    metaEntities: {
      tags: [],
      layouts: [],
    },
    // isLoggedIn,
  },
};
