import React from 'react';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WarppedComponent, axios) => props => {
  let mounted = React.useRef(null);
  let axiosRequest = null;
  let axiosResponse = null;
  const errorHandler = () => {
    setError(false);
  };
  const [error, setError] = React.useState(false);
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
  React.useEffect(() => {
    mounted.current = true;
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
