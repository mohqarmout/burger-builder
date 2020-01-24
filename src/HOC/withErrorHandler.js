import React, { Component } from 'react';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WarppedComponent, axios) =>
  class ErrorHoc extends Component {
    // for education purpose
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      // this.setinterceptors(); // Hmmm this is new mate,to replace componentWillMount
    }

    state = {
      error: false,
      axiosRequest: axios.interceptors.request.use(
        req => {
          this.setState({
            error: null,
          });
          return req;
        },
        error => {
          this.setState({
            error,
          });
          return Promise.reject(error);
        },
      ),
      axiosResponse: axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({
            error,
          });
          return Promise.reject(error);
        },
      ),
    };

    componentWillUnmount() {
      const { axiosRequest, axiosResponse } = this.state;
      axios.interceptors.request.eject(axiosRequest);
      axios.interceptors.response.eject(axiosResponse);
    }

    setinterceptors = () => {
      // this.axiosRequest = axios.interceptors.request.use(
      //   req => {
      //     this.setState({
      //       error: null,
      //     });
      //     return req;
      //   },
      //   error => {
      //     this.setState({
      //       error,
      //     });
      //     return Promise.reject(error);
      //   },
      // );
      // this.axiosResponse = axios.interceptors.response.use(
      //   res => res,
      //   error => {
      //     this.setState({
      //       error,
      //     });
      //     return Promise.reject(error);
      //   },
      // );
    };

    errorHandler = () => {
      this.setState({
        error: false,
      });
    };

    render() {
      const { error } = this.state;
      return (
        <>
          <Modal modalClosed={this.errorHandler} show={error}>
            {error ? error.message : null}
          </Modal>
          <WarppedComponent {...this.props} />
        </>
      );
    }
  };
export default withErrorHandler;
