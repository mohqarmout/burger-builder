import React from 'react';

import burgerLogo from 'assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
  /* I think there is no need for props.height sine you don't pass it */
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
