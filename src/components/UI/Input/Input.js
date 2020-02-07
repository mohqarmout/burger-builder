import React from 'react';
import classes from './Input.module.css';

const Input = ({
  elementtype,
  elementConfig: { type, option },
  value,
  htmlFor,
  elementConfig,
  handleInputChange,
  name,
  ...rest
}) => {
  let inputElement = null;

  switch (elementtype) {
    case 'textarea':
      inputElement = (
        <>
          <label
            className={classes.Label}
            onChange={handleInputChange}
            htmlFor={htmlFor}
          >
            <textarea
              className={classes.InputElement}
              name={name}
              value={value}
              {...elementConfig}
              {...rest}
            />
          </label>
        </>
      );
      break;

    case 'select':
      inputElement = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <select
              onBlur={handleInputChange}
              onChange={handleInputChange}
              value={value}
              className={classes.InputElement}
              {...rest}
            >
              {option.map(({ value: optionValue, displayValue }) => {
                return (
                  <option key={optionValue} value={optionValue}>
                    {displayValue}
                  </option>
                );
              })}
            </select>
          </label>
        </>
      );
      break;

    default:
      inputElement = (
        <>
          <label className={classes.Label} htmlFor={htmlFor}>
            <input
              onChange={handleInputChange}
              type={type}
              className={classes.InputElement}
              value={value}
              name={name}
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
