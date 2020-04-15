import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchOrder,
  getOrederThunk,
  postOrederThunk,
  purchaseBurger,
} from './order';

jest.mock('axios');

const middlewares = [thunk.withExtraArgument({ axios })];
const mockStore = configureMockStore(middlewares);

test('create POST_ORDER action when posting orders', async () => {
  const state = { auth: 1 };
  const res = {
    data: {
      name: 'test',
      ordersData: {},
    },
  };
  const store = mockStore(state);
  axios.post.mockResolvedValue(res);
  await store.dispatch(postOrederThunk({}));
  expect(store.getActions()[0]).toEqual(
    purchaseBurger(res.data.name, res.data.ordersData),
  );
});

test('create GET_POST action when fetching orders', async () => {
  const state = {
    auth: {
      userId: '1',
      token: 'test_token',
    },
  };
  const res = {
    data: {
      orderID: 1,
    },
    status: 200,
  };
  const store = mockStore(state);
  axios.get.mockResolvedValue(res);
  await store.dispatch(getOrederThunk({}));
  expect(store.getActions()[0]).toEqual(fetchOrder([{ id: 'orderID' }]));
});
