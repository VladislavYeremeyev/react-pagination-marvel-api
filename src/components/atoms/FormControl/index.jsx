import React from 'react';
import styles from './FormControl.module.css';

const FormControl = ({ children }) => {
  return (
    <div className={styles.formControl}>
      {children}
    </div>
  );
};

export default FormControl;