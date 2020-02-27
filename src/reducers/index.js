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
      return {
        ...state,
        totalPrice: newPrice,
        ingredient,
        ingredients: {
          ...state.ingredients,
          ingredient: state.ingredients[ingredient] + 1,
        },
      };
    case burgerAction.removeIngredient:
      return {
        ...state,
        totalPrice: newPrice,
        ingredients: {
          ...state.ingredients,
          ingredient: state.ingredients[ingredient] - 1,
        },
      };

    default:
      return state;
  }
};

export default rootRuducer;
