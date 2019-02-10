import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import LoginForm from '../index';
const authenticate = () => ({ username: '', password: '' });

it('renders correctly', () => {
  const tree = renderer
    .create(<LoginForm authenticate={authenticate} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('check button, input has been defined ', () => {
  const component = mount(<LoginForm authenticate={authenticate} />);
  expect(component.find('button')).toBeDefined();
  expect(component.find('button')).toHaveLength(1);
  expect(component.find('input')).toHaveLength(2);
  component.unmount();
});

it('check button click event', () => {
  const component = mount(<LoginForm authenticate={authenticate} />);
  component.find('button').simulate('click');
  expect(component.state('test')).toEqual('123');
});
