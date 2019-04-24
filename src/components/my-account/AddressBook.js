import React, {Component} from 'react';
import {API} from '../../services/API';
import LoadingIcon from '../common/RingLoader'
import AddressItem from './AddressItem';
import NoAddressData from './NoAddressData';
import AddNewAddressForm from './AddNewAddressForm';
import '../../styles/common-styles.css';
import { lang } from '../../lang/en_us';

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      AddressLists:[],
      defaultShippingAddress: {},
      defaultBillingAddress: {}
    }
    this.addNewAddress = this.addNewAddress.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
  }
  componentDidMount() {
    API('getUserAddressList',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.userAddressList && responseJson.userAddressList.AddressLists) {
        this.setState({
          AddressLists: responseJson.userAddressList.AddressLists,
          defaultShippingAddress: responseJson.userAddressList.dShippingAddress[0],
          defaultBillingAddress: responseJson.userAddressList.dBillingAddress[0],
          showLoading: false
        })
      } else {
        this.setState({
          showLoading: false
        })
      }
    });
  }
  addNewAddress(e) {
    alert('Under development');
  }
  editAddress(e) {
    alert('Under development');
  }
  deleteAddress(e) {
    alert('Under development');
  }
  render(){
    if (this.state.showLoading) {
      return <LoadingIcon />;
    }
    let AddressItemList = this.state.AddressLists.length ? 
      this.state.AddressLists.map(address => (
        <AddressItem 
          addressData={address} 
          defaultShippingAddress={this.state.defaultShippingAddress} 
          defaultBillingAddress={this.state.defaultBillingAddress}
          addNewAddress={this.addNewAddress}
          editAddress={this.editAddress}
          deleteAddress={this.deleteAddress}
          key={Date.now() + Math.random()}
        />
      )) : <NoAddressData />;
    return(
      <div className="account--content">
        <div className="account__addressbook">
          <div className="section-header">
            <h3 className="section-header__header">{lang.address_book}</h3>
            <a className="section-head__link js-add-address" href="#" onClick={this.addNewAddress}>{lang.add_new_address}</a>
          </div>
          <div className="section-content">
            <section className="address-info js-address-info">
            {AddressItemList}
            </section>
          </div>
        </div>
      </div>
    )
  }
}
export default AddressBook;