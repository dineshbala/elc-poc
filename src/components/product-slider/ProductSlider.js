import React, { Component } from 'react';
import './ProductSlider.css';
import Slider from "react-slick";
import {API} from '../../services/API';
import ProductList from '../../components/product-list/ProductList';
import { lang } from '../../lang/en_us';
import { siteConfig } from '../../config/en_us';

const domain = siteConfig.domain;
export default class ProductSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prodLists:[],
    };
  }
  componentDidMount() {
    API('productlist',this.state).then((result) => {
      let responseJson = result;
      if (responseJson.productData) {
        this.setState({prodLists: responseJson.productData});
      }
    });
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      cssEase: 'linear',
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        }
      }]
    };
    var products = this.state.prodLists.map(product => (
      <ProductList
        prodName={product.PROD_RGN_NAME.substr(0,15)}
        prodPrice={product.priceRange}
        prodDesc={product.MPP_DESC_1}
        prodImage={product.defaultSku[0].MEDIUM_IMAGE}
        domain={domain}
        priceForDisplay={product.defaultSku[0].formattedPrice}
        prodId={product.PRODUCT_ID}
        productURL={product.url} />
    ));
    var prodlist = products.map((prodlist) => <div>{prodlist}</div>);
    return (
      <div className="container">
        <hr/>
        <h2 className="text-center mt-3 mb-3 product_heading">{lang.loading}</h2>
        <hr/>
        <Slider {...settings}>
          {prodlist}
        </Slider>
      </div>
    );
  }
}