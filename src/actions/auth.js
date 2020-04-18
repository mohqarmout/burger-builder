import axios from 'axios';
import { makeSynActionCreator } from 'utils';

export const authActionNames = {
  POST_AUTH_SUCCESS: 'POST_AUTHU_SUCCESS',
  POST_AUTH_FAIL: 'POST_AUTHU_FAIL',
  LOGOUT: 'AUTHU_LOGOUT',
  ROUTE_WITH_REDIRECT_PATH: 'ROUTE_WITH_REDIRECT_PATH',
};

export const authSeccess = makeSynActionCreator(
  authActionNames.POST_AUTH_SUCCESS,
  'idToken',
  'localId',
);
export const authfail = makeSynActionCreator(
  authActionNames.POST_AUTH_FAIL,
  'error',
);
export const authLogout = makeSynActionCreator(authActionNames.LOGOUT);
export const authSetRedirectPath = makeSynActionCreator(
  authActionNames.ROUTE_WITH_REDIRECT_PATH,
  'path',
);

export const checkAuthTimeOutThunk = ({ seconds }) => dispatch => {
  // * setTimeout uses milliseconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dispatch(authLogout()));
    }, seconds * 1000);
  });
};

export const postAuthThunk = (email, password, isSingUp) => async (
  dispatch,
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
    dispatch(checkAuthTimeOutThunk({ seconds: data.expiresIn }));
  } catch (error) {
    return dispatch(authfail(error));
  }
};

export const checkAuthTimeOut = () => dispatch => {
  const token = localStorage.getItem('token');
  const localId = localStorage.getItem('userId');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (token) {
    if (new Date().getTime() > expirationDate.getTime()) {
      dispatch(authLogout());
    } else {
      dispatch(authSeccess(token, localId));
      dispatch(
        checkAuthTimeOutThunk({
          seconds: (expirationDate.getTime() - new Date().getTime()) / 1000,
        }),
      );
    }
  }
};
