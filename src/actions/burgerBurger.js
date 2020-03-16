/* eslint-disable consistent-return */
import { makeSynActionCreator } from 'utils';

export const burgerActionNames = {
  addIngredient: 'ADD_INGREDIENT',
  removeIngredient: 'REMOVE_INGREDIENT',
  setIngredients: 'SET_INGREDIENTS',
};

export const addIngredientAction = makeSynActionCreator(
  burgerActionNames.addIngredient,
  'ingredient',
);

export const removeIngredientAction = makeSynActionCreator(
  burgerActionNames.removeIngredient,
  'ingredient',
);

export const setIngredientAction = makeSynActionCreator(
  burgerActionNames.setIngredients,
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
