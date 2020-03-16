import React from 'react';
import classes from './Order.module.css';

const order = ({ ingredinets, price }) => {
  const ingredient = [];

  Object.keys(ingredinets).forEach(ingredinetName => {
    ingredient.push({
      name: ingredinetName,
      amount: ingredinets[ingredinetName],
    });
  });
  const ingredientOutput = ingredient.map(({ name, amount }) => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inlineBlock',
        margin: ' 0 8px',
        padding: '5px',
        border: '1px solid #ccc',
      }}
      key={name}
    >
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
