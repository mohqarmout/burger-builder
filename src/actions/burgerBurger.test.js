import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  addIngredientAction,
  burgerActionNames,
  inintIngredientThunk,
  removeIngredientAction,
  setIngredientAction,
} from './burgerBurger';

jest.mock('axios');

const middlewares = [thunk.withExtraArgument({ axios })];
const mockStore = configureMockStore(middlewares);

test('should create action to add ingredient', () => {
  const expectedAction = {
    type: burgerActionNames.ADD_INGREDIENT,
    payload: {
      ingredient: 'salad',
    },
  };
  expect(addIngredientAction('salad')).toEqual(expectedAction);
});
test('should create action to remove ingredient', () => {
  const expectedAction = {
    type: burgerActionNames.REMOVE_INGREDIENT,
    payload: {
      ingredient: 'salad',
    },
  };
  expect(removeIngredientAction('salad')).toEqual(expectedAction);
});
test('should create action to set ingredient', async () => {
  const res = {
    data: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    status: 200,
  };
  axios.get.mockResolvedValue(res);
  const state = {
    auth: {
      token: 'test@test',
    },
  };
  const store = mockStore(state);

  await store.dispatch(inintIngredientThunk());
  expect(store.getActions()[0]).toEqual(setIngredientAction(res.data));
});
