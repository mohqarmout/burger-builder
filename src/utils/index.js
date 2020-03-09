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

export const getUnique = (arr, comp) => {
  return arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);
};
