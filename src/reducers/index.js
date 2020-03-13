import { combineReducers } from 'redux';
import { burgerActionNames, orderActionNames, authActionNames } from 'actions';
import { INGREDIENT_PRICES } from 'containers/BurgerBuilder/BurgerBuilder';
import { getUnique } from 'utils';

const orderReducer = (state = [], { type, payload }) => {
  switch (type) {
    // case orderActionNames.postOrder:
    //   return getUnique(
    //     [
    //       ...state,
    //       ...[
    //         {
    //           id: payload.id,
    //           ordersData: payload.ordersData,
    //         },
    //       ],
    //     ],
    //     'id',
    //   );
    case orderActionNames.getPost:
      return getUnique([...state, ...payload.orders], 'id');
    default:
      return state;
  }
};

const BurgerBuilder = (
  state = {
    ingredients: null,
    totalPrice: 4,
    building: false,
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
        building: true,
      };
    case burgerActionNames.removeIngredient:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredient],
        ingredients: {
          ...state.ingredients,
          [payload.ingredient]: state.ingredients[payload.ingredient] - 1,
        },
        building: true,
      };
    case burgerActionNames.setIngredients:
      return {
        ...state,
        ingredients: {
          salad: payload.ingredients.salad,
          ...payload.ingredients,
        },
        totalPrice: 4,
        building: false,
      };

    default:
      return state;
  }
};

const authReducer = (
  state = {
    token: null,
    userId: null,
    error: null,
    authRedirect: '/',
  },
  { type, payload },
) => {
  switch (type) {
    case authActionNames.postAuthSuccess:
      return {
        ...state,
        error: null,
        token: payload.idToken,
        userId: payload.localId,
      };
    case authActionNames.postAuthFail:
      return {
        ...state,
        error: payload.error,
      };
    case authActionNames.logout:
      localStorage.clear(); // clear the all Storage
      return {
        ...state,
        token: null,
        userId: null,
      };
    case authActionNames.setRedirectPath:
      return {
        ...state,
        authRedirect: payload.path,
      };
    default:
      return state;
  }
};

export default combineReducers({
  BurgerBuilder,
  order: orderReducer,
  auth: authReducer,
});
