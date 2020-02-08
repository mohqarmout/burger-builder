import React from 'react';

import classes from './Button.module.css';

const button = ({
  btnType,
  clicked,
  children,
  type = 'button',
  active = true,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    type={type}
    disabled={!active}
  >
    {children}
  </button>
);

export default button;
