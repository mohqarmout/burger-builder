import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ isAuthenticated, closed }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    {isAuthenticated ? (
      <NavigationItem closed={closed} link="/orders">
        Orders
      </NavigationItem>
    ) : null}
    {isAuthenticated ? (
      <NavigationItem closed={closed} link="/logout">
        logout
      </NavigationItem>
    ) : (
      <NavigationItem closed={closed} link="/auth">
        authenticate
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
