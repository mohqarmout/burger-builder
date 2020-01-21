import React, { Component } from 'react';

import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WarppedComponent, axios) =>
  class ErrorHoc extends Component {
    state = {
      error: false,
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({
          error: null,
        });
        return req;
      }, null);

      axios.interceptors.response.use(null, error => {
        this.setState({
          error,
        });
        return Promise.reject(error);
      });
    }

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
