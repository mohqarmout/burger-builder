import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from 'actions';

export class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = {
  logout: authLogout,
};

export default connect(null, mapDispatchToProps)(Logout);
