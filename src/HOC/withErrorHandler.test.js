import React from 'react';
import setupMountWrapper from 'test/helpers/setupMountWrapper';
import Modal from 'components/UI/Modal/Modal';
import withErrorHandler from 'HOC/withErrorHandler';
import axios from 'axios';

const TestComponent = props => {
  return <h1>TestComponent</h1>;
};

const props = {
  name: 'Hmmmm',
};
const HOC = withErrorHandler(TestComponent, axios);
test('should render TestComponent and Modal', () => {
  const wrapper = setupMountWrapper(HOC);
  expect(wrapper.find(Modal)).toHaveLength(1);
  expect(wrapper.find(TestComponent)).toHaveLength(1);
});
test('should pass props to wrapped component', () => {
  const wrapper = setupMountWrapper(HOC, props);
  expect(wrapper.find(TestComponent).props().name).toBe(props.name);
});
test('should view error message on the Model', () => {
  const wrapper = setupMountWrapper(HOC, props);
  wrapper.setState({ error: { message: 'test' } });
  expect(wrapper.find(Modal).text()).toContain('test');
});
