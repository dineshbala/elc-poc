import React from 'react';
import { API } from '../../services/API';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { lang } from '../../lang/en_us';
import '../elements/Checkout.css'

/**
* Shipping section component in checkout flow
**/
class Shipping extends React.Component {
  state = {
    controls: {
      firstname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'firstname',
            placeholder: lang.mandatory_symbol + lang.first_name
        },
        value: '',
        validation: {
            required: true,
            minLength: 1
        },
        valid: false,
        touched: false
      },
      lastname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'lastname',
            placeholder: lang.mandatory_symbol + lang.last_name
        },
        value: '',
        validation: {
            required: true,
            minLength: 1
        },
        valid: false,
        touched: false
      },
      address1: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'address1',
            placeholder: lang.mandatory_symbol + lang.address_1
        },
        value: '',
        validation: {
            required: true,
            minLength: 1
        },
        valid: false,
        touched: false
      },
      address2: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'address2',
            placeholder: lang.mandatory_symbol + lang.address_2
        },
        value: '',
        validation: {
            required: true,
            minLength: 1
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'zipcode',
            placeholder: lang.mandatory_symbol + lang.zip_code
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 10
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'city',
            placeholder: lang.mandatory_symbol + lang.city
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      state: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'state',
            placeholder: lang.mandatory_symbol + lang.state
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'phone',
            placeholder: lang.mandatory_symbol + lang.phone
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false
  }
  /**
   * Check default validation on form submit
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
    return isValid;
  }
  /**
   * Update react state with the current state of the form
   * elements/values
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
        formIsValid: formIsValid
    });

    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  /**
   * On shipping form is submission
  **/
  shippingHandler = (event) => {
    event.preventDefault();
    if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
	  this.state.user_id = userData.userData.user_id;
    }
    API('shippingaddress',this.state).then((result) => {
      let responseJson = result;
      if(responseJson.shippingaddress){
        window.location.href="/payment";
      }else{
         // @Todo: Handle errors
      }

     });
  }
  render() {
    /**
     * Get the current state of the form
     * elements from the react state
    **/
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
        formElementsArray.push( {
            id: key,
            config: this.state.controls[key]
        } );
    }
    /**
     * Build form elements
    **/
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
      <div className="shipping-information form-container">
        <h2>Shipping Details</h2>
        <p>All fields are mandatory</p>
        <form onSubmit={this.shippingHandler}>
          {form}
          <Button disabled={!this.state.formIsValid} btnType="Success">{lang.proceed_to_payment}</Button>
        </form>
      </div>
    );
  };
};

export default Shipping;