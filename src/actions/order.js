import { makeSynActionCreator } from 'utils';

export const orderActionNames = {
  POST_ORDER: 'POST_ORDER',
  GET_ORDER: 'GET_ORDER',
};

export const purchaseBurger = makeSynActionCreator(
  orderActionNames.POST_ORDER,
  'id',
  'ordersData',
);

export const fetchOrder = makeSynActionCreator(
  orderActionNames.GET_ORDER,
  'orders',
);

export const postOrederThunk = ordersData => async (
  dispatch,
  getState,
  { axios },
) => {
  const {
    auth: { userId },
  } = getState();

  try {
    const { data } = await axios.post('orders.json', {
      ...ordersData,
      userId,
    });
    return dispatch(purchaseBurger(data.name, ordersData));
  } catch (err) {
    return err;
  }
};

// eslint-disable-next-line consistent-return
export const getOrederThunk = () => async (dispatch, getState, { axios }) => {
  const {
    auth: { userId, token },
  } = getState();
  const queryParams = `orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

  try {
    const { data, status } = await axios.get(queryParams);
    if (status === 200 && data && Object.keys(data).length !== 0) {
      const cache = [];
      Object.keys(data).forEach(orderID => {
        const { orederDate, ...rest } = data[orderID];
        cache.push({ id: orderID, ...rest });
      });
      return dispatch(fetchOrder(cache));
    }
  } catch (error) {
    return error; // ! must dispatch an error
  }
};
