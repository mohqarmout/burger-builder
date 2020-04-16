import { combineReducers } from 'redux';
import { burgerActionNames, orderActionNames, authActionNames } from 'actions';
import { INGREDIENT_PRICES } from 'containers/BurgerBuilder/BurgerBuilder';
import { getUnique } from 'utils';

const orderReducer = (state = [], { type, payload }) => {
  switch (type) {
    case orderActionNames.GET_ORDER:
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
    case burgerActionNames.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredient],
        ingredients: {
          ...state.ingredients,
          [payload.ingredient]: state.ingredients[payload.ingredient] + 1,
        },
        building: true,
      };
    case burgerActionNames.REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredient],
        ingredients: {
          ...state.ingredients,
          [payload.ingredient]: state.ingredients[payload.ingredient] - 1,
        },
        building: true,
      };
    case burgerActionNames.SET_INGREDIENTS:
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
    case authActionNames.POST_AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        token: payload.idToken,
        userId: payload.localId,
      };
    case authActionNames.POST_AUTH_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case authActionNames.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        token: null,
        userId: null,
        authRedirect: '/',
      };
    case authActionNames.SET_REDIRECT_PATH:
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
