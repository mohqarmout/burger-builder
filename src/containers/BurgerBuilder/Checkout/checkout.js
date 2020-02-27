import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CheckoutSummary from 'components/Order/checkoutSummary/checkoutSummary';
import ContactData from './ContacrData/ContactData';

class Checkout extends Component {
  // we need oldschool method ==> because of the initaly null ingredients
  // constructor(props) {
  //   super(props);
  //   this.initialConstructor();
  // }

  // // you can use componentWillMount but it is a leagacy method
  // initialConstructor = () => {
  //   const { search } = this.props.history.location;
  //   const urlParams = new URLSearchParams(search);
  //   const ingredients = {};
  //   let totalPrice = 0;
  //   for (const [key, value] of urlParams.entries()) {
  //     if (key === 'totalPrice') {
  //       totalPrice = Number(value).toFixed(2);
  //     } else {
  //       ingredients[key] = +value;
  //     }
  //   }

  //   // also eslint not smart enogth to figure it out
  //   // eslint-disable-next-line react/no-direct-mutation-state
  //   this.state = {
  //     totalPrice,
  //     ingredients,
  //   };
  // };

  checkoutCancelHandler = () => {
    const { goBack } = this.props.history;
    goBack();
  };

  checkoutContinueHandler = () => {
    const { replace } = this.props.history;
    replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, totalPrice } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
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

const mapStateToProps = ({ ingredients, totalPrice }, ownProps) => ({
  ingredients,
  totalPrice,
});

export default connect(mapStateToProps)(Checkout);
