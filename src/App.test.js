import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { BurgerBuilder } from 'containers/BurgerBuilder/BurgerBuilder';
import { Auth } from 'containers/Auth/Auth';
import Layout from 'components/Layout/Layout';

import { UnconnectedApp } from './App';

const checkAuth = jest.fn();
const mockStore = configureMockStore([thunk]);
let store;
const ininState = {
  BurgerBuilder: {
    ingredients: null,
    totalPrice: 4,
    building: false,
  },
  order: [],
  auth: {
    token: null,
    userId: null,
    error: null,
    authRedirect: '/',
  },
};

const customAuthState = {
  BurgerBuilder: {
    ingredients: null,
    totalPrice: 4,
    building: false,
  },
  order: [],
  auth: {
    token: true,
    userId: true,
    error: true,
    authRedirect: '/',
  },
};
const setup = (props = { checkAuth }) => {
  const wrapper = shallow(<UnconnectedApp {...props} />);
  return wrapper;
};

const routerReduxSetup = (state, route, props = { checkAuth }) => {
  return mount(
    <Provider store={state}>
      <MemoryRouter initialEntries={[`${route}`]} initialIndex={0}>
        <UnconnectedApp {...props} />
      </MemoryRouter>
    </Provider>,
  );
};

const setStoreState = initialState => {
  store = mockStore(initialState);
};

describe('test connected app container[integration-test]', () => {
  beforeEach(() => {
    checkAuth.mockClear();
  });

  test('should render the BurgerBuilder component', async () => {
    setStoreState(ininState);
    const wrapper = await routerReduxSetup(store, '/');
    expect(wrapper.find(BurgerBuilder)).toHaveLength(1);
  });

  test(`should render the auth on '/auth' route `, () => {
    setStoreState(ininState);
    const wrapper = routerReduxSetup(store, '/auth');
    expect(wrapper.find(Auth)).toHaveLength(1);
  });
  test(`should not render the auth on '/auth' route `, () => {
    setStoreState(customAuthState);
    const wrapper = routerReduxSetup(store, '/auth');
    expect(wrapper.find(Auth)).toHaveLength(0);
    expect(wrapper.find(BurgerBuilder)).toHaveLength(1);
  });
  test(`should redirect to '/' when undefined route match`, () => {
    setStoreState(customAuthState);
    const wrapper = routerReduxSetup(store, '/undefined');
    expect(wrapper.find(BurgerBuilder)).toHaveLength(1);
  });
});

describe('Test App container', () => {
  beforeEach(() => {
    checkAuth.mockClear();
  });
  test('should call checkAuth on app before mount the app', () => {
    setup({ checkAuth });
    expect(checkAuth).toHaveBeenCalled();
  });
  test('always render component layout', () => {
    const wrapper = setup();
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
});
