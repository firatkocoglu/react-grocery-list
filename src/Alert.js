import React from 'react';

const Alert = (props) => {
  const classes = 'alert ' + props.alert;
  return <p className={classes}>{props.title}</p>;
};

export default Alert;
