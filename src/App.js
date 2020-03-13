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
  useEffect(() => {
    const { checkAuth } = props;
    checkAuth();
  }, [props]);
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = { checkAuth: checkAuthTimeOut };
export default connect(null, mapDispatchToProps)(App);
