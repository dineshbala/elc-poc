import React from 'react';
import './ProductList.css'
// Product list
class ProductList extends React.Component {
  render() {
    return (
    <div className="col-sm-12 product_slider">
      <div className="product_image_top">
        <img src={this.props.domain + this.props.prodImage} alt=""/>
        <div class="overlay"></div>
      </div>
      <a href={this.props.productURL}><h4 className='product_slider_heading'>{this.props.prodName}</h4></a>
      <p>ONE-STROKE BOLD COLOR IMPACT AND PLUMPING MOISTURE</p>
      <p>Price:{this.props.prodPrice}</p>
      <a href={this.props.productURL} target="_blank" className="shop_now">Shop Now</a>
    </div>
    );
  }
}
export default ProductList;