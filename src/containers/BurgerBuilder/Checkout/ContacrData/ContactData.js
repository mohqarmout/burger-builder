import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postOrederThunk } from 'actions';
import Spinner from 'components/UI/Spinner/Spinner';
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
        touched: false,
      },
      street: {
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
      zipCode: {
        value: '',
        validation: { required: true, minLength: 5, maxLength: 5 },
        valid: false,
        touched: false,
      },
      city: {
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
      country: {
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
      email: {
        value: '',
        validation: { required: true },
        valid: false,
        touched: false,
      },
      deliveryMethod: { value: 'fastest' },
    },
    loading: false,
    canSubmit: false,
  };

  orderHandler = async event => {
    event.preventDefault();
    const { push } = this.props.history;
    const { ingredients, totalPrice, postOreder } = this.props;
    const { formValues, canSubmit } = this.state; //!  set formValues to redux store  ==> after submit
    // ? =====> loading setState
    this.setState({ loading: true });
    const cache = {};
    Object.keys(formValues).forEach(key => {
      cache[key] = formValues[key].value;
    });
    const orders = {
      ingredients,
      price: totalPrice,
      orederDate: cache,
    };
    if (canSubmit) {
      try {
        await postOreder(orders);
        this.setState({ loading: false });
        push('/');
      } catch (err) {
        this.setState({ loading: false });
      }
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
      this.setState({
        formValues: {
          ...formValues,
          [id]: {
            value,
            validation,
            valid: this.checkValidity(value, validation),
            touched: true,
          },
        },
      });
    }
    // eslint-disable-next-line no-shadow
    this.setState(({ formValues }) => ({
      canSubmit: this.updateCanSubmitState(formValues),
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

  render() {
    const { loading, formValues, canSubmit } = this.state;
    const formElementArray = Object.keys(orderForm).map(formItem => {
      return {
        id: formItem,
        config: {
          value: formValues[formItem].value,
          ...orderForm[formItem],
          valid: formValues[formItem].valid,
          shouldValidate: formValues[formItem].validation,
          touched: formValues[formItem].touched,
        },
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
        <Button active={canSubmit} type="submit" btnType="Success">
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
const mapDispatchToProps = {
  postOreder: postOrederThunk,
};

const mapStateToProps = ({ ingredients, totalPrice }) => ({
  ingredients,
  totalPrice,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
