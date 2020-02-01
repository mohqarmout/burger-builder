import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = ({ children, link }) => (
  <li className={classes.NavigationItem}>
    <NavLink exact to={link} activeClassName={classes.active}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
