import React, {Component} from 'react';
import {API} from '../../services/API';
import {Redirect} from 'react-router-dom';
import { FormErrors } from '../../components/form/FormErrors';
import { lang } from '../../lang/en_us';

class Forgot_Password extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      errorMsg: '',
      formErrors: {email: ''},
      emailValid: false,
      formValid: false,
    };
    this.forgotPass = this.forgotPass.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  forgotPass() {
    if (this.state.email) {
        API('forgot_password',this.state).then((result) => {
            let responseJson = result;
            if(responseJson.userData){
                sessionStorage.setItem('userData',JSON.stringify(responseJson));
                this.setState({redirectToReferrer: true});
            }else{
                this.setState({errorMsg: responseJson.error["text"]});
            }
        });
    }
  }

  onBlur(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    }, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Please enter valid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
    }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/my_account'}/>)
    }

    return (
      <div className="row site-container">
        <div className="medium-5 columns left">
            <h4>{lang.forgot_your_password}</h4>
            <label><span className="error_msg"><b>{this.state.errorMsg}</b></span></label>
            <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                <label>{lang.email}</label>
                <input type="text" name="email" placeholder="Email" onBlur={this.onBlur}/>
            </div>
            <input type="submit" className="button" value="Submit" disabled={!this.state.formValid} onClick={this.forgotPass}/>
        </div>
      </div>
    );
  }
}

export default Forgot_Password;