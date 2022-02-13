import React from 'react'

import classes from './Button.module.css'

function Button(props) {
  const classNames = [];
  classNames.push(classes.button);
  if (props.variant === "primary") {
    classNames.push(classes.primary)
  } else if (props.variant === "secondary") {
    classNames.push(classes.secondary)
  }
  return (
    <>
      <button onClick={props.onClick} className={classNames.join(" ")}>{props.text}</button>
    </>
  );

}

export default Button;