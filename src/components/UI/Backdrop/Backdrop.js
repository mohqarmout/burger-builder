import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = ({ show, clicked }) =>
  show ? (
    <div
      className={classes.Backdrop}
      role="button"
      tabIndex={0}
      onClick={clicked}
      onKeyPress={clicked}
    />
  ) : null;

export default backdrop;
