import React, { Component } from 'react';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import { objectFactory } from '../BurgerBuilder/Checkout/ContacrData/ContactData';

// ! obj
const authForm = {
  email: objectFactory({
    placeholder: 'E-mail',
    type: 'email',
    id: 'email',
    htmlFor: 'email',
  }),
  password: objectFactory({
    placeholder: 'password',
    type: 'password',
    id: 'password',
    htmlFor: 'password',
  }),
};

class Auth extends Component {
  state = {
    formItems: {
      email: {
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
      password: {
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
    },
  };

  checkValidity = (value, rule) => {
    let isValid = true;
    if (rule.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }

    if (rule.maxLength) {
      isValid = value.length <= rule.minLength && isValid;
    }
    return isValid;
  };

  render() {
    const { formItems } = this.state;

    const formElementArray = Object.keys(formItems).map(formItem => {
      return {
        id: formItem,
        config: {
          value: authForm[formItem].value,
          valid: authForm[formItem].valid,
          shouldValidate: authForm[formItem].validation,
          touched: authForm[formItem].touched,
          ...authForm[formItem],
        },
      };
    });
    const form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            handleInputChange={event => {
              this.handleInputChange(event, id);
            }}
            {...config}
          />
        ))}
        <Button active={canSubmit} type="submit" btnType="Success">
          ORDER
        </Button>
      </form>
    );
    return (
      <div>
        <form />
      </div>
    );
  }
}
export default Auth;
