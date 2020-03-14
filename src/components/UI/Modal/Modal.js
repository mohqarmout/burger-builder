import React, { memo } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = ({ show, modalClosed, children }) => {
  // show ==> boolean default of false
  const attachedClasses = [classes.Modal, classes.Close];

  if (show) {
    attachedClasses.splice(1, 1, classes.Show);
  }

  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div className={attachedClasses.join(' ')}>{children}</div>
    </>
  );
};

export default memo(modal);

// another way to do so  -_-
//
// style={{
//   transform: show ? 'translateY(0)' : 'translateY(-100vh)',
//   opacity: show ? '1' : '0',
// }}
