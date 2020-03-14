import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'containers/Auth/Auth';
import Logout from 'containers/Auth/Logout/Logout';
import Checkout from 'containers/BurgerBuilder/Checkout/checkout';
import Orders from 'containers/Orders/Orders';
import { checkAuthTimeOut } from 'actions';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const App = props => {
  const { Authenticated, checkAuth } = props;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  let route = (
    <>
      <Route path="/auth" component={Auth} />
      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </>
  );

  if (Authenticated) {
    route = (
      <>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </>
    );
  }
  return (
    <div>
      <Layout>
        <Switch>{route}</Switch>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ auth: { token } }) => {
  return {
    Authenticated: Boolean(token),
  };
};

const mapDispatchToProps = { checkAuth: checkAuthTimeOut };
export default connect(mapStateToProps, mapDispatchToProps)(App);
