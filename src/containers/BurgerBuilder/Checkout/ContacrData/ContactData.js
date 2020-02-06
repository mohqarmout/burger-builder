/* eslint-disable react/no-unused-state */
// I guess eslint is not smart enough

import React, { Component } from 'react';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import classes from './ContactData.module.css';

const factoryObject = ({
  elementType = 'text',
  type = 'text',
  placeholder,
  value,
  option,
}) => {
  if (type === 'select') {
    return {
      name: {
        elementType,
        elementConfig: {
          option,
        },
      },
    };
  }
  return {
    name: {
      elementType,
      elementConfig: {
        type,
        placeholder,
      },
      value,
    },
  };
};
class ContactData extends Component {
  state = {
    orderForm: {
      name: factoryObject({ placeholder: 'Your Name', value: '' }),
      street: factoryObject({ placeholder: 'Your Street', value: '' }),
      zipCode: factoryObject({ placeholder: 'Zip code', value: '' }),
      city: factoryObject({ placeholder: 'Mohammed-Q96', value: '' }),
      email: factoryObject({ placeholder: 'E-mail', value: '', type: 'email' }),
      deliveryMethod: factoryObject({
        option: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'chepest', displayValue: 'Fastest' },
        ],

        type: 'select',
      }),
    },
    loading: false,
  };

  orderHandler = async event => {
    event.preventDefault();
    const { push } = this.props.history;
    const { ingredients, totalPrice } = this.props;
    this.setState({ loading: true });
    const orders = {
      ingredients,
      price: totalPrice,
    };
    try {
      await axios.post('orders.json', {
        ...orders,
      });
      this.setState({ loading: false });
      push('/');
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    if (!(name === 'street' || name === 'postalCode')) {
      this.setState({
        [name]: value,
      });
    } else {
      const { address } = this.state;
      this.setState({
        address: {
          ...address,
          [name]: value,
        },
      });
    }
  };

  render() {
    const { loading } = this.state;
    let form = (
      <form onSubmit={this.handleSubmit}>
        <Input
          inputType="input"
          htmlFor="name"
          id="name"
          onChange={this.handleInputChange}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <Input
          inputType="input"
          htmlFor="email"
          id="email"
          onChange={this.handleInputChange}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <Input
          inputType="input"
          htmlFor="street"
          id="street"
          onChange={this.handleInputChange}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <Input
          inputType="input"
          htmlFor="postalCode"
          id="postalCode"
          onChange={this.handleInputChange}
          type="text"
          name="postalCode"
          placeholder="Your postalCode"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
