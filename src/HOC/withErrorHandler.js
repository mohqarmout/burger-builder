import React from 'react';
import useIsMounted from 'hooks/useIsMounted';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WarppedComponent, axios) => props => {
  const ismountd = useIsMounted();
  let axiosRequest = null;
  let axiosResponse = null;
  const errorHandler = () => {
    setError(false);
  };
  const [error, setError] = React.useState(false);
  axiosRequest = axios.interceptors.request.use(
    req => {
      if (ismountd.current) {
        setError(null);
      }
      return req;
    },
    error => {
      if (ismountd.current) {
        setError(error);
      }
      return Promise.reject(error);
    },
  );
  axiosResponse = axios.interceptors.response.use(
    res => res,
    error => {
      if (ismountd.current) {
        setError(error);
      }
      return Promise.reject(error);
    },
  );
  React.useEffect(() => {
    return () => {
      axios.interceptors.request.eject(axiosRequest);
      axios.interceptors.response.eject(axiosResponse);
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
