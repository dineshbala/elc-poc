import React, {Component} from 'react';

class AddressItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    // /addressData={address} defaultShippingAddress={this.state.defaultShippingAddress} defaultBillingAddress
    let addressData = this.props.addressData;
    let isDefaultShippingAddress = addressData.id === this.props.defaultShippingAddress.id;
    return(
      <div className="address-item address-border js-address-item">
          <p className={"default_address_title" + (isDefaultShippingAddress ? '' : ' hidden')}>Default Address</p>
          <div className="address-item__address">
            <div className={"address-"+addressData.id}>
                <div className="address-item__info">
                  {addressData.FirstName} {addressData.LastName}<br/>
                  {addressData.Address1} {addressData.Address2}<br/>
                  {addressData.City}, {addressData.State} {addressData.Zipcode}<br/>
                  Mobile Number {addressData.Phone}
                </div>
                <div className="address-item__controls">
                  <button onClick={this.props.editAddress} className="js-edit-address" data-id={addressData.id} >Edit</button> /
                  <button onClick={this.props.deleteAddress} className="js-delete-address" data-id={addressData.id} >Delete</button>
                </div>
                <input type="hidden" value={addressData.id} className="address_id_hidden" name="address_id"/>
            </div>
          </div>
      </div>
    )
  }
}

export default AddressItem;