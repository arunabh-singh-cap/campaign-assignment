import React from 'react';
const routes = [
  {
    exact: true,
    path: '/org/giftcards/GiftCardMapping',
    component: () => <h2>Bubblegum</h2>,
  },
  {
    path: '/org/giftcards/UploadGiftCard',
    component: () => <h2>Shoelaces</h2>,
  },
];

export default routes;
