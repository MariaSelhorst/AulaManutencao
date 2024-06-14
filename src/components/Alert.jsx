import React from 'react';
import style from './Alert.module.css';

const Alert = ({ message }) => {
  return <div className={style.alert}>{message}</div>;
}

export default Alert;
