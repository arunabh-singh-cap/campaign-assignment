import { lazy } from 'react';
import * as path from '../../../config/path';

const { publicPath, campaignPath } = path;

const routes = [
  {
    exact: true,
    path: `${publicPath}/dashboard`,
    type: 'dashboard',
    component: lazy(() => import('../Dashboard')),
  },
  {
    exact: true,
    path: `${publicPath}/accessForbidden`,
    type: 'authenticationFlow',
    component: lazy(() => import('../AccessForbidden')),
  },
  {
    exact: true,
    path: `${campaignPath}/list`,
    type: 'campaignFlow',
    component: lazy(() => import('../CampaignPage')),
  },
];

export default routes;
