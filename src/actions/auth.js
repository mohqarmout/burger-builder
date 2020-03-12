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

const AuthLogout = makeSynActionCreator(authActionNames.logout);

const checkAuthTimeOutThunk = timeOut => dispatch => {
  setTimeout(() => {
    dispatch(AuthLogout());
  }, timeOut);
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
    console.log(data);
    dispatch(authSeccess(data));
    dispatch(checkAuthTimeOutThunk(data.expiresIn));
  } catch (error) {
    console.log(error);
    return dispatch(authfail(error));
  }
};
