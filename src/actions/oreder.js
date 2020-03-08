import { makeSynActionCreator } from 'utils';

export const orderActionNames = {
  postOrder: 'POST_ORDER',
};

const purchaseBurger = makeSynActionCreator(
  orderActionNames.postOrder,
  'id',
  'ordersData',
);

export const postOrederThunk = ordersData => async (dispatch, _, { axios }) => {
  try {
    const { data } = await axios.post('orders.json', {
      ...ordersData,
    });
    console.log(data);
    return dispatch(purchaseBurger(data, ordersData));
  } catch (err) {
    return err;
  }
};
