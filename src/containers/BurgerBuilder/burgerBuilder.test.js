import React from 'react';
import { shallow } from 'enzyme';
import Modal from 'components/UI/Modal/Modal';
import Spinner from 'components/UI/Spinner/Spinner';
// import findByTestAttr from 'test/utils/findByTestAttr';

import { BurgerBuilder } from './BurgerBuilder';

const setup = props => {
  const wrapper = shallow(<BurgerBuilder {...props} />);
  return wrapper;
};

test('BurgerBuilder render with out error', () => {
  const wrapper = setup({});
  expect(wrapper.find(Modal).exists()).toBe(true);
});

test('display error message when internal component error', () => {
  const wrapper = setup({});
  wrapper.setState({ error: true });
  expect(wrapper.text()).toContain('sorry something went wrong');
});

test('render spinner when no ingredients', () => {
  const wrapper = setup({});
  expect(wrapper.find(Spinner).exists()).toBe(true);
});
