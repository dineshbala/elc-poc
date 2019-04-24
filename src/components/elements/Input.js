import React from 'react';
import './Input.css'
/**
 * Build form element - Input and select
 **/
const input = (props) => {
  let inputElement = null;
  const inputClasses = ['input-element'];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }
  switch (props.elementType) {
    case ('input') : inputElement = <input 
      className={inputClasses.join(' ')}
      {...props.elementConfig}
      value={props.value} 
      card={props.card}      
      onChange={props.changed} />;
    break;
    case ('select') : 
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} {...props.nameConfig} onChange={props.changed} >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
      </select>
    );
    break;
    case ('textarea') : inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}  />
    break;
    default : inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}  />
  }
  return (
    <div className='input'>
      {inputElement}
    </div>
  );
}
export default input;