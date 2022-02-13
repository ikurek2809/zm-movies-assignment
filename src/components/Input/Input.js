import React from 'react'

import classes from './Input.module.css'

function Input(props) {
  const classNames = [];
  classNames.push(classes.input);
  if (props.showError) {
    classNames.push(classes.error)
  }
  return (
    <>
      <input className={classNames.join(" ")} onChange={props.onChange} value={props.value} name={props.name} type={props.type} placeholder={props.placeholder}/>
      {props.showError && <p className={classes.errorMessage}>{props.errorMessage}</p>}
    </>
  );

}

export default Input;