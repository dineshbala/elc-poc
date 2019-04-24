import React, {Component} from 'react';
import {API} from '../../services/API';
import {Redirect} from 'react-router-dom';
import Input from '../elements/Input';
import Button from '../elements/Button';
import '../elements/Checkout.css'

class Signup extends Component {
  state = {
    controls: {
      firstname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'firstname',
            placeholder: '*First Name'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
     lastname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'lastname',
            placeholder: '*Last Name'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      mobile: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'mobile',
            placeholder: '*Mobile Number'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            name: 'email',
            placeholder: '*Email Address'
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
            placeholder: '*Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false
  }
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
        formIsValid: formIsValid
    });
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  signinHandler = (event) => {
    event.preventDefault();
      API('signup',this.state).then((result) => {
      let responseJson = result;
      if(responseJson.userData){
        sessionStorage.setItem('userData',JSON.stringify(responseJson));
        window.location.href="/";
      }else{
         //alert(responseJson.error["text"]);
         this.setState({errorMsg: responseJson.error["text"]});
      }

     });

  }
  render() {
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
            label={formElement.config.label}
            changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ));
    return(
      <div className="login-form form-container">
        <h2>Registration</h2>
        <p>All fields are mandatory</p>
        <form onSubmit={this.signinHandler}>
          {form}
          <Button disabled={!this.state.formIsValid} btnType="Success">SUBMIT</Button>
        </form>
        <a href="/login">Already a member, Signin Here</a>
      </div>
    );
  };
};

export default Signup;