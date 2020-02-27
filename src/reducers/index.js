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
    // type of ingredient
    case burgerAction.addIngredient:
      return {
        ...state,
        ingredient,
        totalPrice: newPrice,
        ingredients: {
          ...state.ingredients,
          ingredient: state.ingredients[ingredient] + 1,
        },
      };

    default:
      return state;
  }
};

export default rootRuducer;
