/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addIngredientAction,
  removeIngredientAction,
  inintIngredientThunk,
} from 'actions';
import axios from 'axiosInstances';
import withErrorHandler from 'HOC/withErrorHandler';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Burger from 'components/Burger/Burger';
import Spinner from 'components/UI/Spinner/Spinner';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    error: false,
  };

  async componentDidMount() {
    const { inintIngredient } = this.props;
    try {
      await inintIngredient();
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  componentDidUpdate(_, { ingredients: prevIngredients }) {
    const { ingredients } = this.state;
    if (ingredients !== prevIngredients) {
      this.updatePurchaseState(ingredients);
    }
  }

  purchaseContinueHandler = () => {
    const { push } = this.props.history;
    // ! for reference only

    // const { ingredients, totalPrice } = this.props;

    // const queryString = Object.keys({ ...ingredients }).map(
    //   key =>
    //     `${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}`,
    // );
    // queryString.push(`totalPrice=${totalPrice}`);

    // push({
    //   pathname: '/checkout',
    //   // search: queryString.join('&'),
    // });
    push('/checkout');
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseHandler = () => {
    const {
      history: { push },
      authenticated,
    } = this.props;
    if (authenticated) {
    this.setState({ purchasing: true });
    } else {
      push('/auth');
    }
  };

  updatePurchaseState = () => {
    const { ingredients } = this.props;
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => acc + curr, 0);
    return sum > 0;
  };

  render() {
    const { purchasing, error } = this.state;
    const {
      ingredients,
      totalPrice,
      removeIngredient,
      addIngredient,
      authenticated,
    } = this.props;

    let orderSummary = null;
    let burger = <Spinner />;

    const disabledInfo = {
      ...ingredients,
    };

    if (ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
        />
      );
      burger = (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={addIngredient}
            ingredientRemoved={removeIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            ordered={this.purchaseHandler}
            price={totalPrice}
            authenticated={authenticated}
          />
        </>
      );
    } else {
      orderSummary = <Spinner />;
    }

    if (error) {
      burger = <p>sorry something went wrong</p>;
    }
    for (const key in disabledInfo) {
      if ({}.hasOwnProperty.call(disabledInfo, key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    return (
      <>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = ({
  BurgerBuilder: { ingredients, totalPrice },
  auth: { token },
}) => ({
  ingredients,
  totalPrice,
  authenticated: Boolean(token),
});

const mapDispatchToProps = {
  addIngredient: addIngredientAction,
  removeIngredient: removeIngredientAction,
  inintIngredient: inintIngredientThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
