import React, { useRef, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'containers/Auth/Auth';
import Orders from 'containers/Orders/Orders';
import { checkAuthTimeOut } from 'actions';
import Spinner from 'components/UI/Spinner/Spinner';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Logout = lazy(() => import('containers/Auth/Logout/Logout'));
const Checkout = lazy(() =>
  import('containers/BurgerBuilder/Checkout/checkout'),
);

const App = props => {
  const { Authenticated, checkAuth, authRedirect } = props;

  useRef(checkAuth());

  let route = (
    <>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );

  if (Authenticated) {
    route = (
      <>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
            <Redirect to={authRedirect} />
          </Suspense>
        </Switch>
      </>
    );
  }
  return (
    <div>
      <Layout>{route}</Layout>
    </div>
  );
};

const mapStateToProps = ({ auth: { token, authRedirect } }) => {
  return {
    Authenticated: Boolean(token),
    authRedirect,
  };
};

const mapDispatchToProps = { checkAuth: checkAuthTimeOut };
export default connect(mapStateToProps, mapDispatchToProps)(App);
