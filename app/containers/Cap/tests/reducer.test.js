import { fromJS } from 'immutable';
import capReducer from '../reducer';
import initialState from '../../../initialState';

describe('capReducer', () => {
  it('returns the initial state', () => {
    expect(capReducer(undefined, {})).toEqual(fromJS(initialState));
  });
});
