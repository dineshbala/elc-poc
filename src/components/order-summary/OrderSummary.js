import React from 'react';
import './OrderSummary.css';
import { lang } from '../../lang/en_us';
import { siteConfig } from '../../config/en_us';

/**
  * Order summary section displayed in the cart and
  * checkout pages.
**/
class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingCost: 0
    }
    this.changeShipping = this.changeShipping.bind(this);
  }
  /**
    * On updating shipping options
  **/
  changeShipping(e) {
    this.setState({
      shippingCost: parseFloat(e.target.value)
    });
  }
  render() {
    /**
      * Calculate cart total which includes shipping
    **/
    let cartSubTotal = 0;
    this.props.cartItems.map(product => (
      cartSubTotal += (parseInt(product.Quantity) * parseInt(product.PRICE))
    ));
    cartSubTotal = parseFloat(cartSubTotal);
    let totalCost = lang.currency_symbol + ((this.state.shippingCost + cartSubTotal).toFixed(2));
    cartSubTotal = parseFloat(cartSubTotal).toFixed(2);
    /**
      * Build shipping options from config
    **/
    let ShippingOptions = siteConfig.shipping.map((data, i) => <option key={i} value={data.price}>{data.text}</option>);
    return(
      <div id="order-summary-panel" className="order-summary-panel panel order-summary ">
        <header>
            <h2 className="order-summary-panel__title checkout__panel-title">{lang.order_summary}
              <span className="item-count checkout__header-item-count" id="header-item-count">
              <span className="item-count__number js-item-count-number">{this.props.totalQtyCount}</span>
              <span className="item-count__language"> {this.props.totalQtyCount > 1 ? lang.items : lang.item}</span>
              </span>
            </h2>
        </header>
        <div className="order-summary__content content clearfix">
            <div className="subtotal label order-summary__subtotal-label">{lang.sub_total}</div>
            <div className="subtotal value order-summary__subtotal-value" id="subtotal-row-total" data-test-id="cart_subtotal">
              {lang.currency_symbol}{cartSubTotal}
            </div>
            <div className="shipping label order-summary__shipping">
              <div>
                  <p className="order-summary__shipping-method">{lang.shipping}</p>
                  <form id="checkout_shipmethod" name="checkout_shipmethod" method="post" action="/checkout/index.tmpl">
                    <input type="hidden" name="_SUBMIT" value="checkout_shipmethod" />
                    <input type="hidden" name="_RPCACTION" value="checkout_shipmethod" />
                    <div className="single_ship_method"></div>
                    <div className="form-item ship-method">
                        <select id="form--checkout_shipmethod--field--SHIP_METHOD" 
                          name="SHIP_METHOD" 
                          data-test-id="cart_select_shipping" 
                          className="no-js" 
                          aria-required="true" 
                          required="" 
                          defaultValue="0" 
                          onChange={this.changeShipping}>
                          {ShippingOptions}
                        </select>
                    </div>
                    <input type="hidden" name="DEFAULT_SHIP_METHOD" value="11" />
                    <input type="hidden" name="ENGRAVE_SHIP_METHOD" value="11" data-cost="$0.00" />
                    <div className="js_hidden hidden">
                        <input type="submit" className="btn btn-mini" />
                    </div>
                  </form>
              </div>
            </div>
            <div className="shipping value order-summary__shipping-value js-order-summary-shipping-value">{'$'+this.state.shippingCost.toFixed(2)}</div>
            <div className="total label order-summary__total-label">
              <span className="total-label__wrapper">{lang.estimated_total}</span>
            </div>
            <div className="total value order-summary__total-value">
              <span className="total-value__wrapper">{totalCost}</span>
            </div>
            <div className="order-summary__loyalty-points-description hidden">
              <span className="order-summary__loyalty-points-earning">{lang.points_disclaimer_message}</span>
            </div>
        </div>
      </div>
    )
  }
}
export default OrderSummary;