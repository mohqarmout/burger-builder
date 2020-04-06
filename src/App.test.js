import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import thunk from 'redux-thunk';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Layout from 'components/Layout/Layout';
import { UnconnectedApp } from './App';

// jest.mock('axios');
const checkAuth = jest.fn();
const mockStore = configureMockStore([thunk]);
let store;
const ininState = {
  BurgerBuilder: {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
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
  store.dispatch = jest.fn();
};

describe('test connected app container', () => {
  beforeEach(() => {
    checkAuth.mockClear();
  });
  test('should render the BurgerBuilder component', () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      status: 200,
    });
    setStoreState(ininState);
    const wrapper = routerReduxSetup(store, '/');
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
