import React from 'react';
import './Viewcart.css';
import {lang} from '../../lang/en_us';
import {siteConfig} from '../../config/en_us';

/**
  * Viewcart product items partial used
  * by viewcart panel
**/
class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let qtyOptionsConfig = siteConfig.maxProductQtyAllowed.map(
      (data, i) => <option key={data} value={data}>{data}</option>
    );
    
    return (
      <div className="cart-item product shaded clearfix js-cart-item">
        <div className="column thumb cart-item__thumb">
          <a href={this.props.sku_details.url}>
            <img src={this.props.domain + this.props.sku_details.SMALL_IMAGE} 
              alt="Double Wear" 
              className="cart-item__thumb-image" />
          </a>
        </div>
        <div className="desc column cart-item__desc">
          <div className="info cart-item__desc-info">
            <div className="product_name cart-item__product-name">
              <a className="link" href={this.props.sku_details.url}>
                {this.props.sku_details.PROD_RGN_NAME}
              </a>
            </div>
            <div className="product_subname cart-item__product-subname">
              <a className="link" href={this.props.sku_details.url}>
                {this.props.sku_details.PROD_RGN_SUBHEADING}
              </a>
            </div>
            <div className="size cart-item__size">
              {lang.size}{lang.colon} {this.props.sku_details.PRODUCT_SIZE}
            </div>
            <div className="cart-item__color column">
              <div className="cart-item__swatch" 
                style={{backgroundColor: this.props.sku_details.HEX_VALUE_STRING}}></div>
              <div className="cart-item__swatch--shadename">{this.props.sku_details.SHADENAME}</div>
            </div>
            <div className="cart-item__remove-form">
              <form id="cart" name="cart" method="post" action="/checkout/viewcart.tmpl">
                <input type="hidden" name="_SUBMIT" value={this.props.sku_details.SKU_ID + "_481917316-_-cart"} />
                <input type="hidden" 
                  name="SKU_BASE_ID" 
                  value={this.props.sku_details.SKU_BASE_ID} 
                  tabIndex="1" 
                  aria-required="true" />
                <input type="hidden" name="CART_ID" value="481917316" />
                <input type="hidden" name="QTY" value="0" />
                <a id={'remove_' + this.props.sku_details.SKU_BASE_ID} 
                  className="remove_link" href="#" 
                  data-test-id="cart_product_remove" 
                  onClick={this.props.removeSkuItem} 
                  data-sku-base-id={this.props.sku_details.SKU_BASE_ID}>{lang.remove}</a>
                <input type="submit" name="_SUBMIT" value="Remove" className="hidden" />
              </form>
            </div>
            <a href="#remove-sample" 
              className="remove-sample hidden" 
              data-sku-id={this.props.sku_details.SKU_BASE_ID}>{lang.remove}</a>
            <div className="total cart-item__total">
              ${(parseInt(this.props.sku_details.Quantity) * this.props.sku_details.PRICE).toFixed(2)}
            </div>
            <div className="price cart-item__price">
              <div className="price-label cart-item__price-label">{lang.price}{lang.colon} </div>
              {this.props.sku_details.formattedPrice}
            </div>
          </div>
        </div>
        <div className="cart-item__qty-replenishment-group">
          <div className="qty cart-item__qty">
            <div className="qty-value cart-item__qty-value">{this.props.sku_details.Quantity}</div>
            <div className="qty-dropdown cart-item__qty-dropdown">
              <form id="cart" name="cart" method="post" action="/checkout/viewcart.tmpl">
                <input type="hidden" name="_SUBMIT" value="SKU43913_481917316-_-cart" />
                <select name="QTY" 
                  data-test-id="cart_select_quantity" 
                  className="selectBox" 
                  tabIndex="2" 
                  aria-required="true" 
                  required="" 
                  value={this.props.sku_details.Quantity} 
                  onChange={this.props.changeQty} 
                  data-sku-base-id={this.props.sku_details.SKU_BASE_ID}>
                  {qtyOptionsConfig}
                </select>
                <input type="hidden" 
                  name="SKU_BASE_ID" 
                  value={this.props.sku_details.SKU_BASE_ID} 
                  tabIndex="1" 
                  aria-required="true" />
                <input type="hidden" name="CART_ID" value="481917316" />
                <input type="submit" name="_SUBMIT" value="Update" className="update_btn btn btn-mini hidden" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductList;