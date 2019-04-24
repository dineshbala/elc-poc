import React, { Component } from 'react';
import { API } from '../../services/API';
import './productView.css';
import ProductSpecification from './ProductSpecification';
import { siteConfig } from '../../config/en_us';
import { lang } from '../../lang/en_us';

class ProductView extends Component {
  constructor(){
    super();
    this.state = {
      selectedColor: 'blue',
      Image: [],
      displayCurrentQuickShop: 'none',
      time: null,
      data:[],
      qty: 0,
	    userId: '',
	    orderNumb: null,
	    PRODUCT_ID: '',
      SKU_ID: '',
      PRODUCT_DETAILS_MOBILE: '',
      PROD_RGN_NAME: '',
      priceRange: '',
      ATTRIBUTE_DESC_3: '',
      ATTRIBUTE_DESC_4: '',
      ATTRIBUTE_DESC_5: ''
    }
    this.changeColor = this.changeColor.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  /**
   * Init invoke
   */
  componentDidMount() {
    //Update state on page load
    this.setState({
      PRODUCT_ID: this.props.match.params.id,
      SKU_ID:this.props.match.params.sku
    });

    API('productDetails',this.state).then((result) => {
      let responseJson = result;
      let productionURL = siteConfig.domain;
      if (responseJson.productDetails[0]) {
        this.setState({
          Image: [
            { 
              color: 'black',
              path: productionURL+responseJson.productDetails[0].LARGE_SMOOSH,
            },
            {
              color: 'blue',
              path: productionURL+responseJson.productDetails[0].XL_IMAGE,
            },
            {
              color: 'red',
              path: productionURL+responseJson.productDetails[0].LARGE_IMAGE,
            },
          ],
          PRODUCT_DETAILS_MOBILE: responseJson.productDetails[0].PRODUCT_DETAILS_MOBILE,
          PROD_RGN_NAME: responseJson.productDetails[0].PROD_RGN_NAME,
          priceRange: responseJson.productDetails[0].priceRange,
          ATTRIBUTE_DESC_3: responseJson.productDetails[0].ATTRIBUTE_DESC_3,
          ATTRIBUTE_DESC_4: responseJson.productDetails[0].ATTRIBUTE_DESC_4,
          ATTRIBUTE_DESC_5: responseJson.productDetails[0].ATTRIBUTE_DESC_5,
        });
      }
    });
  }
  
  /**
   * Add to cart 
   * @param {*} e 
   */
  addToCart(e){
    let newQty = parseInt(e.target.getAttribute('data-qty')) || 1;
    let skuId = e.target.getAttribute('data-sku-id');
    let productId = e.target.getAttribute('data-product-id');
    this.setState({
      qty: this.state.qty + newQty
    });

    if(sessionStorage.getItem('orderNumber')){
      let data = JSON.parse(sessionStorage.getItem("orderNumber"));
	    this.state.orderNumb = data.cartInsertData.orderNumber;
    }
    if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
	    this.state.userId = userData.userData.user_id;
    }

    this.state.PRODUCT_ID = productId;
	  this.state.SKU_ID = skuId;
	  this.state.qty = newQty;
    if(this.state.PRODUCT_ID && this.state.SKU_ID) {
        API('addtocart',this.state).then((result) => {
          let responseJson = result;
          if(responseJson.cartInsertData) {
            if(!sessionStorage.getItem('orderNumber')) {
              sessionStorage.setItem('orderNumber',JSON.stringify(responseJson));
            }
          }
        });
    }
    window.location.href = "/viewcart";
    e.preventDefault();
  }
 
  /**
   * Change Image color
   * @param {} e
   */
  changeColor(e) {
    let Productcolor = e.target.getAttribute('data-image');
    this.setState({
      selectedColor: Productcolor
    });
  }
  
  render() {
    return (
      <div>
        <main className="container">
        {/* Left Column / Headphones Image */}
        <div className="left-column">
          { /* Product Image */
            this.state.Image.map( (image) => { 
              return <img data-image={image.color} className={this.state.selectedColor == image.color ? 'active' : '' } src={image.path} alt />
            })
          }
        </div>
        {/* Right Column */}
        <div className="right-column">
          {/* Product Description */}
          <div className="product-description">
            <span>{/* Category Name */}</span>
            <h1>{this.state.PROD_RGN_NAME}</h1>
            <p>{this.state.PRODUCT_DETAILS_MOBILE}</p>
          </div>
          {/* Product Configuration */}
          <div className="product-configuration">
            {/* Product Color */}
            <div className="product-color">
              <span>Color</span>
              <div className="color-choose">
                <div>
                  <input data-image="red" type="radio" id="red" name="color" defaultValue="red" onClick={this.changeColor} defaultChecked />
                  <label htmlFor="red"><span /></label>
                </div>
                <div>
                  <input data-image="blue" type="radio" id="blue" name="color" onClick={this.changeColor} defaultValue="blue" />
                  <label htmlFor="blue"><span /></label>
                </div>
                <div>
                  <input data-image="black" type="radio" id="black" name="color" onClick={this.changeColor} defaultValue="black" />
                  <label htmlFor="black"><span /></label>
                </div>
              </div>
            </div>
            {/* Product Pricing */}
            <div className="product-price product-price-cart">
              <span>{this.state.priceRange}</span>
              <a href="#" className="cart-btn" data-product-id={this.state.PRODUCT_ID} data-sku-id={this.state.SKU_ID} data-qty="1" onClick={this.addToCart}>{lang.add_to_bag}</a>
            </div>
          </div>
        </div>
        </main>
        <ProductSpecification product={this.state}></ProductSpecification>
       </div>
    );
  }
}
export default ProductView;