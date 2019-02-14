/**
 * Created by vivek on 21/5/17.
 */
import path from './path';

const config = {
  production: {
    api_endpoint: '/arya/api/v1/creatives',
    auth_endpoint: '/arya/api/v1/auth',
    login_url: '/login',
    dashboard_url: path.publicPath,
    data_org_id: 0,
    logout_url: '/auth/logout',
  },
  development: {
    api_endpoint: 'https://nightly.capillary.in/arya/api/v1/creatives',
    auth_endpoint: 'https://nightly.capillary.in/arya/api/v1/auth',
    login_url: '/login',
    dashboard_url: path.publicPath,
    data_org_id: 0,
  },
  testing: {
    api_endpoint: '',
    auth_endpoint: '',
    login_url: '',
  },
};

export default config;
