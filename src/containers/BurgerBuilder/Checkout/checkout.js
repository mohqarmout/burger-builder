import React, { Component } from 'react';
import CheckoutSummary from 'components/Order/checkoutSummary';

class checkout extends Component {
  state = {
    ingredients: {},
  };

  componentDidMount() {
    const { search } = this.props.history.location;

    const urlParams = new URLSearchParams(search);
    const ingredients = {};

    for (const [key, value] of urlParams.entries()) {
      ingredients[key] = +value;
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
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={ingredients}
        />
      </div>
    );
  }
}

export default checkout;
