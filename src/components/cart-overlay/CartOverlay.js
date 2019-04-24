import React from 'react';
import './CartOverlay.css';
import { lang } from '../../lang/en_us';
console.clear();

/* CartOverlay component */
class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayClass: 'overlay-bg hidden'
    };
    this.overLayTimeout = '';
  }
  componentDidUpdate() {
    if (this.overLayTimeout) {
        clearTimeout(this.overLayTimeout);
    }
    this.overLayTimeout = setTimeout(function() {
      // @Todo: Move to states
      document.querySelectorAll('.js-cart-overlay')[0].classList.remove('slide-in');
    }, 4000);
  }
  render() {
    let that = this;
    let total = this.props.total.toFixed(2);
    let cartOverlayClass = 'js-cart-overlay product-list__cart-overlay cart-confirm';
    let cartListProducts = [];
    let buildProductsRow = function(obj, i) {
      function filterProduct(sku) {
          if (sku.SKU_ID === i) {
            sku.qty = obj.qty;
            sku.subtotal = sku.qty * sku.PRICE;
            return true;
          } else {
            return false;
          }
      }
      function allSkus(eachProduct) {
        let filteredItem = eachProduct.skus.find(filterProduct);
        if (typeof filteredItem !== "undefined") {
          filteredItem.PROD_RGN_NAME = eachProduct.PROD_RGN_NAME;
          filteredItem.PROD_RGN_SUBHEADING = eachProduct.PROD_RGN_SUBHEADING;
          filteredItem.url = eachProduct.url;
          cartListProducts.push(filteredItem);
        }
      }
      that.props.products.map(allSkus);
    }
    let cartListProductsJson = this.props.cartList.length ? JSON.parse(this.props.cartList) : {};
    if (Object.keys(cartListProductsJson).length) {
      for (let x in cartListProductsJson) {
        buildProductsRow(cartListProductsJson[x], x);
      }
      if (document.querySelectorAll('.js-cart-overlay').length) {
        // @Todo: Move to states
        document.querySelectorAll('.js-cart-overlay')[0].classList.add('slide-in');
      }
    }
    return (
    <div>
      <div className={cartOverlayClass}>
        <div className="cart-confirm__content">
          <div className="product-list__cart-overlay--item-container">
          {
          cartListProducts.map((data, i) => <div className="product-list__cart-overlay--each-item" key={Date.now()+i}>
            <div className="cart-confirm__image-container">
              <img className="cart-confirm__image" src={this.props.domain + data.SMALL_IMAGE} alt=""/>
            </div>
            <div className="cart-confirm__description">
              <a href={data.url}>
                <h5 className="cart-confirm__header">{data.PROD_RGN_NAME}</h5>
                <h6 className="cart-confirm__sub-header">{data.PROD_RGN_SUBHEADING}</h6>
              </a>
              <div className="cart-confirm__shade">
                <div className="cart-confirm__shade-swatch swatches--single">
                  <div className="swatch__container">
                    <div className="swatch--1" style={{backgroundColor: data.HEX_VALUE_STRING}}></div>
                  </div>
                </div>
                {data.SHADENAME}
              </div>
              <div className="cart-confirm__shade">{data.PRODUCT_SIZE}. {data.formattedPrice}</div>
              <div className="product-list__cart-overlay--qty">{lang.qty}{lang.colon} {data.qty}</div>
              <div className="product-list__cart-overlay--subtotal">${data.subtotal.toFixed(2)}</div>
            </div>
          </div>)
          }
          </div>
          <div className="product-list__cart-overlay--total-price">
            <span className="col-6">{lang.total_price}{lang.colon}</span>
            <span className="col-6 text-right">{lang.currency_symbol}{total}</span>
          </div>
          <a href="/viewcart" className="cart-overlay__button--checkout js-cart-overlay-checkout cart-confirm__shade-button button--secondary button--dark">{lang.btn_checkout}</a>
        </div>
      </div>
    </div>
    );
  }
}

export default CartOverlay;