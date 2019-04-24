import React from 'react';
import './Button.css'
/**
 * Build form element - button
**/
const button = (props) => (
  <button 
    disabled={props.disabled}
    className='button danger'
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default button;