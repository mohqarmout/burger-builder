/* eslint-disable react/no-unused-state */
// I guess eslint is not smart enough

import React, { Component } from 'react';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import classes from './ContactData.module.css';

const objectFactory = ({
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
  name: objectFactory({
    placeholder: 'Your Name',
    id: 'name',
    htmlFor: 'name',
  }),
  street: objectFactory({
    placeholder: 'Your Street',
    id: 'street',
    htmlFor: 'street',
  }),
  zipCode: objectFactory({
    placeholder: 'Zip code',
    id: 'zipCode',
    htmlFor: 'zipCode',
  }),
  city: objectFactory({
    placeholder: 'City',
    id: 'city',
    htmlFor: 'city',
  }),
  country: objectFactory({
    placeholder: 'Country',
    id: 'country',
    htmlFor: 'country',
  }),
  email: objectFactory({
    placeholder: 'E-mail',
    type: 'email',
    id: 'email',
    htmlFor: 'email',
  }),
  deliveryMethod: objectFactory({
    elementtype: 'select',
    option: [
      { value: 'fastest', displayValue: 'Fastest' },
      { value: 'chepest', displayValue: 'Chepest' },
    ],
  }),
};
class ContactData extends Component {
  state = {
    formValues: {
      name: {
        value: '',
        validation: { required: true },
        valid: false,
      },
      street: {
        value: '',
        validation: { required: true },
        valid: false,
      },
      zipCode: {
        value: '',
        validation: { required: true },
        valid: false,
      },
      city: {
        value: '',
        validation: { required: true },
        valid: false,
      },
      country: {
        value: '',
        validation: { required: true },
        valid: false,
      },
      email: {
        value: '',
        validation: { required: true },
        valid: false,
      },
      deliveryMethod: { value: 'fastest' },
    },
    loading: false,
  };

  orderHandler = async event => {
    event.preventDefault();
    const { push } = this.props.history;
    const { ingredients, totalPrice } = this.props;
    const { formValues } = this.state;
    this.setState({ loading: true });
    const cache = {};
    // eslint-disable-next-line array-callback-return
    Object.keys(formValues).map(key => {
      cache[key] = formValues[key].value;
    });
    const orders = {
      ingredients,
      price: totalPrice,
      orederDate: cache,
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
    const { validation } = formValues[id];
    if (id === 'deliveryMethod') {
      this.setState({
        formValues: {
          ...formValues,
          [id]: {
            value,
          },
        },
      });
    } else {
      const { validation: required } = validation;
      this.setState({
        formValues: {
          ...formValues,
          [id]: {
            value,
            validation,
            valid: this.checkValidity(value, required),
          },
        },
      });
    }
  };

  checkValidity = (value, rule) => {
    // console.log(rule.required ? value.trim('') !== '' : false);
    return rule ? value.trim('') !== '' : false;
  };

  render() {
    const { loading, formValues } = this.state;
    const formElementArray = Object.keys(orderForm).map(formItem => {
      return {
        id: formItem,
        config: { value: formValues[formItem].value, ...orderForm[formItem] },
      };
    });
    let form = (
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
        <Button type="submit" btnType="Success">
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