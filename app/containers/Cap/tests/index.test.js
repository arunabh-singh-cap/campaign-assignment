import renderer from 'react-test-renderer';
import React from 'react'; // eslint-disable-line no-unused-vars
import { Cap } from '../index';
import * as actions from '../actions';

describe('<Cap />', () => {
  it('renders <Cap /> correctly', () => {
    const props = {
      match: {
        path: '',
      },
      location: {
        search: '',
      },
      Global: {
        token: '',
      },
      actions,
    };
    const tree = renderer.create(<Cap {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
