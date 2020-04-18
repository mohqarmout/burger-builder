import { combineReducers } from 'redux';
import { burgerActionNames, orderActionNames, authActionNames } from 'actions';
import { INGREDIENT_PRICES } from 'containers/BurgerBuilder/BurgerBuilder';
import { getUnique } from 'utils';

const orderInitState = [];
const burgerInitState = {
  ingredients: null,
  totalPrice: 4,
  building: false,
};
const authInitState = {
  token: null,
  userId: null,
  error: null,
  authRedirect: '/',
};

const orderReducer = (state = orderInitState, { type, payload }) => {
  switch (type) {
    case orderActionNames.GET_ORDER:
      return getUnique([...state, ...payload.orders], 'id');
    default:
      return state;
  }
};

const BurgerBuilder = (state = burgerInitState, { type, payload }) => {
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

const authReducer = (state = authInitState, { type, payload }) => {
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
    case authActionNames.ROUTE_WITH_REDIRECT_PATH:
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
