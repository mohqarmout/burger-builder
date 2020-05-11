import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Modal from 'components/UI/Modal/Modal';
import Spinner from 'components/UI/Spinner/Spinner';
import { BurgerBuilder } from './BurgerBuilder';

afterEach(() => {
  jest.restoreAllMocks();
});

const setup = props => {
  return mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Route
        path="/"
        render={routeProps => <BurgerBuilder {...props} {...routeProps} />}
      />
    </MemoryRouter>,
  );
};

test('BurgerBuilder render with out error', () => {
  const wrapper = setup();
  expect(wrapper.find(Modal).exists()).toBe(true);
  console.log(wrapper.debug());
});
test('display error message when internal component error', () => {
  const wrapper = setup();
  wrapper.setState({ error: true });
  expect(wrapper.text()).toContain('sorry something went wrong');
});
test('render spinner when no ingredients', () => {
  const wrapper = setup();
  expect(wrapper.find(Spinner).exists()).toBe(true);
});
