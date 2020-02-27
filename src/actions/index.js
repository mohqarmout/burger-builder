export const burgerAction = {
  addIngredient: 'addIngredient',
  removeIngredient: 'removeIngredient',
};

const makeActionCreator = (type, ...argNames) => {
  return (...argsValue) => {
    const action = { type, payload: {} };
    argNames.forEach((_arg, index) => {
      action.payload[argNames[index]] = argsValue[index];
    });
    return action;
  };
};

export const addIngredientAction = makeActionCreator(
  burgerAction.addIngredient,
  'ingredient',
);

export const removeIngredientAction = makeActionCreator(
  burgerAction.removeIngredient,
  'ingredient',
);
