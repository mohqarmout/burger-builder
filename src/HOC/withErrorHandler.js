import React, { useState, useEffect, useRef } from 'react';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WarppedComponent, axios) => props => {
  let mounted = useRef();
  let axiosRequest = null;
  let axiosResponse = null;
  const errorHandler = () => {
    setError(false);
  };
  const [error, setError] = useState(false);
  axiosRequest = axios.interceptors.request.use(
    req => {
      if (mounted.current) {
        setError(null);
      }
      return req;
    },
    error => {
      if (mounted.current) {
        setError(error);
      }
      return Promise.reject(error);
    },
  );
  axiosResponse = axios.interceptors.response.use(
    res => res,
    error => {
      if (mounted.current) {
        setError(error);
      }
      return Promise.reject(error);
    },
  );
  useEffect(() => {
    mounted.current = true;
  });
  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(axiosRequest);
      axios.interceptors.response.eject(axiosResponse);
      mounted.current = false;
    };
  });
  return (
    <>
      <Modal modalClosed={errorHandler} show={error}>
        {error ? error.message : null}
      </Modal>
      <WarppedComponent {...props} />
    </>
  );
};

export default withErrorHandler;
