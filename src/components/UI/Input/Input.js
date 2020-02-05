import React from 'react';
import classes from './Input.module.css';

const Input = ({ type, htmlFor, ...rest }) => {
  let inputType = null;

  switch (type) {
    case 'textarea':
      inputType = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <textarea className={classes.InputElement} {...rest} />
          </label>
        </>
      );
      break;
    default:
      inputType = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <input className={classes.InputElement} {...rest} />
          </label>
        </>
      );
  }
  return <div className={classes.Input}>{inputType}</div>;
};

export default Input;
