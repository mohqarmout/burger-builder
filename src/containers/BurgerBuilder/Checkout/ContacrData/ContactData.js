/* eslint-disable react/no-unused-state */
// I guess eslint is not smart enough

import React, { Component } from 'react';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Button from 'components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = async event => {
    event.preventDefault();
    const { push } = this.props.history;
    const { ingredients, totalPrice } = this.props;
    this.setState({ loading: true });
    const orders = {
      ingredinets: ingredients,
      price: totalPrice,
      customer: {
        name: 'Mohammed-Q96',
        address: {
          street: 'Al-nacer',
          zipCode: '970',
          city: 'gaza',
        },
      },
      email: 'mhmmade@gmail.com',
      deliveryMethod: 'fastest',
    };
    try {
      await axios.post('orders.json', {
        ...orders,
      });
      push('/');
      this.setState({ loading: false });
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
        <input
          className={classes.Input}
          onChange={this.handleInputChange}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          onChange={this.handleInputChange}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          onChange={this.handleInputChange}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.Input}
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
