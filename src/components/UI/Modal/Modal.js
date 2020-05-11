import React, { memo } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = ({ show, modalClosed, children }) => {
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
