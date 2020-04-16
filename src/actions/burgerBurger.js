/* eslint-disable consistent-return */
import { makeSynActionCreator } from 'utils';

export const burgerActionNames = {
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',
  SET_INGREDIENTS: 'SET_INGREDIENTS',
};

export const addIngredientAction = makeSynActionCreator(
  burgerActionNames.ADD_INGREDIENT,
  'ingredient',
);

export const removeIngredientAction = makeSynActionCreator(
  burgerActionNames.REMOVE_INGREDIENT,
  'ingredient',
);

export const setIngredientAction = makeSynActionCreator(
  burgerActionNames.SET_INGREDIENTS,
  'ingredients',
);

export const inintIngredientThunk = () => async (
  dispatch,
  getState,
  { axios },
) => {
  const {
    auth: { token },
  } = getState();
  const { data, status } = await axios.get('ingredient.json', {
    params: {
      auth: token,
    },
  });
  try {
    if (status === 200 && {}.hasOwnProperty.call(data, 'bacon')) {
      return dispatch(setIngredientAction(data));
    }
  } catch (error) {
    return error;
  }
};
