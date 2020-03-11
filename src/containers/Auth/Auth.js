import React, { Component } from 'react';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import { objectFactory } from '../BurgerBuilder/Checkout/ContacrData/ContactData';

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

  handleInputChange = ({ target: { value } }, id) => {
    const { formItems } = this.state;
    const { validation } = formItems[id];
    this.setState({
      formItems: {
        ...formItems,
        [id]: {
          value,
          validation,
          valid: this.checkValidity(value, validation),
          touched: true,
        },
      },
    });
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

    const formElementArray = Object.keys(authForm).map(formItem => {
      return {
        id: formItem,
        config: {
          value: formItems[formItem].value,
          valid: formItems[formItem].valid,
          shouldValidate: formItems[formItem].validation,
          touched: formItems[formItem].touched,
          ...authForm[formItem],
        },
      };
    });

    const form = formElementArray.map(({ id, config }) => (
      <Input
        key={id}
        handleInputChange={event => {
          this.handleInputChange(event, id);
        }}
        {...config}
      />
    ));
    // ! this.orderHandler need to setup
    return (
      <div>
        <form onSubmit={this.orderHandler}>
          {form}
          <Button type="submit" btnType="Success">
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}
export default Auth;
