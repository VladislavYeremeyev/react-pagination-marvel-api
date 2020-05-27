import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./Input.module.css";

const Input = ({ error, ...rest }) => (
  <input
    className={classnames(styles.input, { [styles.error]: error })}
    {...rest}
  />
);

Input.propTypes = {
  error: PropTypes.bool,
};

Input.defaultProps = {
  error: false,
};

export default Input;
