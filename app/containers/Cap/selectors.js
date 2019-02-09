import { createSelector } from 'reselect';

/**
 * Direct selector to the cap state domain
 */

const selectCapDomain = state => state.get('cap');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cap
 */

const makeSelectCap = () =>
  createSelector(selectCapDomain, substate => substate.toJS());

const makeSelectLogin = () =>
  createSelector(selectCapDomain, substate => substate.toJS());

const makeSelectUser = () =>
  createSelector(selectCapDomain, substate => !!substate.toJS().token);

const makeSelectUserLoading = () =>
  createSelector(selectCapDomain, substate => substate.toJS().loadingUser);

export {
  selectCapDomain,
  makeSelectCap,
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectLogin,
};
