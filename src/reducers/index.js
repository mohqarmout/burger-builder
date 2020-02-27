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

const rootRuducer = (
  state = initialState,
  { type, payload: { ingredient, newPrice } },
) => {
  switch (type) {
    case burgerAction.addIngredient:
      return { ...state, ingredient, totalPrice: newPrice };

    default:
      return state;
  }
};

export default rootRuducer;
