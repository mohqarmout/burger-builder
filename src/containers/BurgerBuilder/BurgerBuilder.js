/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import axios from 'axios-order';
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
    ingredients: null,
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

  purchaseContinueHandler = async () => {
    this.setState({ loading: true });
    const orders = {
      ingredinets: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Mohammed-Q96',
        address: {
          street: 'Al-nacer',
          zipCode: '970',
          city: 'gaza',
        },
      },
      email: 'mhmmade@gmail.com',
      deliveryMethod: 'fastest',
    };
    try {
      await axios.post('orders.json', {
        ...orders,
      });
      this.setState({ loading: false, purchasing: false });
    } catch (err) {
      this.setState({ loading: false, purchasing: false });
    }
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

    if (ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
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
