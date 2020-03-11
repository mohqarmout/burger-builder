import { makeSynActionCreator } from 'utils';

export const orderActionNames = {
  postOrder: 'POST_ORDER',
  getPost: 'GET_ORDER',
};

const purchaseBurger = makeSynActionCreator(
  orderActionNames.postOrder,
  'id',
  'ordersData',
);

const fetchOrder = makeSynActionCreator(orderActionNames.getPost, 'orders');

export const postOrederThunk = ordersData => async (dispatch, _, { axios }) => {
  try {
    const { data } = await axios.post('orders.json', {
      ...ordersData,
    });
    return dispatch(purchaseBurger(data.name, ordersData));
  } catch (err) {
    return err;
  }
};

// eslint-disable-next-line consistent-return
export const getOrederThunk = () => async (dispatch, _, { axios }) => {
  try {
    const { data, status } = await axios.get('orders.json');
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
