import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { API } from '../../services/API';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { lang } from '../../lang/en_us';
import '../elements/Checkout.css';
/**
 * Login form component
**/
class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: lang.mandatory_symbol + lang.email_address
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: lang.mandatory_symbol + lang.password
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    errorMsg: '',
  }
  /**
  * Check login form validation
  **/
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  }
  /**
  * Update state with current form field values
  **/
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }
    this.setState({
      controls: updatedControls,
      formIsValid: formIsValid,
    });
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  /**
  * Check DB with user login details
  **/
  signinHandler = (event) => {
    event.preventDefault();
    API('login',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.userData) {
        sessionStorage.setItem('userData',JSON.stringify(responseJson));
      } else {
        this.setState({errorMsg: responseJson.error["text"]});
      }
    });
  }
  render() {
    /**
    * Build form elements from react state data
    **/
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
      formElementsArray.push( {
          id: key,
          config: this.state.controls[key]
      } );
    }
    let form = formElementsArray.map( formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ));
    return(
      <div className="login-form form-container">
        <h2>{lang.sign_in}</h2>
        <p>{lang.all_fields_mandatory}</p>
        <p><span className="error_msg"><b>{this.state.errorMsg}</b></span></p>
        <form onSubmit={this.signinHandler}>
          {form}
          <div><a href="/forgot_password">{lang.forgot_password}</a></div>
          <Button disabled={!this.state.formIsValid} btnType="Success">{lang.submit}</Button>
        </form>
        <a href="/signup">{lang.register_here}</a>
      </div>
    );
  };
};
export default inject("elcStore")(observer(Login));