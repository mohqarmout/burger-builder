import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  authActionNames,
  authLogout,
  authSetRedirectPath,
  postAuthThunk,
  checkAuthTimeOut,
  authSeccess,
  authfail,
  checkAuthTimeOutThunk,
} from './auth';

const middlewares = [thunk.withExtraArgument({ axios })];
const mockStore = configureMockStore(middlewares);
const res = {
  data: {
    kind: 'identitytoolkit#VerifyPasswordResponse',
    localId: 'sSBEAtHQQ4eeoaUpMbXPZVdLPoD2',
    email: 'test@test.com',
    displayName: '',
    idToken: 'testID',
    registered: true,
    refreshToken: 'refreshToken',
    expiresIn: '1',
  },
};

jest.mock('axios');

// ? Action Creators
test('should create action to add store the auth data', () => {
  const expectedAction = {
    type: authActionNames.POST_AUTH_SUCCESS,
    payload: {
      idToken: 'RjMGMzNWZlYjBjODIz',
      localId: 'sSBEAtHQQ4eeoaUpMbXPZVdLPoD2',
    },
  };
  expect(
    authSeccess('RjMGMzNWZlYjBjODIz', 'sSBEAtHQQ4eeoaUpMbXPZVdLPoD2'),
  ).toEqual(expectedAction);
});
test('should create error action with error as a payload', () => {
  const expectedAction = {
    type: authActionNames.POST_AUTH_FAIL,
    payload: {
      error: 'error_message',
    },
  };
  expect(authfail('error_message')).toEqual(expectedAction);
});
test('should create auth redirect action to redirect to correct path', () => {
  const expectedAction = {
    type: authActionNames.ROUTE_WITH_REDIRECT_PATH,
    payload: {
      path: '/',
    },
  };
  expect(authSetRedirectPath('/')).toEqual(expectedAction);
});

// ? Async Action Creators

test('create AUTHU_LOGOUT action', async () => {
  const store = mockStore({});
  await store.dispatch(checkAuthTimeOutThunk(1));
  const actions = store.getActions();
  expect(actions[0]).toEqual(authLogout());
});
test('should run after 1 milliseconds', async () => {
  jest.useFakeTimers();
  const store = mockStore({});
  store.dispatch(checkAuthTimeOutThunk({ seconds: 1 }));
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
test('create POST_AUTHU_SUCCESS action', async () => {
  const store = mockStore({});

  axios.post.mockResolvedValue(res);
  await store.dispatch(postAuthThunk('test@test.com', '123456', 'true'));
  expect(localStorage.getItem('token')).toBe('testID');
  expect(store.getActions()[0]).toEqual(
    authSeccess(res.data.idToken, res.data.localId),
  );
});

test('create POST AUTH SUCCESS action once the app is loaded and the token still valid ', async () => {
  const store = mockStore({});
  await store.dispatch(checkAuthTimeOut());
  expect(store.getActions()[0]).toEqual(
    authSeccess(res.data.idToken, res.data.localId),
  );
  localStorage.clear();
});

test('create POST_AUTHU_FAIL action', async () => {
  const error = new Error('Auth Error');
  const store = mockStore({});
  try {
    axios.post.mockRejectedValue(error);
    await store.dispatch(postAuthThunk('test@test.com', '123456', 'true'));
  } catch (error) {
    expect(localStorage.getItem('token')).toBeNull();
    expect(store.getActions()[0]).toEqual(authfail(error));
  }
});
