import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { API } from '../../services/API';
import ViewcartList from '../../components/viewcart/ViewcartList';
import OrderSummary from '../order-summary/OrderSummary';
import EmptyCart from './EmptyCart';
import LoadingIcon from '../common/RingLoader';
import RecommendedProductList from '../products/RecommendedProducts';
import { lang } from '../../lang/en_us';
import { siteConfig } from '../../config/en_us';
import '../../styles/common-styles.css';
import './Viewcart.css';

const domain = siteConfig.domain;
/**
  * Build viewcart page
**/
class Viewcart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewcartProductLists:[],
      orderNumb: null,
      showLoading: true,
      refreshTime: '',
      cartTotalQtyCount: 0
    };  
    if(sessionStorage.getItem('orderNumber')) {
      let data = JSON.parse(sessionStorage.getItem("orderNumber"));
      this.state.orderNumb = data.cartInsertData.orderNumber;
    }
    this.changeQty = this.changeQty.bind(this);
    this.removeSkuItem = this.removeSkuItem.bind(this);
    this.updateViewCartResult = this.updateViewCartResult.bind(this);
  }
  updateViewCartResult() {
    // To Do
  }
  /**
    * Display cart products from user session in DB
  **/
  componentDidMount() {
    API('cartproducts', this.state).then((result) => {
      let responseJson = result;
      let cartProductFromDB = responseJson.cartprod;
      if (cartProductFromDB) {
        let cartTotalCount = 0;
        cartProductFromDB.map(eachproduct => {
          cartTotalCount += parseInt(eachproduct.Quantity);
        });
        this.setState({
          viewcartProductLists: cartProductFromDB,
          showLoading: false,
          cartTotalQtyCount: cartTotalCount
        });
      } else {
        this.setState({
          showLoading: false
        });
      }
    });
  }
  /**
    * On product quantity change action
  **/
  changeQty(e) {
    e.preventDefault();
    let cartSkuBaseId = e.target.getAttribute('data-sku-base-id');
    let newQty = e.target.value;
    let cartItems = this.state.viewcartProductLists;
    cartItems.forEach(function(data, i) {
      if (data.SKU_BASE_ID === cartSkuBaseId) {
        data.Quantity = newQty;
        return false;
      }
    })
    this.state.SKU_ID = cartSkuBaseId;
    this.state.qty = newQty;
    API('quantityupdate',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.quantityupdate) {
        // To do: On qty update functionality
      } else {
        // To do: Handle error
      }
    });
    this.setState({viewcartProductLists: cartItems});
  }
  /**
    * On removing product
  **/
  removeSkuItem(e) {
    e.preventDefault();
    let cartSkuBaseId = e.target.getAttribute('data-sku-base-id');
    let cartItemContainer = e.target.closest('.js-cart-item');
    let _this = this;
    cartItemContainer.classList.add('slideup');
    let cartItems = this.state.viewcartProductLists;
    function skipCartItem(cartItem) {
      return cartItem.SKU_BASE_ID !== cartSkuBaseId;
    }
    let arrRes = cartItems.filter(skipCartItem);
    setTimeout(function() {
     _this.setState({viewcartProductLists: arrRes});
    }, 1000)
    this.state.SKU_ID = cartSkuBaseId;
    API('removeproduct',this.state).then((result) => {
        let responseJson = result;
        if(responseJson.removeproduct){  
          // To do: product delete functionality
        }else{
          // To do: Handle error
        }
    });
  }
  render() {
      if (this.state.showLoading) {
        return <LoadingIcon />;
      }
      var strUserName = sessionStorage.getItem('userData');
      const buttonUrl = strUserName ? '/checkout' : '/login';
      this.props.elcStore.setReturnUrl('/checkout');
      /**
        * Build cart product items
      **/
      var products = this.state.viewcartProductLists.length ? 
      this.state.viewcartProductLists.map(product => (
          <ViewcartList
            sku_details={product}
            key={Date.now()*Math.random()}
            changeQty={this.changeQty}
            domain={domain}
            removeSkuItem={this.removeSkuItem}
          />
      )) : <EmptyCart />;
    /**
      * Build order summary panel
    **/
    const OrderSummaryPanel = this.state.viewcartProductLists.length ? 
      <OrderSummary cartItems={this.state.viewcartProductLists} totalQtyCount={this.state.cartTotalQtyCount}/> : '';
    /**
      * Build checkout button panel
    **/
    const checkoutButton = this.state.viewcartProductLists.length ?
      <div className="button-containers">
        <a href={buttonUrl} className="button--secondary button--dark">{lang.btn_checkout}</a>
      </div>
      : '';
    return (
      <div className="viewcart">
        <div className="viewcart__panel--left">
          <section id="viewcart-panel" className="viewcart-panel panel edit  js-viewcart-panel">
            <header className="viewcart-header checkout-header">
              <h2 className="viewcart-panel__title checkout__panel-title checkout-page-title">
                {lang.my_bag}
                <span className="item-count checkout__header-item-count" id="header-item-count">
                <span className="item-count__number js-item-count-number">{this.state.cartTotalQtyCount}</span>
                <span className="item-count__language js-item-count-language" 
                  data-singular="item" 
                  data-plural="items"> {this.state.cartTotalQtyCount > 1 ? lang.items : lang.item}</span>
                </span>
              </h2>
            </header>
            <div className="content clearfix viewcart-panel__content checkout__panel-content">
              <div className="cart-items products">
                <div className="cart-header clearfix">
                  <div className="products">{lang.title_products}</div>
                  <div className="price">{lang.title_price}</div>
                  <div className="qty">{lang.title_quantity}</div>
                  <div className="total">{lang.title_total}</div>
                </div>
                {products}
              </div>
            </div>
          </section>
          {OrderSummaryPanel}
          {checkoutButton}
          <RecommendedProductList />
        </div>
        <div className="viewcart__panel--right checkout__sidebar">{lang.placeholder_copy}</div>
      </div>
    );
  }
}
export default inject("elcStore")(observer(Viewcart));