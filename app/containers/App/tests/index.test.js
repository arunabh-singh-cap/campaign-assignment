import React from 'react'; // eslint-disable-line no-unused-vars
import renderer from 'react-test-renderer';
import App from '../index';

describe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = renderer.create(<App />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
