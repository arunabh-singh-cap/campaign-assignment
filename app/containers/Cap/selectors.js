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

const makeSelectCap = () =>
  createSelector(selectCap, capstate => capstate.toJS());

const makeSelectUser = () =>
  createSelector(selectCap, capstate => !!capstate.get('token'));

const makeSelectUserLoading = () =>
  createSelector(selectCap, capstate => capstate.get('loadingUser'));

export { selectCap, makeSelectCap, makeSelectUserLoading, makeSelectUser };
