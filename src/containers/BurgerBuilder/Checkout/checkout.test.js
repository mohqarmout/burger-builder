import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import CheckoutSummary from 'components/Order/checkoutSummary/CheckoutSummary';
import { BurgerBuilder } from 'containers/BurgerBuilder/BurgerBuilder';
import { Checkout } from './Checkout';

const ingredients = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
};

const setup = props => {
  return mount(
    <MemoryRouter initialEntries={['checkout']} initialIndex={0}>
      <>
        <Route
          path="/"
          render={routeProps => <BurgerBuilder {...routeProps} />}
        />
        <Route
          path="checkout"
          render={routeProps => <Checkout {...props} {...routeProps} />}
        />
      </>
    </MemoryRouter>,
  );
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toHaveLength(1);
});
test(`render CheckoutSummary if there is an ingredients`, () => {
  const wrapper = setup(ingredients);
  expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
});
test(`render BurgerBuilder if no ingredients `, () => {
  const wrapper = setup();
  expect(wrapper.find(BurgerBuilder)).toHaveLength(1);
});

test(`Cancel handler should go back to '/'`, () => {
  const wrapper = setup(ingredients);
  wrapper
    .find(Checkout)
    .props()
    .history.replace('/checkout/contact-data'),
    expect(wrapper.find(Checkout).props().history.location.pathname).toBe(
      '/checkout/contact-data',
    );
});
