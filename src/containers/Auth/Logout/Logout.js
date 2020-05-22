import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from 'actions';

export const Logout = props => {
  const { logout } = props;
  useEffect(() => {
    logout();
    // eslint-disable-next-line
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = {
  logout: authLogout,
};

export default connect(null, mapDispatchToProps)(Logout);
