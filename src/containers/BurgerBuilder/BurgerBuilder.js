/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addIngredientAction, removeIngredientAction } from 'actions';
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
    purchasable: false,
    totalPrice: 4, // redux case
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    // try {
    //   const { data, status } = await axios.get('ingredient.json');
    //   if (status === 200 && {}.hasOwnProperty.call(data, 'bacon')) {
    //     this.setState({
    //       ingredients: data,
    //     });
    //   }
    // } catch (error) {
    //   this.setState({ error: true });
    // }
  }

  componentDidUpdate(_, { ingredients: prevIngredients }) {
    const { ingredients } = this.state;
    if (ingredients !== prevIngredients) {
      this.updatePurchaseState(ingredients);
    }
  }

  purchaseContinueHandler = () => {
    const { push } = this.props.history;
    const { ingredients, totalPrice } = this.props;

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

  // ! handle as action
  addIngredientHandler = type => {
    const {
      ingredients,
      totalPrice: oldPrice,
      // eslint-disable-next-line no-shadow
      addIngredient,
    } = this.props;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice }); // ! this must dispatched as action
    console.log(addIngredient);
    addIngredient(type);
    this.updatePurchaseState(updatedIngredients);
  };

  // ! handle as action
  removeIngredientHandler = type => {
    const { ingredients, totalPrice: oldPrice, removeIngredient } = this.props;

    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }); // ! this must dispatched as action
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const { purchasing, purchasable, error, loading } = this.state;
    const { ingredients, totalPrice } = this.props;

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

const mapStateToProps = ({ ingredients, totalPrice }) => ({
  ingredients,
  totalPrice,
});

const mapDispatchToProps = {
  addIngredient: addIngredientAction,
  removeIngredien: removeIngredientAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
