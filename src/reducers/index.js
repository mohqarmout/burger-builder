import { burgerActionNames } from 'actions';
import { INGREDIENT_PRICES } from 'containers/BurgerBuilder/BurgerBuilder';

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
    case burgerActionNames.addIngredient:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredient],
        ingredients: {
          ...state.ingredients,
          [payload.ingredient]: state.ingredients[payload.ingredient] + 1,
        },
      };
    case burgerActionNames.removeIngredient:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredient],
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
