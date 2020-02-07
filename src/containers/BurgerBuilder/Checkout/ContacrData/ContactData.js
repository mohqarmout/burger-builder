/* eslint-disable react/no-unused-state */
// I guess eslint is not smart enough

import React, { Component } from 'react';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import classes from './ContactData.module.css';

const factoryObject = ({
  elementtype = 'input',
  placeholder,
  option,
  htmlFor,
  id,
  type = 'text',
}) => {
  if (elementtype === 'select') {
    return {
      elementtype,
      elementConfig: {
        option,
      },
    };
  }
  return {
    elementtype,
    elementConfig: {
      type,
      placeholder,
    },
    name: id,
    htmlFor,
    id,
  };
};

const orderForm = {
  name: factoryObject({
    placeholder: 'Your Name',
    id: 'name',
    htmlFor: 'name',
  }),
  street: factoryObject({
    placeholder: 'Your Street',
    id: 'street',
    htmlFor: 'street',
  }),
  zipCode: factoryObject({
    placeholder: 'Zip code',
    id: 'zipCode',
    htmlFor: 'zipCode',
  }),
  city: factoryObject({
    placeholder: 'Mohammed-Q96',
    id: 'city',
    htmlFor: 'city',
  }),
  country: factoryObject({
    placeholder: 'Country',
    id: 'country',
    htmlFor: 'country',
  }),
  email: factoryObject({
    placeholder: 'E-mail',
    type: 'email',
    id: 'email',
    htmlFor: 'email',
  }),
  deliveryMethod: factoryObject({
    elementtype: 'select',
    option: [
      { value: 'fastest', displayValue: 'Fastest' },
      { value: 'chepest', displayValue: 'Chepest' },
    ],
    value: 'fastest',
  }),
};
class ContactData extends Component {
  state = {
    formValues: {
      name: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
      email: '',
      deliveryMethod: 'fastest',
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

  handleInputChange = ({ target: { value } }, id) => {
    const { formValues } = this.state;
    if (id === 'deliveryMethod') {
      this.setState({
        formValues: {
          ...formValues,
          deliveryMethod: value,
        },
      });
    } else {
      this.setState({
        formValues: {
          ...formValues,
          [id]: value,
        },
      });
    }
  };

  render() {
    const { loading, formValues } = this.state;
    const formElementArray = Object.keys(orderForm).map(formItem => {
      return {
        id: formItem,
        config: { value: formValues[formItem], ...orderForm[formItem] },
      };
    });
    let form = (
      <form onSubmit={this.handleSubmit}>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            handleInputChange={event => {
              this.handleInputChange(event, id);
            }}
            {...config}
          />
        ))}
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
