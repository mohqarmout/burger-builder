import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Checkout from 'containers/BurgerBuilder/Checkout/checkout';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// consder there is now state ?
const App = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/" component={BurgerBuilder} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
