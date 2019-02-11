/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cap state domain
 */

const selectCap = state => state.get('cap', initialState);

/**
 * Other specific selectors
 */

function getParsedMenuData(data) {
  return Object.entries(data).map(([key, value]) => {
    if (value.url) {
      return {
        title: value.name,
        key,
        link: value.url,
      };
    }
    return {
      title: key,
      key,
      children: getParsedMenuData(value),
    };
  });
}

const makeSelectCap = () =>
  createSelector(selectCap, capstate => capstate.toJS());

const makeSelectUser = () =>
  createSelector(selectCap, capstate => !!capstate.get('token'));

const makeSelectUserLoading = () =>
  createSelector(selectCap, capstate => capstate.get('loadingUser'));

const makeSelectMenuData = () =>
  createSelector(selectCap, capstate => {
    const menuData = capstate.get('menuData').toJS();
    let parsedMenuData = [];
    if (menuData.status === 'success' && menuData.data) {
      parsedMenuData = getParsedMenuData(menuData.data._actions);
    }
    return parsedMenuData;
  });

export {
  selectCap,
  makeSelectCap,
  makeSelectUserLoading,
  makeSelectUser,
  makeSelectMenuData,
};
