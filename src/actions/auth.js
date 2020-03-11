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

export const postAuthThunk = (email, password, isSingUp) => async (
  dispatch,
  _,
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
    console.log(data);
    return dispatch(authSeccess(data));
  } catch (error) {
    console.log(error);
    return dispatch(authfail(error));
  }
};
