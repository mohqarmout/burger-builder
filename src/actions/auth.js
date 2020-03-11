import { makeSynActionCreator } from 'utils';

export const authActionNames = {
  postAuth: 'POST_AUTHu',
};

const purchaseBurger = makeSynActionCreator(
  authActionNames.postAuth,
  'authData',
);

export const postAuthThunk = (email, password) => (
  dispatch,
  _,
  { axios },
) => {};
