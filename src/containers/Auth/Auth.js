import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postAuthThunk } from 'actions';
import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';
import Input from 'components/UI/Input/Input';
import { objectFactory } from '../BurgerBuilder/Checkout/ContacrData/ContactData';
import classes from './Auth.module.css';

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
        validation: { required: true, minLength: 6, maxLength: 8 },
        valid: false,
        touched: false,
      },
    },
    canSubmit: false,
    loading: false,
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
    // eslint-disable-next-line no-shadow
    this.setState(({ formItems }) => ({
      canSubmit: this.updateCanSubmitState(formItems),
    }));
  };

  updateCanSubmitState = formValues => {
    const cache = [];

    Object.keys(formValues).forEach(formItem => {
      formValues[formItem].validation && cache.push(formValues[formItem].valid);
    });
    return cache.every(item => item);
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

  submitHandler = async event => {
    const { getAuth } = this.props;
    const {
      formItems: {
        email: { value: email },
        password: { value: password },
      },
      canSubmit,
    } = this.state;

    event.preventDefault();
    this.setState({ loading: true });

    if (canSubmit) {
      this.setState({ loading: false });
      await getAuth(email, password);
    }
  };

  render() {
    const { formItems, loading, canSubmit } = this.state;

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

    let form = formElementArray.map(({ id, config }) => (
      <Input
        key={id}
        handleInputChange={event => {
          this.handleInputChange(event, id);
        }}
        {...config}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button active={canSubmit} type="submit" btnType="Success">
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { getAuth: postAuthThunk };

export default connect(null, mapDispatchToProps)(Auth);
