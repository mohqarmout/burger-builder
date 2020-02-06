import React from 'react';
import classes from './Input.module.css';

const Input = ({
  elementtype,
  elementConfig,
  value,
  htmlFor,
  type,
  ...rest
}) => {
  let inputElement = null;

  switch (elementtype) {
    case 'textarea':
      inputElement = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <textarea
              className={classes.InputElement}
              value={value}
              {...elementConfig}
              {...rest}
            />
          </label>
        </>
      );
      break;
    default:
      inputElement = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <input
              type={type}
              className={classes.InputElement}
              value={value}
              {...elementConfig}
              {...rest}
            />
          </label>
        </>
      );
  }
  return <div className={classes.Input}>{inputElement}</div>;
};

export default Input;

// rest ==> id value
