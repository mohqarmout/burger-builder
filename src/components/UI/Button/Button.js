import React from 'react';

import classes from './Button.module.css';

const button = ({ btnType, clicked, children }) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    type="button"
  >
    {children}
  </button>
);

export default button;
