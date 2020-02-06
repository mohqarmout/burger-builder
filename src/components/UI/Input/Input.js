import React from 'react';
import classes from './Input.module.css';

const Input = ({ inputType, htmlFor, ...rest }) => {
  let inputElement = null;

  switch (inputType) {
    case 'textarea':
      inputElement = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <textarea className={classes.InputElement} {...rest} />
          </label>
        </>
      );
      break;
    default:
      inputElement = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <input className={classes.InputElement} {...rest} />
          </label>
        </>
      );
  }
  return <div className={classes.Input}>{inputElement}</div>;
};

export default Input;
