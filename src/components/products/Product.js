import React from 'react';
import { observer, inject } from 'mobx-react';
import { API } from '../../services/API';
import QuickShop from './QuickShop';
import { lang } from '../../lang/en_us';

/**
  * Product partial that will be used by
  * MPP, Viewcart recommended products panel, etc
**/
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCurrentQuickShop: 'none',
      time: null,
      data:[],
      qty: 0,
      userId: '',
      orderNumb: null,
      PRODUCT_ID: '',
      SKU_ID: '',
    };
	  this.productTempUrl = '/product_view/' + this.props.prodId + '/' +this.props.skus[0].SKU_ID; // product temp url
    this.add = this.add.bind(this);
  }
  /**
    * Add to bag action of the product
    * DB gets updated with the current cart items
  **/
  add(e) {
    let newQty = parseInt(e.target.getAttribute('data-qty')) || 1;
    let skuId = e.target.getAttribute('data-sku-id');
    this.setState({
      qty: this.state.qty + newQty
    });
    this.props.handleTotal(this.props.price, skuId, newQty);
    if(sessionStorage.getItem('orderNumber')){
      let data = JSON.parse(sessionStorage.getItem("orderNumber"));
	    this.state.orderNumb = data.cartInsertData.orderNumber;
    }
    if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
	    this.state.userId = userData.userData.user_id;
    }
    this.state.PRODUCT_ID = this.props.prodId;
	  this.state.SKU_ID = skuId ? skuId : this.props.skuBaseId;
	  this.state.qty = newQty;
	  if(this.state.PRODUCT_ID && this.state.SKU_ID) {
      API('addtocart',this.state).then((result) => {
        let responseJson = result;
        if(responseJson.cartInsertData){
          if(!sessionStorage.getItem('orderNumber')){
            sessionStorage.setItem('orderNumber',JSON.stringify(responseJson));
          }
        } else {
          // To do: Handle error
        }
      });
    }
  }
  /**
    * Display quickshop
  **/
  showQuickShop = (e) => {
    this.props.elcStore.updateProductListPage(e.target.getAttribute('data-product-id'), 'add-qs-open');
  };
  render() {
    let qsOpenedForItems = this.props.elcStore.qsOpenedForItems;
    let qsOpened = (qsOpenedForItems !== undefined && 
                    qsOpenedForItems.indexOf(this.props.prodId) > -1) ? " quickshop-open" : "";
    return (
      <li className="mpp__product" data-product-id={this.props.prodId}>
        <div className={"product_brief js-product-brief" + qsOpened}>
            <a href={this.productTempUrl} className="product_brief__image-container">
              <div className="product_brief__image" style={{backgroundImage: "url("+ this.props.image +")"}}></div>
            </a>
            <div className="product_brief__description">
              <div className="product_brief__headers">
                <h3 className="product_brief__header">{this.props.name}</h3>
                <h4 className="product_brief__sub-header">{this.props.subHeading}</h4>
              </div>
              <div className="product_brief__panel down_price">
                <div className="product_brief__price">{this.props.priceForDisplay}</div>
              </div>
              <QuickShop 
                skus={this.props.skus} 
                click={this.add} 
                displayStatus={this.state.displayCurrentQuickShop} 
                prodId={this.props.prodId}
                updateProductListPage={this.props.updateProductListPage}
                qsSelectedProductSkus={this.props.qsSelectedProductSkus}
                updateQsSelectedProductSkus={this.props.updateQsSelectedProductSkus} />
              <div className="product_brief__desc1">{this.props.desc}</div>
            </div>
            <div className="product_brief__buttons-container">
              <div className="product_brief__buttons product_brief__buttons--shaded">
                <a href={this.productTempUrl} 
                  className="product_brief__button--shop-now button--secondary button--light js-shopnow-button">
                  {lang.shop_now}
                </a>
                <button 
                  onClick={this.showQuickShop} 
                  data-product-id={this.props.prodId} 
                  className="js-mpp_quickshop product_brief__button-panel button-color-picker">
                </button>
              </div>
            </div>
        </div>
      </li>
    );
  }
}
export default inject("elcStore")(observer(Product));