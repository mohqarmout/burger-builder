import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postAuthThunk } from 'actions';
import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';
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
    loading: false,
    isSignedUp: true,
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

  orderHandler = async event => {
    const { formItems } = this.state;
    const { getAuth } = this.props;
    const {
      formItems: {
        email: { value: email },
        password: { value: password },
      },
      canSubmit,
      isSignedUp,
    } = this.state;

    event.preventDefault();
    this.setState({ loading: true });

    if (canSubmit) {
      console.log(isSignedUp);
      await getAuth(email, password, isSignedUp);
      this.setState({ loading: false });
    }
  };

  SwitchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignedUp: !prevState.isSignedUp };
    });
  };

  render() {
    const { formItems, loading, canSubmit, isSignedUp } = this.state;

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
      <div>
        <form onSubmit={this.orderHandler}>
          {form}
          <Button type="submit" btnType="Success">
            SUBMIT
          </Button>
          <Button btnType="Danger" clicked={this.SwitchAuthModeHandler}>
            SWITCH TO {isSignedUp ? 'SINGIN' : 'SINGUP'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { getAuth: postAuthThunk };

export default connect(null, mapDispatchToProps)(Auth);
