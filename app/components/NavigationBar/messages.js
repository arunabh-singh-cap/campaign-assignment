/*
 * NavigationBar Messages
 *
 * This contains all the text for the NavigationBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavigationBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NavigationBar component!',
  },
});
