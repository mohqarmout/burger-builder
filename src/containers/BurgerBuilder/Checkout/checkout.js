import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from 'components/Order/checkoutSummary';
import ContactData from './ContacrData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: null,
  };

  componentDidMount() {
    const { search } = this.props.history.location;
    const urlParams = new URLSearchParams(search);
    const ingredients = {};
    for (const [key, value] of urlParams.entries()) {
      if (key === 'totalPrice') {
        this.setState({
          totalPrice: value,
        });
      } else {
        ingredients[key] = +value;
      }
    }
    this.setState({
      ingredients,
    });
  }

  checkoutCancelHandler = () => {
    const { goBack } = this.props.history;
    goBack();
  };

  checkoutContinueHandler = () => {
    const { replace } = this.props.history;
    replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    const { path } = this.props.match;
    return (
      <div>
        <CheckoutSummary
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={ingredients}
        />
        <Route
          path={`${path}/contact-data`}
          render={routeProps => (
            <ContactData
              {...routeProps}
              totalPrice={totalPrice}
              ingredients={ingredients}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
