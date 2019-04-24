import React, { Component } from 'react';
import './Viewcart.css';
import { lang } from '../../lang/en_us';
/**
  * Empty cart component displays status 
  * when the cart is empty
**/
class EmptyCart extends Component {
  render() {
    return(
      <div className="viewcart--empty-panel">
        <div className="error_message empty-cart">{lang.empty_cart_message}</div>
        <a href="/" className="continue-shopping button--secondary button--dark" >{lang.start_shopping}</a>
      </div>
    )
  }
}
export default EmptyCart;