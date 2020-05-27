import React from 'react';
import styles from './Label.module.css';

const Label = (props) => {
  return (
    <label className={styles.label} {...props} />
  );
};

export default Label;