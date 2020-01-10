import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = ({ children, active, link }) => (
  <li className={classes.NavigationItem}>
    <a href={link} className={active ? classes.active : null}>
      {children}
    </a>
  </li>
);

export default navigationItem;
