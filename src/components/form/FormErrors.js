import React from 'react';
/**
 * Form error message that will 
 * be displayed on validation errors
**/
export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i} className="error_msg">{formErrors[fieldName]} {fieldName}</p>
        )
      } else {
        return '';
      }
    })}
  </div>