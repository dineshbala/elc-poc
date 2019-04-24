import React, {Component} from 'react';
import '../../styles/common-styles.css';

class AddNewAddressForm extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="address-overlay address-book-page__overlay js-address-overlay js-address-shipping-form">
         <h2 className="address-overlay_header js-limited-shipping-sibling-target">Add new address</h2>
         <p>*Shipping limited to United States addresses only</p>
         <form id="address_shipping" name="address_shipping" className="jqtransform" method="post" noValidate={true} action="/account/address_book/address_thanks.tmpl">
            <input type="hidden" name="_SUBMIT" value="address_shipping"/>
            <input type="hidden" id="form--address_shipping--field--ADDRESS_ID" name="ADDRESS_ID" value="" className="js-address-id"/>
            <ul id="form--errors--address" className="error_messages error error_messages_display"></ul>
            <input type="hidden" name="_SECONDARY_SUBMIT" value="address_shipping"/>
            <fieldset className="address-form ">
               <div className="first_name-field form-field clearfix">
                  <input type="text" id="form--address_shipping--field--FIRST_NAME" name="FIRST_NAME" value="" data-test-id="form_address_firstname" className="field" placeholder="*First Name" aria-label="*First Name" aria-required="true" maxLength="30"/>
               </div>
               <div className="last_name-field form-field clearfix">
                  <input type="text" id="form--address_shipping--field--LAST_NAME" name="LAST_NAME" value="" data-test-id="form_address_lastname" className="field" placeholder="*Last Name" aria-label="*Last Name" aria-required="true" maxLength="30"/>
               </div>
               <div className="address1-field address1 form-field clearfix">
                  <input type="text" id="form--address_shipping--field--ADDRESS1" name="ADDRESS1" value="" data-test-id="form_address_address1" className="field" placeholder="*Address 1" aria-label="*Address 1" aria-required="true" maxlength="30"/>
               </div>
               <div className="address2-field form-field clearfix">
                  <input type="text" id="form--address_shipping--field--ADDRESS2" name="ADDRESS2" value="" data-test-id="form_address_address2" className="field" placeholder="Address Line 2" aria-label="Address Line 2" maxlength="30"/>
               </div>
               <div className="postalcode_state-field form-field clearfix">
                  <span className="postalcode--field">
                  <input type="text" id="form--address_shipping--field--POSTAL_CODE" name="POSTAL_CODE" value="" data-test-id="form_address_zipcode" className="js-postal-code" pattern_intl="(^.{3,10}$)" placeholder="*Zip Code" aria-label="*Zip Code" pattern_3="(^[A-Z]{2}\d{1} *\d{1}[A-Z]{2}$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)" pattern_1="(^\d{5,6}(-\d{4})?$)" pattern="(^\d{5,6}(-\d{4})?$)" aria-required="true" maxlength="10" required=""/>
                  </span>
                  <span className="state--field">
                     <select id="form--address_shipping--field--STATE" name="STATE" data-test-id="form_address_state" className="js-state state-select js-state-select selectBox" aria-label="State" aria-required="true" required="">
                        <option value="">State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AS">American Samoa</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="AE">Armed Forces Europe</option>
                        <option value="AA">Armed Forces Americas</option>
                        <option value="AP">Armed Forces Pacific</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="GU">Guam</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="FM">Micronesia</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PW">Palau</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VI">Virgin Islands</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                     </select>
                  </span>
               </div>
               <div className="city-field form-field clearfix">
                  <input type="text" id="form--address_shipping--field--CITY" name="CITY" value="" data-test-id="form_address_city" className="field" placeholder="*City" aria-label="*City" aria-required="true" maxlength="30"/>
               </div>
               <div className="phone-field form-field clearfix">
                  <input type="tel" id="form--address_shipping--field--PHONE1" name="PHONE1" value="" data-test-id="form_address_phone" className="js-phone" pattern_intl="(^(?:(^(?:\(\d{3}\)|\d{3})[\- ]?\d{3}[\- ]?\d{4}$))|(?:\+?[\d\- ]{2,14})$)" placeholder="*Mobile Number" aria-label="*Mobile Number" pattern_3="(^(?:\(\d{3}\)|\d{3})[\- ]?\d{3}[\- ]?\d{4}$)" pattern_1="(^(?:\(\d{3}\)|\d{3})[\- ]?\d{3}[\- ]?\d{4}$)" pattern="(^(?:\(\d{3}\)|\d{3})[\- ]?\d{3}[\- ]?\d{4}$)" aria-required="true" maxlength="14"/>
                  <input type="hidden" id="form--address_shipping--field--PHONE1_TYPE" name="PHONE1_TYPE" value="4" className="field"/>
               </div>
               <div className="form-field default-shipping address-form__default-shipping clearfix">
                  <input type="checkbox" id="form--address_shipping--field--DEFAULT_SHIPPING" name="DEFAULT_SHIPPING" value="1" data-test-id="form_address_defaultaddress" className="js-default-shipping" aria-label="Make this my default address"/>
                  <input type="hidden" id="form--address_shipping--field--DEFAULT_SHIPPING_PRESENT" name="DEFAULT_SHIPPING_PRESENT" value="1" data-test-id="form_address_defaultaddress" className="js-default-shipping" aria-label="Make this my default address"/>
                  <label className="" for="form--address_shipping--field--DEFAULT_SHIPPING" placeholder="Make this my default address" alt="Make this my default address"><span className="label-content">Make this my default address</span></label>
               </div>
            </fieldset>
            <div className="buttons form-field clearfix">
               <a href="#" className="button button--secondary js-cancel" data-test-id="form_address_cancel">Cancel</a>
               <input className="address-overlay_submit js-submit" type="submit" value="submit" data-test-id="form_address_submit"/>
            </div>
         </form>
      </div>
    )
  }
}
export default AddNewAddressForm;