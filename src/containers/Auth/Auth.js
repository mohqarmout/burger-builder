import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import useIsMounted from 'hooks/useIsMounted';
import { postAuthThunk, authSetRedirectPath } from 'actions';
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
export const Auth = props => {
  const [formItems, setFormItems] = useState({
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
  });

  const [canSubmit, setCanSumbit] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [isSignedUp, setisSignedUp] = React.useState(false);
  const isMounted = useIsMounted();

  const {
    authError,
    isAuthenticated,
    authRedirect,
    buildingBurger,
    getAuth,
  } = props;

  useEffect(() => {
    if (buildingBurger) {
      authSetRedirectPath('/checkout');
    } else {
      authSetRedirectPath('/');
    }
  }, [buildingBurger]);

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

  const handleInputChange = useCallback(
    ({ target: { value } }, id) => {
      const { validation } = formItems[id];
      setFormItems({
        ...formItems,
        [id]: {
          value,
          validation,
          valid: checkValidity(value, validation),
          touched: true,
        },
      });
      setCanSumbit(
        updateCanSubmitState({
          ...formItems,
          [id]: {
            value,
            validation,
            valid: checkValidity(value, validation),
            touched: true,
          },
        }),
      );
    },
    [formItems],
  );

  const submitHandler = useCallback(
    async event => {
      try {
        event.preventDefault();
        const {
          email: { value: email },
          password: { value: password },
        } = formItems;
        if (canSubmit) {
          await getAuth(email, password, isSignedUp);
          isMounted.current && setloading(true);
        }
      } catch (error) {
        setloading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formItems, canSubmit],
  );

  const SwitchAuthModeHandler = useCallback(() => {
    setisSignedUp(!isSignedUp);
  }, [isSignedUp]);

  const formElementArray = useMemo(
    () =>
      Object.keys(authForm).map(formItem => {
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
      }),
    [formItems],
  );

  let form = useMemo(
    () => (
      <>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            handleInputChange={event => {
              handleInputChange(event, id);
            }}
            {...config}
          />
        ))}
      </>
    ),
    [formElementArray, handleInputChange],
  );
  let errorMessage = authError ? (
    <p
      style={{
        color: 'red',
      }}
    >
      Please check your info
    </p>
  ) : null;

  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.Auth}>
      {isAuthenticated ? <Redirect to={authRedirect} /> : null}
      <form onSubmit={submitHandler}>
        {form}
        <Button active={canSubmit} type="submit" btnType="Success">
          SUBMIT
        </Button>
        <Button btnType="Danger" clicked={SwitchAuthModeHandler}>
          SWITCH TO {isSignedUp ? 'SINGIN' : 'SINGUP'}
        </Button>
      </form>
      {errorMessage}
    </div>
  );
};

const mapDispatchToProps = { getAuth: postAuthThunk, authSetRedirectPath };

const mapStateToProps = ({
  auth: { error, token, authRedirect },
  BurgerBuilder: { building },
}) => {
  return {
    authError: error,
    isAuthenticated: Boolean(token),
    buildingBurger: building,
    authRedirect,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
