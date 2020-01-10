import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = ({ clicked }) => (
  <div
    className={classes.DrawerToggle}
    onKeyPress={clicked}
    role="button"
    onClick={clicked}
    tabIndex={0}
  >
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
