import React from 'react';
const routes = [
  {
    exact: true,
    path: '/org/giftcards/GiftCardMapping',
    component: () => (
      <h2 style={{ marginLeft: '30px', marginTop: '30px' }}>
        Gift Card Container
      </h2>
    ),
  },
  {
    exact: true,
    path: '/org/giftcards/UploadGiftCard',
    component: () => (
      <h2 style={{ marginLeft: '30px', marginTop: '30px' }}>
        Upload Gift Card
      </h2>
    ),
  },
];

export default routes;
