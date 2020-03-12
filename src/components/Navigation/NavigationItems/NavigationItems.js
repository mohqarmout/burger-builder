import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    {isAuthenticated ? (
      <NavigationItem link="/logout">logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
