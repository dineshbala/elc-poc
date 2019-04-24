import React from 'react';
import './QuickShop.css';
import { lang } from '../../lang/en_us';
import {siteConfig} from '../../config/en_us';
console.clear();
/**
  * Quickshop component displayed in MPP
  * product partials. QuickShop component will
  * display all products shades in a sample MPP page
**/
class QuickShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayState: 'none',
      selectedSwatch: '',
      selectedShade: '',
      selectedShadeQty: 1,
      selectedShadeSize: '',
      selectedShadePrice: '',
      selectedSwatchSkuId: '',
      selectedSwatchSkuSize: '',
      selectedSwatchFormattedPrice: ''
    };
    this.hideQuickShop = this.hideQuickShop.bind(this);
    this.selectSwatch = this.selectSwatch.bind(this);
    this.shadeQtyChange = this.shadeQtyChange.bind(this);
  }
  /**
    * Close quickshop with product partial
  **/
  hideQuickShop(e) {
    this.props.updateProductListPage(e.target.getAttribute('data-product-id'), 'remove-qs-open');
  }
  /**
    * On quantity change in quickshop
  **/
  shadeQtyChange(e) {
    this.setState({
      selectedShadeQty: e.target.value
    });
  }
  /**
    * On shade selection update the
    * shade name and relevent details in the view
  **/
  selectSwatch(e) {
    e.preventDefault();
    e.target.classList.add('selected');
    const _target = e.target;
    this.props.updateQsSelectedProductSkus(this.props.prodId, {
      selectedSwatch: _target.getAttribute('data-sku-base-id'),
      selectedShade: _target.getAttribute('data-sku-shade-name'),
      selectedShadePrice: _target.getAttribute('data-sku-price'),
      selectedSwatchSkuId: _target.getAttribute('data-sku-id'),
      selectedSwatchSkuSize: _target.getAttribute('data-sku-size'),
      selectedSwatchFormattedPrice: _target.getAttribute('data-sku-formatted-price')
    });
    this.setState({
      selectedSwatch: parseInt(_target.getAttribute('data-sku-base-id')),
      selectedShade: _target.getAttribute('data-sku-shade-name'),
      selectedShadePrice: _target.getAttribute('data-sku-price'),
      selectedSwatchSkuId: _target.getAttribute('data-sku-id'),
      selectedSwatchSkuSize: _target.getAttribute('data-sku-size'),
      selectedSwatchFormattedPrice: _target.getAttribute('data-sku-formatted-price')
    });
  }
  
  render() {
    /**
      * When quickshop items are not available
      * handle default product details
    **/
    var component = this;
    let selectedSwatch = this.state.selectedSwatch;
    let selectedShade = this.state.selectedShade;
    let selectedShadeSize = this.state.selectedShadeSize;
    let selectedSwatchFormattedPrice = this.state.selectedSwatchFormattedPrice;
    let selectedSwatchSkuId = this.state.selectedSwatchSkuId;
    let selectedShadePrice = this.state.selectedShadePrice;
    if (this.props.qsSelectedProductSkus !== undefined && 
        typeof this.props.qsSelectedProductSkus[this.props.prodId] !== "undefined") {
      selectedSwatch = this.props.qsSelectedProductSkus[this.props.prodId].selectedSwatch;
      selectedShade = this.props.qsSelectedProductSkus[this.props.prodId].selectedShade;
      selectedShadeSize = this.props.qsSelectedProductSkus[this.props.prodId].selectedShadeSize;
      selectedSwatchFormattedPrice = this.props.qsSelectedProductSkus[this.props.prodId].selectedSwatchFormattedPrice;
      selectedSwatchSkuId = this.props.qsSelectedProductSkus[this.props.prodId].selectedSwatchSkuId;
      selectedShadePrice = this.props.qsSelectedProductSkus[this.props.prodId].selectedShadePrice;
    }
    /**
      * Build quantity dropdown
    **/
    let qtyOptions = siteConfig.maxProductQtyAllowed.map(
      (data, i) => <option key={'qtyOptions' + i} value={data}>{data}</option>
    );

    return (
      <div className="product_brief__sub-panel product_brief__sub-panel--shaded js-product-brief-quickshop product_brief__quickshop" data-qs={this.props.activeQS} data-curr-prod-id={this.props.prodId} >
        <button className="product_brief__sub-panel-close" 
          onClick={this.hideQuickShop} 
          data-product-id={this.props.prodId}></button>
        <ul className="product_brief__sku-price">
          <li data-skubaseid={selectedSwatch ? selectedSwatch : this.props.skus[0].SKU_ID} style={{display: "block"}}>
            {selectedShadeSize ? selectedShadeSize : this.props.skus[0].PRODUCT_SIZE}&nbsp;{selectedSwatchFormattedPrice ? selectedSwatchFormattedPrice : this.props.skus[0].formattedPrice}
          </li>
        </ul>
        <div className="product_brief__swatch-list">
          <ul className="js-shade-picker shade-list" data-product-id={this.props.prodId}>
            {
            this.props.skus.map((data, i) => <li className="swatches--single" data-sku-base-id={data.SKU_BASE_ID} data-inventory="1" key={Date.now()+i}>
              <a 
                className={"swatch swatch--selected" + (selectedSwatch===data.SKU_BASE_ID ? ' selected' : '') + (selectedSwatch == '' && i === 0 ? ' selected' : '')} 
                data-product-id={this.props.prodId} 
                data-sku-base-id={data.SKU_BASE_ID} 
                data-intensity={data.INTENSITY} 
                name={data.SHADENAME} 
                href="#" 
                onClick={this.selectSwatch} 
                data-sku-shade-name={data.SHADENAME} 
                data-sku-price={data.PRICE} 
                data-sku-id={data.SKU_ID}
                data-sku-size={data.PRODUCT_SIZE}
                data-sku-formatted-price={data.formattedPrice}></a>
              <div className="swatch__container">
                <div className="swatch--1" style={{backgroundColor: data.HEX_VALUE_STRING}}></div>
              </div>
            </li>)
            }
          </ul>
        </div>
        <div className="product_brief__shadename">{selectedShade ? selectedShade : this.props.skus[0].SHADENAME}</div>
        <div className="product_brief__misc-flag-sku"></div>
        <div className="product_brief__sub-panel-buttons-container">
          <div className="product_brief__quantity-container js-quantity" data-product-id={this.props.prodId}>
            <select className="product_brief__quantity selectBox" onChange={this.shadeQtyChange}>
              {qtyOptions}
            </select>
          </div>
          <button 
            data-product-id={this.props.prodId}
            data-sku-base-id={selectedSwatch ? selectedSwatch : this.props.skus[0].SKU_BASE_ID}
            data-sku-id={selectedSwatchSkuId ? selectedSwatchSkuId : this.props.skus[0].SKU_ID}
            data-qty={this.state.selectedShadeQty}
            data-price={selectedShadePrice} 
            className="js-add-to-cart product_brief__button--add-to-bag button--secondary button--dark product_brief__button--add-to-bag" 
            href="#" 
            data-test-id="add-to-cart" 
            onClick={this.props.click}>{lang.add_to_bag}</button>
          <a href={this.props.url} 
            className="product_brief__full-details" >{lang.view_details}</a>
        </div>
      </div>
    );
  }
}
export default QuickShop;