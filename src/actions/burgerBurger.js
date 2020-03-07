/* eslint-disable import/prefer-default-export */
import { makeSynActionCreator } from 'utils';

export const burgerActionNames = {
  addIngredient: 'ADD_INGREDIENT',
  removeIngredient: 'REMOVE_INGREDIENT',
};

export const addIngredientAction = makeSynActionCreator(
  burgerActionNames.addIngredient,
  'ingredient',
);

export const removeIngredientAction = makeSynActionCreator(
  burgerActionNames.removeIngredient,
  'ingredient',
);
