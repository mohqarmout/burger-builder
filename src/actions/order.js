import { makeSynActionCreator } from 'utils';
import order from 'components/Order/Order';

export const orderActionNames = {
  postOrder: 'POST_ORDER',
  getPost: 'POST_ORDER',
};

const purchaseBurger = makeSynActionCreator(
  orderActionNames.postOrder,
  'id',
  'ordersData',
);

const fetchOrder = makeSynActionCreator(orderActionNames.getPost, order);

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

export const getOrederThunk = () => async (dispatch, _, { axios }) => {
  const { data, status } = await axios.get('orders.json');
  try {
    if (status === 200) {
      const cache = [];
      Object.keys(data).map(orderID => {
        const { orederDate, ...rest } = data[orderID];
        cache.push({ id: orderID, ...rest });
      });
      return dispatch(fetchOrder(cache));
    }
  } catch (error) {
    return error;
  }
};
