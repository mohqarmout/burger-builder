import React from 'react';
import Burger from 'components/Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = ({ ingredients, checkoutCancel, checkoutContinue }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Burger ingredients={ingredients} />
      </div>
      <Button clicked={checkoutCancel} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={checkoutContinue} btnType="Success">
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
