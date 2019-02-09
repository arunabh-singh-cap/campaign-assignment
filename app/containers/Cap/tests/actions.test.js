import * as actions from '../actions';
import * as types from '../constants';

describe('Cap actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: types.LOGOUT_REQUEST,
      };
      expect(actions.logout()).toEqual(expected);
    });
  });
});
