import React from 'react';
import classes from './Order.module.css';

const order = ({ ingredinets, price }) => {
  const ingredient = [];

  Object.keys(ingredinets).map(ingredinetName => {
    ingredient.push({
      name: ingredinetName,
      amount: ingredinets[ingredinetName],
    });
  });
  const ingredientOutput = ingredient.map(({ name, amount }) => (
    <span key={name}>
      {name} ({amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>ingredient: {ingredientOutput}</p> Price: <strong>USD {price}</strong>
    </div>
  );
};

export default order;
