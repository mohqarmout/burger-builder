import React from 'react';
import classes from './Input.module.css';

const Input = ({
  elementtype,
  elementConfig: { type, option },
  value,
  htmlFor,
  elementConfig,
  handleInputChange,
  valid,
  touched,
  shouldValidate,
  ...rest
}) => {
  let inputElement;
  const inputClass = [classes.InputElement];
  if (!valid && shouldValidate) {
    inputClass.push(classes.Invalid);
  }

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
              className={classes.InputElement}
              onBlur={handleInputChange}
              onChange={handleInputChange}
              value={value}
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
              className={inputClass.join(' ')}
              onChange={handleInputChange}
              type={type}
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
