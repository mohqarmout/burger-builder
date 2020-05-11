import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { postOrederThunk } from 'actions';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'HOC/withErrorHandler';
import axios from 'axiosInstances';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import classes from './ContactData.module.css';

export const objectFactory = ({
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
export const ContactData = props => {
  const [formValues, setFormValues] = React.useState({
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
  });

  const [loading, setLoading] = React.useState(false);
  const [canSubmit, setcanSubmit] = React.useState(false);
  const {
    ingredients,
    totalPrice,
    postOreder,
    history: { push },
  } = props;
  const orderHandler = async event => {
    event.preventDefault();
    setLoading(true);
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
        setLoading(false);
        push('/');
      } catch (err) {
        setLoading(false);
      }
    }
  };
// @greg -- I think useCallback Implements Closure !! 
  const handleInputChange = useCallback(({ target: { value } }, id) => {
    const { validation } = formValues[id];
    if (id === 'deliveryMethod') {
      setFormValues({
        ...formValues,
        [id]: {
          value,
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [id]: {
          value,
          validation,
          valid: checkValidity(value, validation),
          touched: true,
        },
      });
    }
    setcanSubmit(updateCanSubmitState(formValues));
  }, [formValues]);

  const updateCanSubmitState = formValues => {
    const cache = [];
    Object.keys(formValues).forEach(formItem => {
      formValues[formItem].validation && cache.push(formValues[formItem].valid);
    });
    return cache.every(item => item);
  };

  const checkValidity = (value, rule) => {
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

  const formElementArray = useMemo(
    () =>
      Object.keys(orderForm).map(formItem => {
        return {
          id: formItem,
          config: {
            value: formValues[formItem].value,
            valid: formValues[formItem].valid,
            shouldValidate: formValues[formItem].validation,
            touched: formValues[formItem].touched,
            ...orderForm[formItem],
          },
        };
      }),
    [formValues],
  );
  let form = useMemo(
    () => (
      <form onSubmit={orderHandler}>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            handleInputChange={event => {
              handleInputChange(event, id);
            }}
            {...config}
          />
        ))}
        <Button active={canSubmit} type="submit" btnType="Success">
          ORDER
        </Button>
      </form>
    ),
    // eslint-disable-next-line
    [formElementArray],
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
};
const mapDispatchToProps = {
  postOreder: postOrederThunk,
};

const mapStateToProps = ({ BurgerBuilder: { ingredients, totalPrice } }) => ({
  ingredients,
  totalPrice,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));
