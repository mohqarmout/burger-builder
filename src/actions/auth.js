import axios from 'axios';
import { makeSynActionCreator } from 'utils';

export const authActionNames = {
  postAuthSuccess: 'POST_AUTHU_SUCCESS',
  postAuthFail: 'POST_AUTHU_FAIL',
  logout: 'AUTHU_LOGOUT',
  setRedirectPath: 'SET_REDIRECT_PATH',
};

// ! I need it To store
const authSeccess = makeSynActionCreator(
  authActionNames.postAuthSuccess,
  'idToken',
  'localId',
);
const authfail = makeSynActionCreator(authActionNames.postAuthFail, 'error');

export const authLogout = makeSynActionCreator(authActionNames.logout);

export const authSetRedirectPath = makeSynActionCreator(
  authActionNames.setRedirectPath,
  'path',
);

// ! I need it To store
const checkAuthTimeOutThunk = timeOut => dispatch => {
  setTimeout(() => {
    dispatch(authLogout());
  }, timeOut * 1000);
};

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

    // ? data.expiresIn in second not in milliseconds
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000,
    );

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSeccess(data.idToken, data.localId));
    dispatch(checkAuthTimeOutThunk(data.expiresIn));
  } catch (error) {
    return dispatch(authfail(error));
  }
};

export const checkAuthTimeOut = () => dispatch => {
  const token = localStorage.getItem('token');
  const localId = localStorage.getItem('userId');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (new Date() > expirationDate.getTime()) {
    dispatch(authLogout(token, localId));
  } else {
    dispatch(authSeccess(token));
  }
};
