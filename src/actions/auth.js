import axios from 'axios';
import { makeSynActionCreator } from 'utils';

export const authActionNames = {
  postAuthSuccess: 'POST_AUTHU_SUCCESS',
  postAuthFail: 'POST_AUTHU_FAIL',
};

const authSeccess = makeSynActionCreator(
  authActionNames.postAuthSuccess,
  'authData',
);

const authfail = makeSynActionCreator(authActionNames.postAuthFail, 'error');

export const postAuthThunk = (email, password) => async (dispatch, _) => {
  try {
    const { data } = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBV9x-_IYg2beBuOi3rg1_Lw_5wSh32MSY',
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    return dispatch(authSeccess(data));
  } catch (error) {
    console.log(error);
    return dispatch(authfail(error));
  }
};
