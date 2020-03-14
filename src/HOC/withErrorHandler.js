import React, { Component } from 'react';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WarppedComponent, axios) =>
  class ErrorHoc extends Component {
    constructor(props) {
      super(props);
      this.setinterceptors();
    }

    state = {
      error: false,
    };

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.axiosRequest);
      axios.interceptors.response.eject(this.axiosResponse);
      this.mounted = false;
    }

    setinterceptors = () => {
      this.axiosRequest = axios.interceptors.request.use(
        req => {
          if (this.mounted) {
            this.setState({
              error: null,
            });
          }

          return req;
        },
        error => {
          if (this.mounted) {
            this.setState({
              error,
            });
          }
          return Promise.reject(error);
        },
      );
      this.axiosResponse = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({
            error,
          });
          return Promise.reject(error);
        },
      );
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
