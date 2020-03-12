import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  purchasable,
  ordered,
  price,
  authenticated,
}) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{price.toFixed(2)}</strong>
    </p>
    {controls.map(({ label, type }) => (
      <BuildControl
        key={label}
        label={label}
        added={() => ingredientAdded(type)}
        removed={() => ingredientRemoved(type)}
        disabled={disabled[type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!purchasable}
      onClick={ordered}
      type="button"
    >
      {authenticated ? 'ORDER NOW' : 'Please Sign Up'}
    </button>
  </div>
);

export default buildControls;
