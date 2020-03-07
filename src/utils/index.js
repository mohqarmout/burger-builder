/* eslint-disable import/prefer-default-export */
// ? I think this what called partial application

export const makeSynActionCreator = (type, ...argNames) => {
  return (...argsValue) => {
    const action = { type, payload: {} };
    argNames.forEach((_arg, index) => {
      action.payload[argNames[index]] = argsValue[index];
    });
    return action;
  };
};
