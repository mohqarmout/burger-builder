import axios from 'axios';
import { makeSynActionCreator } from 'utils';

export const authActionNames = {
  postAuthSuccess: 'POST_AUTHU_SUCCESS',
  postAuthFail: 'POST_AUTHU_FAIL',
  logout: 'AUTHU_LOGOUT',
};

const authSeccess = makeSynActionCreator(
  authActionNames.postAuthSuccess,
  'authData',
);

export const authLogout = makeSynActionCreator(authActionNames.logout);

const checkAuthTimeOutThunk = timeOut => dispatch => {
  setTimeout(() => {
    dispatch(authLogout());
  }, timeOut * 1000);
};

const authfail = makeSynActionCreator(authActionNames.postAuthFail, 'error');

export const postAuthThunk = (email, password, isSingUp) => async (
  dispatch,
  _,
  // eslint-disable-next-line consistent-return
) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APP_KEY}`;

  if (!isSingUp) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_APP_KEY}`;
  }

  try {
    const { data } = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    // !  I think this could lead to error

    dispatch(authSeccess(data));
    dispatch(checkAuthTimeOutThunk(data.expiresIn));
  } catch (error) {
    return dispatch(authfail(error));
  }
};
