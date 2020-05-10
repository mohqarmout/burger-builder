/* eslint-disable import/no-named-as-default */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from 'components/Order/checkoutSummary/CheckoutSummary';
import ContactData from './ContacrData/ContactData';

export const Checkout = props => {
  const {
    ingredients,
    history: { goBack, replace },
    match: { path },
  } = props;

  const checkoutCancelHandler = () => {
    goBack();
  };

  const checkoutContinueHandler = () => {
    replace('/checkout/contact-data');
  };

  let checkoutSummary = (
    <div>
      <CheckoutSummary
        checkoutCancel={checkoutCancelHandler}
        checkoutContinue={checkoutContinueHandler}
        ingredients={ingredients}
      />
      <Route
        path={`${path}/contact-data`}
        render={props => <ContactData {...props} />}
      />
    </div>
  );

  if (!ingredients) {
    checkoutSummary = <Redirect to="/" />;
  }

  return checkoutSummary;
};

const mapStateToProps = ({ BurgerBuilder: { ingredients } }) => ({
  ingredients,
});

export default connect(mapStateToProps)(Checkout);
