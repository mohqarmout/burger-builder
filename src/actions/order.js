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

export const getOrederThunk = () => async (dispatch, _, { axios }) => {
  try {
    const { data, status } = await axios.get('orders.json');
    if (status === 200) {
      const cache = [];
      Object.keys(data).forEach(orderID => {
        const { orederDate, ...rest } = data[orderID];
        cache.push({ id: orderID, ...rest });
      });
      return dispatch(fetchOrder(cache));
    }
  } catch (error) {
    return error;
  }
};

/* 


0: {id: "-M1scqwSYACJYnJoukr4", ingredients: {…}, price: 4}
1: {id: "-M1seSW_-wgBiz4Eiy5m", ingredients: {…}, price: 4}
2: {id: "-M1sf2BevqHVzIQHyUQr", ingredients: {…}, price: 4}
3: {id: "-M1sfj3ButRMtxeH9yj0", ingredients: {…}, price: 5.6000000000000005}
4: {id: "-M1sn3uhv96sJ2tafTcy", ingredients: {…}, price: 6.9}
5: {id: "-M1sozSh2euOSb6YmHIF", ingredients: {…}, price: 6.9}


*/
