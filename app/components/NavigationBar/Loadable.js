/**
 *
 * Asynchronously loads the component for NavigationBar
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
