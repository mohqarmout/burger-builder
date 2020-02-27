import { burgerAction } from 'actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const rootRuducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case burgerAction.addIngredient:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.ingredient]: state.ingredients[payload.ingredient] + 1,
        },
      };
    case burgerAction.removeIngredient:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.ingredient]: state.ingredients[payload.ingredient] - 1,
        },
      };

    default:
      return state;
  }
};

export default rootRuducer;
