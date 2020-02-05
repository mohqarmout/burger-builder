/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import axios from 'axiosInstances';
import withErrorHandler from 'HOC/withErrorHandler';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Burger from 'components/Burger/Burger';
import Spinner from 'components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {},
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    try {
      const { data, status } = await axios.get('ingredient.json');

      if (status === 200 && {}.hasOwnProperty.call(data, 'bacon')) {
        this.setState({
          ingredients: data,
        });
      }
    } catch (error) {
      this.setState({ error: true });
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
    const { ingredients, totalPrice } = this.state;

    const queryString = Object.keys({ ...ingredients }).map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}`,
    );
    queryString.push(`totalPrice=${totalPrice}`);

    push({
      pathname: '/checkout',
      search: queryString.join('&'),
    });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => acc + curr, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const {
      purchasing,
      ingredients,
      totalPrice,
      purchasable,
      error,
      loading,
    } = this.state;

    let orderSummary = null;
    let burger = <Spinner />;

    const disabledInfo = {
      ...ingredients,
    };

    if (Object.keys(ingredients).length) {
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
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
            price={totalPrice}
          />
        </>
      );
    }

    if (loading) {
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

export default withErrorHandler(BurgerBuilder, axios);
