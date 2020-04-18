import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = ({ children, link, exact, closed }) => (
  <li className={classes.NavigationItem}>
    <NavLink
      onClick={closed}
      exact={exact}
      to={link}
      activeClassName={classes.active}
    >
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
