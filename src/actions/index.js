/* eslint-disable import/prefer-default-export */
const makeActionCreator = (type, ...argNames) => {
  return (...argsValue) => {
    const action = { type };
    argNames.forEach((_arg, index) => {
      action[argNames[index]] = argsValue[index];
    });
    return action;
  };
};

export const burgerAction = {
  addIngredient: 'addIngredient',
  removeIngredient: 'removeIngredient',
};
