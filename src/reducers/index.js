import { combineReducers } from 'redux';
import { burgerActionNames, orderActionNames } from 'actions';
import { INGREDIENT_PRICES } from 'containers/BurgerBuilder/BurgerBuilder';

const order = (state = [], { type, payload }) => {
  switch (type) {
    case orderActionNames.postOrder:
      return [
        ...state,
        ...[
          {
            id: payload.id,
            ordersData: payload.ordersData,
          },
        ],
      ];
    case orderActionNames.getPost:
      return [...state, ...payload.orders];
    default:
      return state;
  }
};

const BurgerBuilder = (
  state = {
    ingredients: null,
    totalPrice: 4,
  },
  { type, payload },
) => {
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
    case burgerActionNames.setIngredients:
      return {
        ...state,
        ingredients: {
          salad: payload.ingredients.salad,
          ...payload.ingredients,
        },
        totalPrice: 4,
      };

    default:
      return state;
  }
};

export default combineReducers({
  BurgerBuilder,
  order,
});
